import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { newsBySlugQuery, newsSlugsQuery } from '@/sanity/lib/queries'
import { NewsPost } from '@/types/news'
import { urlFor } from '@/sanity/lib/image'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<string[]>(newsSlugsQuery)
        return (slugs || []).map((slug) => ({ slug }))
    } catch (e) {
        console.error('Failed to generate static params for news', e)
        return []
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await client.fetch<NewsPost>(newsBySlugQuery, { slug })
    if (!post) return { title: 'Xəbər tapılmadı' }
    return {
        title: post.seo?.title || `${post.title} | Ingla School`,
        description: post.seo?.description || post.excerpt,
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
                    <Image src={urlFor(value).url()} alt={value.alt || ' '} fill sizes="100vw" className="object-cover" />
                    {value.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm">
                            <p className="text-sm text-white text-center">{value.caption}</p>
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
                <a href={value.href} rel={rel} className="text-primary hover:underline font-medium transition-colors">
                    {children}
                </a>
            )
        },
    },
}

export default async function NewsPostPage({ params }: Props) {
    const { slug } = await params
    const post = await client.fetch<NewsPost>(newsBySlugQuery, { slug })

    if (!post) notFound()

    return (
        <article className="flex-1 bg-background-light dark:bg-background-dark min-h-screen py-16 px-6 lg:px-40">
            <div className="max-w-[800px] mx-auto">
                <Link
                    href="/news"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-10 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Xəbərlərə Qayıt
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {post.categories?.map((cat) => (
                            <span key={cat._id} className="px-4 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary uppercase tracking-wider">
                                {cat.title}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight tracking-tight text-slate-900 dark:text-white">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt} className="font-medium text-sm">
                            {new Date(post.publishedAt).toLocaleDateString('az-AZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </header>

                {post.mainImage && (
                    <div className="relative w-full aspect-video mb-16 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </div>
                )}

                {post.body && (
                    <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-yellow-600 prose-img:rounded-xl">
                        <PortableText value={post.body} components={portableTextComponents} />
                    </div>
                )}

                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:brightness-105 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Bütün Xəbərlər
                    </Link>
                </div>
            </div>
        </article>
    )
}
