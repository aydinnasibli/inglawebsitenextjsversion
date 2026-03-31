// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<string[]>(postSlugsQuery)
        return (slugs || []).map((slug) => ({
            slug,
        }))
    } catch (e) {
        console.error("Failed to generate static params for blog", e);
        return [];
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const post = await client.fetch<BlogPost>(postQuery, { slug })

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
        },
    }
}

const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null
            return (
                <div className="relative w-full h-[400px] my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ' ' }
                        fill
                        className="object-cover"
                    />
                    {value.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm">
                            <p className="text-sm text-white text-center">
                                {value.caption}
                            </p>
                        </div>
                    )}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900 dark:text-white leading-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-slate-900 dark:text-white leading-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white leading-tight">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white leading-tight">{children}</h4>,
        normal: ({ children }) => <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-slate-700 dark:text-slate-300 bg-primary/5 py-4 pr-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg marker:text-primary">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg marker:text-primary font-bold">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="text-primary hover:underline font-medium transition-colors"
                >
                    {children}
                </a>
            )
        },
    },
}

export default async function BlogPostPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const post = await client.fetch<BlogPost>(postQuery, { slug })

    if (!post) {
        notFound()
    }

    return (
        <article className="flex-1 bg-background-light dark:bg-background-dark min-h-screen py-16 px-6 lg:px-40">
            <div className="max-w-[800px] mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-10 group"
                >
                    <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Bloqa Qayıt
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {post.categories?.map((category) => (
                            <span
                                key={category._id}
                                className="px-4 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary uppercase tracking-wider"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-slate-900 dark:text-white">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400">
                        {post.author && (
                            <div className="flex items-center gap-3">
                                {post.author.image ? (
                                    <Image
                                        src={urlFor(post.author.image).width(40).height(40).url()}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full ring-2 ring-primary/20"
                                    />
                                ) : (
                                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-xl">person</span>
                                    </div>
                                )}
                                <span className="font-medium text-slate-700 dark:text-slate-300">{post.author.name}</span>
                            </div>
                        )}
                        <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl">calendar_today</span>
                            <time dateTime={post.publishedAt} className="font-medium">
                                {new Date(post.publishedAt).toLocaleDateString('az-AZ', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>
                </header>

                {post.mainImage && (
                    <div className="relative w-full aspect-video mb-16 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-yellow-600 prose-img:rounded-xl">
                    <PortableText
                        value={post.body}
                        components={portableTextComponents}
                    />
                </div>

                {post.author?.bio && (
                    <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl">
                            {post.author.image ? (
                                <Image
                                    src={urlFor(post.author.image).width(100).height(100).url()}
                                    alt={post.author.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full ring-4 ring-primary/20"
                                />
                            ) : (
                                <div className="size-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl">person</span>
                                </div>
                            )}
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                                    {post.author.name}
                                </h3>
                                <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    <PortableText value={post.author.bio} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
