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
            authors: [post.author.name],
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
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        purple: 'bg-purple-100 text-purple-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        gray: 'bg-gray-100 text-gray-800',
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
                    className="rounded-lg w-full h-auto"
                />
                {value.alt && (
                    <p className="text-sm text-gray-600 text-center mt-2 italic">
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
                className="text-blue-600 hover:text-blue-800 underline"
            >
                {children}
            </a>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h4>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>
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
        <div className="min-h-screen bg-white">
            {/* Breadcrumb Navigation */}
            <nav className="bg-gray-50 border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-gray-900">
                            Blog
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{post.title}</span>
                    </div>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Header */}
                <header className="mb-8">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/blog/category/${category.slug.current}`}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getCategoryColor(category.color)}`}
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                        <div className="flex items-center space-x-4">
                            {post.author.image && (
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={urlFor(post.author.image).width(48).height(48).url()}
                                        alt={post.author.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900">{post.author.name}</p>
                                <p className="text-sm text-gray-600">
                                    <time dateTime={post.publishedAt}>
                                        {formatDate(post.publishedAt)}
                                    </time>
                                </p>
                            </div>
                        </div>

                        {/* Share buttons could go here */}
                    </div>
                </header>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="mb-8">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <Image
                                src={urlFor(post.mainImage).width(1200).height(675).url()}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {post.mainImage.alt && (
                            <p className="text-sm text-gray-600 text-center mt-2 italic">
                                {post.mainImage.alt}
                            </p>
                        )}
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                    {post.body && (
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    )}
                </div>

                {/* Author Bio */}
                <div className="mt-12 bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                        {post.author.image && (
                            <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                    src={urlFor(post.author.image).width(64).height(64).url()}
                                    alt={post.author.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                About {post.author.name}
                            </h3>
                            {post.author.bio && (
                                <div className="text-gray-600 mb-3">
                                    <PortableText value={post.author.bio} />
                                </div>
                            )}
                            {post.author.socialLinks && (
                                <div className="flex space-x-4">
                                    {post.author.socialLinks.twitter && (
                                        <a
                                            href={post.author.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Twitter
                                        </a>
                                    )}
                                    {post.author.socialLinks.linkedin && (
                                        <a
                                            href={post.author.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            LinkedIn
                                        </a>
                                    )}
                                    {post.author.socialLinks.website && (
                                        <a
                                            href={post.author.socialLinks.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Website
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Related Posts
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <article
                                    key={relatedPost._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {relatedPost.mainImage && (
                                        <Link href={`/blog/${relatedPost.slug.current}`}>
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={urlFor(relatedPost.mainImage).width(400).height(200).url()}
                                                    alt={relatedPost.mainImage.alt || relatedPost.title}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>
                                    )}

                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            <Link
                                                href={`/blog/${relatedPost.slug.current}`}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {relatedPost.title}
                                            </Link>
                                        </h3>

                                        {relatedPost.excerpt && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center text-sm text-gray-500">
                                            <span>{relatedPost.author.name}</span>
                                            <span className="mx-2">•</span>
                                            <time dateTime={relatedPost.publishedAt}>
                                                {formatDate(relatedPost.publishedAt)}
                                            </time>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}