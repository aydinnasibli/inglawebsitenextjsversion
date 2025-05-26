// app/blog/page.tsx
import { client } from '@/sanity/lib/client'
import { BLOG_POSTS_QUERY } from '@/sanity/lib/queries'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog | Your Site Name',
    description: 'Read our latest blog posts and insights',
}

export const revalidate = 60 // Revalidate every 60 seconds

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await client.fetch(BLOG_POSTS_QUERY)
        return posts
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return []
    }
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default async function BlogPage() {
    const posts = await getBlogPosts()

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

                {/* Blog Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <Link href={`/blog/${post.slug.current}`}>
                                    {/* Featured Image */}
                                    {post.mainImage && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={urlFor(post.mainImage).width(600).height(300).url()}
                                                alt={post.mainImage.alt || post.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        {/* Categories */}
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.categories.map((category) => (
                                                    <span
                                                        key={category.slug.current}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                                    >
                                                        {category.title}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        {post.excerpt && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Meta Information */}
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                {post.author?.image && (
                                                    <div className="relative w-6 h-6 mr-2">
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
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            No blog posts found
                        </h2>
                        <p className="text-gray-600">
                            Check back later for new content!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}