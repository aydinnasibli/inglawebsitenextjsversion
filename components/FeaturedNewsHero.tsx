import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { HomepageNewsData, NewsPost } from "@/types/news";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("az-AZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function CategoryBadge({ title, color }: { title: string; color?: string }) {
    return (
        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/15 text-slate-900 dark:text-primary">
            {title}
        </span>
    );
}

function BigNewsCard({ post }: { post: NewsPost }) {
    return (
        <Link
            href={`/news/${post.slug.current}`}
            className="group relative overflow-hidden rounded-2xl bg-slate-900 flex flex-col h-full min-h-[420px] shadow-xl hover:shadow-2xl transition-all duration-300"
        >
            {post.mainImage && (
                <Image
                    src={urlFor(post.mainImage).width(900).height(600).quality(85).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {post.categories?.map((cat) => (
                    <CategoryBadge key={cat._id} title={cat.title} color={cat.color} />
                ))}
            </div>

            {/* Bottom content */}
            <div className="relative mt-auto p-6 flex flex-col gap-3">
                <h2 className="text-xl md:text-2xl font-black text-white leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {post.title}
                </h2>
                {post.excerpt && (
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <span className="flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all">
                        Ətraflı <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function SmallNewsCard({ post }: { post: NewsPost }) {
    return (
        <Link
            href={`/news/${post.slug.current}`}
            className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 hover:border-primary hover:shadow-md transition-all"
        >
            {/* Thumbnail */}
            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700">
                {post.mainImage ? (
                    <Image
                        src={urlFor(post.mainImage).width(160).height(128).quality(80).url()}
                        alt={post.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-300 text-2xl">image</span>
                    </div>
                )}
            </div>

            {/* Text */}
            <div className="flex flex-col justify-between min-w-0 flex-1">
                <div className="flex flex-wrap gap-1 mb-1">
                    {post.categories?.slice(0, 1).map((cat) => (
                        <span key={cat._id} className="text-[9px] font-bold uppercase tracking-widest text-primary">
                            {cat.title}
                        </span>
                    ))}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                </p>
                <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-1">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
            </div>
        </Link>
    );
}

interface FeaturedNewsHeroProps {
    data: HomepageNewsData;
}

export default function FeaturedNewsHero({ data }: FeaturedNewsHeroProps) {
    const { featured, latest } = data;

    const heroPost = featured ?? latest[0] ?? null;
    if (!heroPost) return null;

    const sideItems = latest
        .filter((p) => p._id !== heroPost._id)
        .slice(0, 3);

    if (latest.length === 0) return null;

    return (
        <section className="relative bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90009_1px,transparent_1px),linear-gradient(to_bottom,#ffd90009_1px,transparent_1px)] bg-size-[44px_44px] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">

                {/* Section label */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Son Xəbərlər
                        </span>
                    </div>
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                        Bütün xəbərlər <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
                    {/* Left: big featured card */}
                    <BigNewsCard post={heroPost} />

                    {/* Right: stacked side items */}
                    {sideItems.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {sideItems.map((post) => (
                                <SmallNewsCard key={post._id} post={post} />
                            ))}
                            {/* Fill remaining space with a CTA if fewer than 3 side items */}
                            {sideItems.length < 3 && (
                                <Link
                                    href="/news"
                                    className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary transition-colors text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-primary py-6"
                                >
                                    Bütün xəbərləri gör →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
