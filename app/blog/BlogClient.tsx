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
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt?.toLowerCase().includes(query)
            );
        }

        return result;
    }, [posts, selectedCategory, searchQuery]);

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

    const activeCategory = categories.find((c) => c._id === selectedCategory);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex justify-center py-10 px-6 lg:px-40">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary ring-offset-2 border border-slate-200 dark:border-slate-800"
                            style={{ backgroundImage: "url('/assets/logoingla.png')" }}
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Ingla School Blog</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Təhsil və texnologiya sahəsində ən son yeniliklərlə tanış olun
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Category Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-[73px] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm py-4 z-40">
                    <div className="flex-1">
                        <label className="flex flex-col min-w-40 h-12 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                                <div className="flex items-center justify-center pl-4 rounded-l-xl bg-white dark:bg-slate-800 border-y border-l border-slate-200 dark:border-slate-700">
                                    <span className="material-symbols-outlined text-slate-400">search</span>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 rounded-r-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary border-y border-r border-l-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-full placeholder:text-slate-400 px-4 text-base font-normal outline-none"
                                    placeholder="Məqalələr, məsləhətlər və ya xəbərlər axtarın..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 items-center no-scrollbar">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 cursor-pointer shadow-sm transition-all ${
                                selectedCategory === null
                                    ? "bg-primary text-background-dark font-bold shadow-md"
                                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary"
                            }`}
                        >
                            <p className="text-sm font-medium">Hamısı</p>
                            <span className="text-xs opacity-70">({posts.length})</span>
                        </button>
                        {categories.map((category) => {
                            const count = posts.filter((p) =>
                                p.categories?.some((c) => c._id === category._id)
                            ).length;
                            return (
                                <button
                                    key={category._id}
                                    onClick={() =>
                                        setSelectedCategory(
                                            selectedCategory === category._id ? null : category._id
                                        )
                                    }
                                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 cursor-pointer transition-all ${
                                        selectedCategory === category._id
                                            ? "bg-primary text-background-dark font-bold shadow-md"
                                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary"
                                    }`}
                                >
                                    <p className="text-sm font-medium">{category.title}</p>
                                    <span className="text-xs opacity-60">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active category label */}
                {activeCategory && (
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-sm text-slate-500">Kateqoriya:</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full flex items-center gap-2">
                            {activeCategory.title}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="hover:text-primary/70 transition-colors"
                                aria-label="Filtri sil"
                            >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        </span>
                    </div>
                )}

                {filteredPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <span className="material-symbols-outlined text-slate-300 text-6xl">search_off</span>
                        <p className="text-slate-500 text-lg">Bu kateqoriyada məqalə tapılmadı.</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                            className="text-primary font-bold text-sm hover:underline"
                        >
                            Bütün məqalələrə bax
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredPost && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    {selectedCategory ? "Ən Son Məqalə" : "Seçilmiş Məqalə"}
                                </h2>
                                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl lg:flex h-auto lg:h-96 hover:shadow-2xl transition-all duration-300">
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
                                                <button
                                                    key={cat._id}
                                                    onClick={() => setSelectedCategory(cat._id)}
                                                    className="px-3 py-1 bg-primary/20 text-background-dark dark:text-primary text-xs font-bold rounded-full uppercase tracking-wider hover:bg-primary/30 transition-colors"
                                                >
                                                    {cat.title}
                                                </button>
                                            ))}
                                            <span className="text-slate-400 text-xs">
                                                • {formatDate(featuredPost.publishedAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h3>
                                        {featuredPost.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 mt-auto">
                                            <Link
                                                href={`/blog/${featuredPost.slug.current}`}
                                                className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
                                            >
                                                Məqaləni Oxu{" "}
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Article Grid */}
                        {regularPosts.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold tracking-tight mb-8">
                                    {selectedCategory ? activeCategory?.title : "Son Yeniliklər"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {regularPosts.map((post) => (
                                        <Link
                                            href={`/blog/${post.slug.current}`}
                                            key={post._id}
                                            className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 group"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                {post.mainImage ? (
                                                    <Image
                                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-slate-400 text-4xl">image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col grow">
                                                <div className="flex justify-between items-center mb-3 flex-wrap gap-1">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {post.categories && post.categories.length > 0 ? (
                                                            post.categories.map((cat) => (
                                                                <span
                                                                    key={cat._id}
                                                                    className="text-[10px] font-bold text-primary uppercase tracking-widest"
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
                                                    <span className="text-[10px] text-slate-400">
                                                        {formatDate(post.publishedAt)}
                                                    </span>
                                                </div>
                                                <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                {post.excerpt && (
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                                                    <div className="flex items-center gap-2">
                                                        {post.author?.image ? (
                                                            <div className="size-6 rounded-full overflow-hidden relative">
                                                                <Image
                                                                    src={urlFor(post.author.image).width(24).height(24).url()}
                                                                    alt={post.author.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                                                                <span className="material-symbols-outlined text-[14px]">person</span>
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                                            {post.author?.name || "Admin"}
                                                        </span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                                                        trending_flat
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {/* Newsletter Section */}
                <div className="mt-16 bg-background-dark text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg mb-10">
                    <span className="material-symbols-outlined text-primary text-5xl mb-4">mail</span>
                    <h3 className="text-xl font-bold mb-2">Yeniliklərdən İlk Siz Xəbərdar Olun</h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Həftəlik təhsil məsləhətləri və xəbərləri birbaşa e-poçtunuza göndəriləcək.
                    </p>
                    <div className="w-full max-w-sm flex flex-col gap-3">
                        <input
                            className="bg-white/10 border-white/20 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            placeholder="E-poçt ünvanınız"
                            type="email"
                        />
                        <button className="bg-primary text-background-dark font-bold py-3 rounded-lg text-sm hover:brightness-110 transition-all">
                            İndi Abunə Ol
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
