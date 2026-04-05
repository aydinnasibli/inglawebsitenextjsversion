"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, Category } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

interface BlogClientProps {
    posts: BlogPost[];
    categories: Category[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        let result = posts;

        if (selectedCategory) {
            result = result.filter((post) =>
                post.categories?.some((cat) => cat._id === selectedCategory)
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(q) ||
                    post.excerpt?.toLowerCase().includes(q)
            );
        }

        return result;
    }, [posts, selectedCategory, searchQuery]);

    const activeCategory = categories.find((c) => c._id === selectedCategory);

    // Only use featured-card treatment on the "All posts" view
    const showFeatured = !selectedCategory && !searchQuery.trim();
    const featuredPost = showFeatured
        ? (posts.find((p) => p.featured) ?? posts[0] ?? null)
        : null;
    const gridPosts = showFeatured && featuredPost
        ? filteredPosts.filter((p) => p._id !== featuredPost._id)
        : filteredPosts;

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex justify-center py-10 px-6 lg:px-40">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                {/* Page Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary ring-offset-2 border border-slate-200 dark:border-slate-800"
                            style={{ backgroundImage: "url('/assets/logoingla.png')" }}
                        />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Ingla School Blog</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Təhsil və texnologiya sahəsində ən son yeniliklərlə tanış olun
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky search + category bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-[73px] bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm py-4 z-40 border-b border-slate-100 dark:border-slate-800">
                    {/* Search */}
                    <div className="flex-1 min-w-0">
                        <div className="flex w-full items-stretch rounded-xl h-12 shadow-sm">
                            <div className="flex items-center justify-center pl-4 rounded-l-xl bg-white dark:bg-slate-800 border-y border-l border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 rounded-r-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary border-y border-r border-l-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-full placeholder:text-slate-400 px-4 text-sm outline-none"
                                placeholder="Məqalə axtar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label="Axtarışı sil"
                                />
                            )}
                        </div>
                    </div>

                    {/* Category pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 items-center scrollbar-hide">
                        {/* "All" pill */}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all ${
                                selectedCategory === null
                                    ? "bg-primary text-slate-900 font-bold shadow"
                                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary"
                            }`}
                        >
                            Hamısı
                            <span className={`text-xs rounded-full px-1.5 py-0.5 ${selectedCategory === null ? "bg-slate-900/10" : "bg-slate-100 dark:bg-slate-700"}`}>
                                {posts.length}
                            </span>
                        </button>

                        {categories.map((cat) => {
                            const count = posts.filter((p) =>
                                p.categories?.some((c) => c._id === cat._id)
                            ).length;
                            const isActive = selectedCategory === cat._id;
                            return (
                                <button
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(isActive ? null : cat._id)}
                                    className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-primary text-slate-900 font-bold shadow"
                                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary"
                                    }`}
                                >
                                    {cat.title}
                                    <span className={`text-xs rounded-full px-1.5 py-0.5 ${isActive ? "bg-slate-900/10" : "bg-slate-100 dark:bg-slate-700"}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active filter breadcrumb */}
                {(activeCategory || searchQuery) && (
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                        <span className="text-sm text-slate-500">Filtr:</span>
                        {activeCategory && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                {activeCategory.title}
                                <button onClick={() => setSelectedCategory(null)} aria-label="Kateqoriya filtrini sil">
                                    <span className="material-symbols-outlined text-[14px] leading-none">close</span>
                                </button>
                            </span>
                        )}
                        {searchQuery && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-full">
                                &ldquo;{searchQuery}&rdquo;
                                <button onClick={() => setSearchQuery("")} aria-label="Axtarışı sil">
                                    <span className="material-symbols-outlined text-[14px] leading-none">close</span>
                                </button>
                            </span>
                        )}
                        <span className="text-sm text-slate-400">{filteredPosts.length} nəticə</span>
                    </div>
                )}

                {/* Empty state */}
                {filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-7xl">search_off</span>
                        <p className="text-slate-500 text-lg font-medium">Məqalə tapılmadı</p>
                        <p className="text-slate-400 text-sm">Fərqli axtarış sözü və ya kateqoriya sınayın</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                            className="mt-2 px-5 py-2 bg-primary text-slate-900 rounded-full text-sm font-bold hover:brightness-105 transition-all"
                        >
                            Bütün məqalələr
                        </button>
                    </div>
                )}

                {filteredPosts.length > 0 && (
                    <>
                        {/* ── ALL-POSTS VIEW: Featured hero card + grid ── */}
                        {showFeatured && featuredPost && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    Seçilmiş Məqalə
                                </h2>
                                <Link
                                    href={`/blog/${featuredPost.slug.current}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl lg:flex h-auto lg:h-96 hover:shadow-2xl transition-all duration-300 block"
                                >
                                    <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto relative">
                                        {featuredPost.mainImage ? (
                                            <Image
                                                src={urlFor(featuredPost.mainImage).width(800).height(600).url()}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-400 text-6xl">image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                                            {featuredPost.categories?.map((cat) => (
                                                <span
                                                    key={cat._id}
                                                    className="px-3 py-1 bg-primary/20 text-slate-900 dark:text-primary text-xs font-bold rounded-full uppercase tracking-wider"
                                                >
                                                    {cat.title}
                                                </span>
                                            ))}
                                            <span className="text-slate-400 text-xs">
                                                {formatDate(featuredPost.publishedAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h3>
                                        {featuredPost.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 text-sm">
                                                {featuredPost.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-3 mt-auto">
                                            {featuredPost.author?.image ? (
                                                <div className="size-8 rounded-full overflow-hidden relative flex-shrink-0">
                                                    <Image
                                                        src={urlFor(featuredPost.author.image).width(32).height(32).url()}
                                                        alt={featuredPost.author.name}
                                                        fill className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[16px]">person</span>
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {featuredPost.author?.name || "Admin"}
                                            </span>
                                            <span className="ml-auto bg-primary text-slate-900 px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Oxu <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        )}

                        {/* ── Grid section ── */}
                        {gridPosts.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
                                    {activeCategory
                                        ? `${activeCategory.title} (${gridPosts.length})`
                                        : searchQuery
                                        ? `Axtarış nəticələri (${gridPosts.length})`
                                        : "Son Məqalələr"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {gridPosts.map((post) => (
                                        <Link
                                            href={`/blog/${post.slug.current}`}
                                            key={post._id}
                                            className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 group"
                                        >
                                            {/* Thumbnail */}
                                            <div className="h-48 overflow-hidden relative flex-shrink-0">
                                                {post.mainImage ? (
                                                    <Image
                                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-slate-300 text-4xl">image</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Body */}
                                            <div className="p-5 flex flex-col grow">
                                                {/* Category + date row */}
                                                <div className="flex items-center justify-between mb-3 gap-2">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {post.categories && post.categories.length > 0 ? (
                                                            post.categories.map((cat) => (
                                                                <span
                                                                    key={cat._id}
                                                                    className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full"
                                                                >
                                                                    {cat.title}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                Ümumi
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 shrink-0">
                                                        {formatDate(post.publishedAt)}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                    {post.title}
                                                </h4>

                                                {/* Excerpt */}
                                                {post.excerpt && (
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {/* Author row */}
                                                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3">
                                                    <div className="flex items-center gap-2">
                                                        {post.author?.image ? (
                                                            <div className="size-6 rounded-full overflow-hidden relative">
                                                                <Image
                                                                    src={urlFor(post.author.image).width(24).height(24).url()}
                                                                    alt={post.author.name}
                                                                    fill className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-[13px] text-slate-400">person</span>
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                                            {post.author?.name || "Admin"}
                                                        </span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform text-[20px]">
                                                        trending_flat
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Edge case: category selected, exactly 1 post, and it's in the grid */}
                        {gridPosts.length === 0 && !showFeatured && filteredPosts.length === 1 && (
                            <section>
                                <h2 className="text-xl font-bold tracking-tight mb-6">
                                    {activeCategory ? `${activeCategory.title} (1)` : "Nəticə"}
                                </h2>
                                <Link
                                    href={`/blog/${filteredPosts[0].slug.current}`}
                                    className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 group max-w-sm"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        {filteredPosts[0].mainImage ? (
                                            <Image
                                                src={urlFor(filteredPosts[0].mainImage).width(600).height(400).url()}
                                                alt={filteredPosts[0].title}
                                                fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-300 text-4xl">image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                                            {filteredPosts[0].title}
                                        </h4>
                                        {filteredPosts[0].excerpt && (
                                            <p className="text-sm text-slate-500 line-clamp-2">{filteredPosts[0].excerpt}</p>
                                        )}
                                    </div>
                                </Link>
                            </section>
                        )}
                    </>
                )}

                {/* Newsletter */}
                <div className="mt-16 mb-10 bg-background-dark text-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-5xl mb-4">mail</span>
                    <h3 className="text-xl font-bold mb-2">Yeniliklərdən İlk Siz Xəbərdar Olun</h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Həftəlik təhsil məsləhətləri və xəbərləri birbaşa e-poçtunuza göndəriləcək.
                    </p>
                    <div className="w-full max-w-sm flex flex-col gap-3">
                        <input
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none text-white placeholder:text-slate-400"
                            placeholder="E-poçt ünvanınız"
                            type="email"
                        />
                        <button className="bg-primary text-slate-900 font-bold py-3 rounded-lg text-sm hover:brightness-110 transition-all">
                            İndi Abunə Ol
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
