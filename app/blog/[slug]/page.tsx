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
            title: 'Məqalə Tapılmadı',
        }
    }

    return {
        title: `${post.title} | Saytınızın Adı`,
        description: post.excerpt || `${post.title} məqaləsini oxuyun`,
        openGraph: {
            title: post.title,
            description: post.excerpt || `${post.title} məqaləsini oxuyun`,
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
            <div className="my-10">
                <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
                    <Image
                        src={urlFor(value).width(900).height(500).url()}
                        alt={value.alt || ''}
                        width={900}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {value.caption && (
                    <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
        codeBlock: ({ value }: any) => (
            <div className="my-8">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    {value.language && (
                        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium border-b border-gray-700">
                            {value.language}
                        </div>
                    )}
                    <pre className="p-4 overflow-x-auto">
                        <code className="text-gray-300 text-sm leading-relaxed">
                            {value.code}
                        </code>
                    </pre>
                </div>
            </div>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl font-bold mt-12 mb-6 text-yellow-500 leading-tight">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-semibold mt-10 mb-5 text-yellow-400 leading-tight">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-medium mt-8 mb-4 text-yellow-300 leading-tight">
                {children}
            </h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-medium mt-6 mb-3 text-yellow-200 leading-tight">
                {children}
            </h4>
        ),
        normal: ({ children }: any) => (
            <p className="mb-6 text-gray-300 leading-loose text-lg">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-yellow-500 bg-gray-900/50 pl-6 py-4 italic my-8 text-gray-200 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                className="text-yellow-400 hover:text-yellow-300 underline decoration-yellow-500/30 hover:decoration-yellow-300 transition-all duration-300"
                target={value.blank ? '_blank' : undefined}
                rel={value.blank ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        strong: ({ children }: any) => (
            <strong className="font-bold text-yellow-100">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic text-yellow-200">{children}</em>
        ),
        code: ({ children }: any) => (
            <code className="bg-gray-800 text-yellow-300 px-2 py-1 rounded text-sm font-mono">
                {children}
            </code>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc ml-6 mb-6 space-y-2 text-gray-300">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal ml-6 mb-6 space-y-2 text-gray-300">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="text-gray-300 leading-relaxed">{children}</li>
        ),
        number: ({ children }: any) => (
            <li className="text-gray-300 leading-relaxed">{children}</li>
        ),
    },
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('az-AZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

// Estimate reading time based on content
function estimateReadingTime(content: any[]): number {
    if (!content || !Array.isArray(content)) return 5

    const text = content
        .filter(block => block._type === 'block' && block.children)
        .map(block =>
            block.children
                .filter((child: any) => child._type === 'span')
                .map((child: any) => child.text)
                .join(' ')
        )
        .join(' ')

    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
        notFound()
    }

    const readingTime = estimateReadingTime(post.content)
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/blog/${post.slug.current}`

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section with Gradient */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"></div>

                <article className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
                    {/* Back to Blog Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-all duration-300 group"
                    >
                        <svg
                            className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
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
                        Bloqa qayıt
                    </Link>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-8">
                            {post.categories.map((category) => (
                                <span
                                    key={category.slug.current}
                                    className="px-4 py-2 bg-yellow-500/20 text-yellow-300 text-sm font-medium rounded-full border border-yellow-500/30 backdrop-blur-sm"
                                >
                                    {category.title}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                        {post.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 pb-8 border-b border-gray-800">
                        <div className="flex items-center mb-4 sm:mb-0">
                            {post.author?.image && (
                                <div className="relative w-14 h-14 mr-4">
                                    <Image
                                        src={urlFor(post.author.image).width(56).height(56).url()}
                                        alt={post.author.name}
                                        fill
                                        className="rounded-full object-cover ring-2 ring-yellow-500/50"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-yellow-300 text-lg">
                                    {post.author?.name || 'Anonim'}
                                </p>
                                <p className="text-gray-400">
                                    {formatDate(post.publishedAt)} tarixində dərc edilib
                                </p>
                            </div>
                        </div>

                        {/* Reading Time Estimate */}
                        <div className="flex items-center text-gray-400">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>~{readingTime} dəqiqə oxuma</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.mainImage && (
                        <div className="relative w-full h-80 md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={urlFor(post.mainImage).width(1400).height(700).url()}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                    )}

                    {/* Excerpt */}
                    {post.excerpt && (
                        <div className="text-2xl text-gray-300 mb-12 font-light leading-relaxed p-8 bg-gray-900/30 rounded-2xl border border-gray-800">
                            <div className="text-yellow-500 text-6xl font-serif mb-4">"</div>
                            {post.excerpt}
                        </div>
                    )}
                </article>
            </div>

            {/* Content Section */}
            <div className="bg-black">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
                    <div className="prose prose-lg prose-invert max-w-none">
                        <PortableText
                            value={post.content}
                            components={portableTextComponents}
                        />
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-12 border-t border-gray-800">
                        <h3 className="text-2xl font-bold text-yellow-500 mb-6">
                            Bu məqaləni paylaşın
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Twitter
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                            <button
                                onClick={() => {
                                    if (typeof window !== 'undefined' && navigator.clipboard) {
                                        navigator.clipboard.writeText(window.location.href)
                                            .then(() => {
                                                // You could add a toast notification here
                                                console.log('Link copied to clipboard')
                                            })
                                            .catch(err => {
                                                console.error('Failed to copy link:', err)
                                            })
                                    }
                                }}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Linki kopyala
                            </button>
                        </div>
                    </div>

                    {/* Author Bio Section - FIXED */}
                    {post.author && (
                        <div className="mt-16 pt-12 border-t border-gray-800">
                            <div className="flex items-start space-x-6 p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                                {post.author.image && (
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={urlFor(post.author.image).width(80).height(80).url()}
                                            alt={post.author.name}
                                            fill
                                            className="rounded-full object-cover ring-2 ring-yellow-500/50"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-xl font-bold text-yellow-400 mb-2">
                                        {post.author.name}
                                    </h4>
                                    {post.author.bio && (
                                        <div className="text-gray-300 leading-relaxed">
                                            {typeof post.author.bio === 'string' ? (
                                                <p className="mb-2">{post.author.bio}</p>
                                            ) : Array.isArray(post.author.bio) ? (
                                                <PortableText
                                                    value={post.author.bio}
                                                    components={{
                                                        block: {
                                                            normal: ({ children }: any) => (
                                                                <p className="mb-2 text-gray-300">{children}</p>
                                                            ),
                                                        },
                                                        marks: {
                                                            strong: ({ children }: any) => (
                                                                <strong className="font-bold text-yellow-100">{children}</strong>
                                                            ),
                                                        },
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}