"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsPost, NewsCategory } from "@/types/news";
import { urlFor } from "@/sanity/lib/image";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

interface NewsClientProps {
    posts: NewsPost[];
    categories: NewsCategory[];
}

export default function NewsClient({ posts, categories }: NewsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        let result = posts;
        if (selectedCategory) {
            result = result.filter((p) =>
                p.categories?.some((c) => c._id === selectedCategory)
            );
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [posts, selectedCategory, searchQuery]);

    const showFeatured = !selectedCategory && !searchQuery.trim();
    const featuredPost = showFeatured
        ? (posts.find((p) => p.featured) ?? posts[0] ?? null)
        : null;
    const gridPosts = showFeatured && featuredPost
        ? filteredPosts.filter((p) => p._id !== featuredPost._id)
        : filteredPosts;

    const activeCategory = categories.find((c) => c._id === selectedCategory);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* Page header */}
            <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Ingla School</p>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Xəbərlər</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
                        Məktəbimizin son xəbərləri, tədbirlər, nailiyyətlər və elanlar.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Search + category filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-[73px] bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm py-4 z-40 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex-1 min-w-0">
                        <div className="flex w-full items-stretch rounded-xl h-11 shadow-sm">
                            <div className="flex items-center justify-center pl-4 rounded-l-xl bg-white dark:bg-slate-800 border-y border-l border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 rounded-r-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary border-y border-r border-l-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-full placeholder:text-slate-400 px-4 text-sm outline-none"
                                placeholder="Xəbər axtar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 items-center scrollbar-hide">
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

                {/* Active filter */}
                {(activeCategory || searchQuery) && (
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                        <span className="text-sm text-slate-500">Filtr:</span>
                        {activeCategory && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                {activeCategory.title}
                                <button onClick={() => setSelectedCategory(null)}>
                                    <span className="material-symbols-outlined text-[14px] leading-none">close</span>
                                </button>
                            </span>
                        )}
                        {searchQuery && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-full">
                                &ldquo;{searchQuery}&rdquo;
                                <button onClick={() => setSearchQuery("")}>
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
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-7xl">newspaper</span>
                        <p className="text-slate-500 text-lg font-medium">Xəbər tapılmadı</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                            className="mt-2 px-5 py-2 bg-primary text-slate-900 rounded-full text-sm font-bold hover:brightness-105 transition-all"
                        >
                            Bütün xəbərlər
                        </button>
                    </div>
                )}

                {filteredPosts.length > 0 && (
                    <>
                        {/* Featured big card */}
                        {showFeatured && featuredPost && (
                            <section className="mb-10">
                                <Link
                                    href={`/news/${featuredPost.slug.current}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl lg:flex h-auto lg:h-80 hover:shadow-2xl transition-all duration-300 block border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="lg:w-2/5 overflow-hidden h-56 lg:h-auto relative">
                                        {featuredPost.mainImage ? (
                                            <Image
                                                src={urlFor(featuredPost.mainImage).width(800).height(600).url()}
                                                alt={featuredPost.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 40vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-400 text-6xl">newspaper</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="lg:w-3/5 p-7 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                                            {featuredPost.categories?.map((cat) => (
                                                <span key={cat._id} className="px-2.5 py-1 bg-primary/15 text-slate-900 dark:text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                                    {cat.title}
                                                </span>
                                            ))}
                                            <span className="flex items-center gap-1 text-slate-400 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(featuredPost.publishedAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-3">
                                            {featuredPost.title}
                                        </h3>
                                        {featuredPost.excerpt && (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                                                {featuredPost.excerpt}
                                            </p>
                                        )}
                                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
                                            Ətraflı oxu <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </section>
                        )}

                        {/* Grid */}
                        {gridPosts.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                                    {activeCategory
                                        ? `${activeCategory.title} (${gridPosts.length})`
                                        : searchQuery
                                        ? `Axtarış nəticələri (${gridPosts.length})`
                                        : "Bütün Xəbərlər"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {gridPosts.map((post) => (
                                        <Link
                                            href={`/news/${post.slug.current}`}
                                            key={post._id}
                                            className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 group"
                                        >
                                            <div className="h-44 overflow-hidden relative shrink-0 bg-slate-100 dark:bg-slate-700">
                                                {post.mainImage ? (
                                                    <Image
                                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                                        alt={post.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-slate-300 text-4xl">newspaper</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col grow">
                                                <div className="flex items-center justify-between mb-2.5 gap-2">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {post.categories && post.categories.length > 0 ? (
                                                            post.categories.map((cat) => (
                                                                <span key={cat._id} className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
                                                                    {cat.title}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Xəbər</span>
                                                        )}
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(post.publishedAt)}
                                                    </span>
                                                </div>
                                                <h4 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                    {post.title}
                                                </h4>
                                                {post.excerpt && (
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
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
                    </>
                )}
            </div>
        </div>
    );
}
