// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postQuery, relatedPostsQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'
import { ChevronLeft, ChevronRight, Calendar, User, ExternalLink } from 'lucide-react'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(postSlugsQuery)
    return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await client.fetch<BlogPost>(postQuery, { slug })

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        keywords: post.seo?.keywords,
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            type: 'article',
            publishedTime: post.publishedAt,
            authors: post.author ? [post.author.name] : [],
            images: post.mainImage
                ? [
                    {
                        url: urlFor(post.mainImage).width(1200).height(630).url(),
                        width: 1200,
                        height: 630,
                        alt: post.mainImage.alt || post.title,
                    },
                ]
                : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || '',
            images: post.mainImage
                ? [urlFor(post.mainImage).width(1200).height(630).url()]
                : [],
        },
    }
}

async function getBlogPost(slug: string) {
    const post = await client.fetch<BlogPost>(postQuery, { slug })

    if (!post) {
        return null
    }

    // Get related posts based on categories
    const categoryIds = post.categories?.map(cat => cat._id) || []
    const relatedPosts = await client.fetch<BlogPost[]>(relatedPostsQuery, {
        postId: post._id,
        categoryIds,
    })

    return { post, relatedPosts }
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function getCategoryColor(color?: string) {
    const colors = {
        blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        green: 'bg-green-500/20 text-green-300 border-green-500/30',
        red: 'bg-red-500/20 text-red-300 border-red-500/30',
        purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    }
    return colors[color as keyof typeof colors] || colors.gray
}

// Portable Text components for rich text rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).width(800).url()}
                    alt={value.alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg w-full h-auto border border-gray-800"
                />
                {value.alt && (
                    <p className="text-sm text-gray-400 text-center mt-3 italic">
                        {value.alt}
                    </p>
                )}
            </div>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 underline inline-flex items-center gap-1 transition-colors"
            >
                {children}
                <ExternalLink className="w-3 h-3" />
            </a>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg font-bold text-white mt-4 mb-2">{children}</h4>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-yellow-500 pl-6 italic text-gray-300 my-6 bg-gray-900/30 py-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-300 leading-relaxed mb-4 text-lg">{children}</p>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">{children}</ol>
        ),
    },
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const data = await getBlogPost(slug)

    if (!data) {
        notFound()
    }

    const { post, relatedPosts } = data

    return (
        <div className="min-h-screen bg-black text-white max-w-5xl mx-auto mt-20">


            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Header */}
                <header className="mb-12">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                            {post.categories.map((category) => (
                                <span
                                    key={category._id}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${getCategoryColor(category.color)}`}
                                >
                                    {category.title}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between border-b border-gray-800 pb-8">
                        <div className="flex items-center space-x-4">
                            {post.author?.image && (
                                <div className="relative w-16 h-16">
                                    <Image
                                        src={urlFor(post.author.image).width(64).height(64).url()}
                                        alt={post.author.name}
                                        fill
                                        className="rounded-full object-cover border-2 border-gray-700"
                                    />
                                </div>
                            )}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <p className="font-semibold text-white text-lg">
                                        {post.author?.name || 'Anonymous'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-gray-400">
                                        <time dateTime={post.publishedAt}>
                                            {formatDate(post.publishedAt)}
                                        </time>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="mb-12">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                            <Image
                                src={urlFor(post.mainImage).width(1200).height(675).url()}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {post.mainImage.alt && (
                            <p className="text-sm text-gray-400 text-center mt-3 italic">
                                {post.mainImage.alt}
                            </p>
                        )}
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg prose-invert max-w-none">
                    {post.body && (
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    )}
                </div>

                {/* Author Bio - Only show if author exists */}
                {post.author && (
                    <div className="mt-16 bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                        <div className="flex items-start space-x-6">
                            {post.author.image && (
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={urlFor(post.author.image).width(80).height(80).url()}
                                        alt={post.author.name}
                                        fill
                                        className="rounded-full object-cover border-2 border-gray-700"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {post.author.name} haqqında
                                </h3>
                                {post.author.bio && (
                                    <div className="text-gray-300 mb-4 leading-relaxed">
                                        <PortableText value={post.author.bio} />
                                    </div>
                                )}
                                {post.author.socialLinks && (
                                    <div className="flex space-x-6">
                                        {post.author.socialLinks.twitter && (
                                            <a
                                                href={post.author.socialLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                Twitter
                                            </a>
                                        )}
                                        {post.author.socialLinks.linkedin && (
                                            <a
                                                href={post.author.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                LinkedIn
                                            </a>
                                        )}
                                        {post.author.socialLinks.website && (
                                            <a
                                                href={post.author.socialLinks.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                                            >
                                                Website
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-400 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Bloga Qayıt
                    </Link>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="bg-gray-900/30 border-t border-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">
                            Oxşar <span className="text-yellow-500">Məqalələr</span>
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <article
                                    key={relatedPost._id}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/blog/${relatedPost.slug.current}`}>
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 hover:border-yellow-500/50">
                                            {relatedPost.mainImage && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Image
                                                        src={urlFor(relatedPost.mainImage).width(400).height(200).url()}
                                                        alt={relatedPost.mainImage.alt || relatedPost.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                </div>
                                            )}

                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                                    {relatedPost.title}
                                                </h3>

                                                {relatedPost.excerpt && (
                                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between text-sm text-gray-400">
                                                    <span className="text-gray-300">
                                                        {relatedPost.author?.name || 'Anonymous'}
                                                    </span>
                                                    <time dateTime={relatedPost.publishedAt} className="text-yellow-500">
                                                        {formatDate(relatedPost.publishedAt)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}