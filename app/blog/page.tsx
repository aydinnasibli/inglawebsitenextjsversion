// app/blog/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { postsQuery, categoriesQuery } from '@/sanity/lib/queries'
import { BlogPost, Category } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read our latest blog posts and articles',
}

async function getBlogData() {
    const [posts, categories] = await Promise.all([
        client.fetch<BlogPost[]>(postsQuery),
        client.fetch<Category[]>(categoriesQuery),
    ])

    return { posts, categories }
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

export default async function BlogPage() {
    const { posts, categories } = await getBlogData()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover insights, tutorials, and stories from our team
                    </p>
                </div>

                {/* Categories Filter */}
                {categories.length > 0 && (
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Link
                                href="/blog"
                                className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                All Posts
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/blog/category/${category.slug.current}`}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getCategoryColor(category.color)}`}
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Blog Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {post.mainImage && (
                                    <Link href={`/blog/${post.slug.current}`}>
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={urlFor(post.mainImage).width(400).height(200).url()}
                                                alt={post.mainImage.alt || post.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                )}

                                <div className="p-6">
                                    {/* Categories */}
                                    {post.categories && post.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories.map((category) => (
                                                <span
                                                    key={category._id}
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.color)}`}
                                                >
                                                    {category.title}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        <Link
                                            href={`/blog/${post.slug.current}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Author and Date */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            {post.author?.image && (
                                                <div className="relative w-6 h-6">
                                                    <Image
                                                        src={urlFor(post.author.image).width(24).height(24).url()}
                                                        alt={post.author.name}
                                                        fill
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <span>{post.author?.name || 'Anonymous'}</span>
                                        </div>
                                        <time dateTime={post.publishedAt}>
                                            {formatDate(post.publishedAt)}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No blog posts found
                        </h3>
                        <p className="text-gray-600">
                            Check back later for new content!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}