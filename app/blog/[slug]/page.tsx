// app/blog/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POSTS_SITEMAP_QUERY } from '@/sanity/lib/queries'
import { BlogPost } from '@/types/blog'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export const revalidate = 60 // Revalidate every 60 seconds

// Generate static params for static generation
export async function generateStaticParams() {
    try {
        const posts = await client.fetch(BLOG_POSTS_SITEMAP_QUERY)
        return posts.map((post: { slug: { current: string } }) => ({
            slug: post.slug.current,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug })
        return post
    } catch (error) {
        console.error('Error fetching blog post:', error)
        return null
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Your Site Name`,
        description: post.excerpt || `Read ${post.title} on our blog`,
        openGraph: {
            title: post.title,
            description: post.excerpt || `Read ${post.title} on our blog`,
            images: post.mainImage
                ? [urlFor(post.mainImage).width(1200).height(630).url()]
                : [],
        },
    }
}

// Portable Text components for rich content rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).width(800).height(400).url()}
                    alt={value.alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg mx-auto"
                />
                {value.caption && (
                    <p className="text-center text-sm text-gray-600 mt-2">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-medium mt-4 mb-2 text-gray-900">{children}</h3>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600">
                {children}
            </blockquote>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                className="text-blue-600 hover:text-blue-800 underline"
                target={value.blank ? '_blank' : undefined}
                rel={value.blank ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        strong: ({ children }: any) => (
            <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
        number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    },
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back to Blog Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Blog
                </Link>

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.map((category) => (
                            <span
                                key={category.slug.current}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center">
                        {post.author?.image && (
                            <div className="relative w-12 h-12 mr-4">
                                <Image
                                    src={urlFor(post.author.image).width(48).height(48).url()}
                                    alt={post.author.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-medium text-gray-900">
                                {post.author?.name || 'Anonymous'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Published on {formatDate(post.publishedAt)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(600).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Excerpt */}
                {post.excerpt && (
                    <div className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                        {post.excerpt}
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <PortableText
                        value={post.content}
                        components={portableTextComponents}
                    />
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Share this post
                    </h3>
                    <div className="flex space-x-4">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </article>
        </div>
    )
}