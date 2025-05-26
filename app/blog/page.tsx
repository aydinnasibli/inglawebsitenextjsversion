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
        blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        green: 'bg-green-500/20 text-green-300 border-green-500/30',
        red: 'bg-red-500/20 text-red-300 border-red-500/30',
        purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    }
    return colors[color as keyof typeof colors] || colors.gray
}

export default async function BlogPage() {
    const { posts, categories } = await getBlogData()

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Blog"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6 text-white">
                            Bizim <span className="text-yellow-500">Blog</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
                            Komandasından məqalələr, təlimatlar və hekayələr
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Categories Filter */}
                {categories.length > 0 && (
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/blog"
                                className="px-6 py-3 bg-yellow-500 text-black rounded-full text-sm font-medium hover:bg-yellow-400 transition-colors"
                            >
                                Bütün Məqalələr
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/blog/category/${category.slug.current}`}
                                    className={`px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${getCategoryColor(category.color)}`}
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
                        {posts.map((post, index) => (
                            <article
                                key={post._id}
                                className={`group cursor-pointer ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                            >
                                <Link href={`/blog/${post.slug.current}`}>
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 hover:border-yellow-500/50 h-full">
                                        {post.mainImage && (
                                            <div className={`relative overflow-hidden ${index === 0 ? 'h-64' : 'h-48'}`}>
                                                <Image
                                                    src={urlFor(post.mainImage).width(800).height(400).url()}
                                                    alt={post.mainImage.alt || post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            {/* Categories */}
                                            {post.categories && post.categories.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {post.categories.map((category) => (
                                                        <span
                                                            key={category._id}
                                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category.color)}`}
                                                        >
                                                            {category.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Title */}
                                            <h2 className={`font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            {post.excerpt && (
                                                <p className={`text-gray-300 mb-4 leading-relaxed ${index === 0 ? 'text-base' : 'text-sm'} line-clamp-3`}>
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            {/* Author and Date */}
                                            <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
                                                <div className="flex items-center space-x-3">
                                                    {post.author?.image && (
                                                        <div className="relative w-8 h-8">
                                                            <Image
                                                                src={urlFor(post.author.image).width(32).height(32).url()}
                                                                alt={post.author.name}
                                                                fill
                                                                className="rounded-full object-cover border border-gray-700"
                                                            />
                                                        </div>
                                                    )}
                                                    <span className="text-gray-300 font-medium">
                                                        {post.author?.name || 'Anonymous'}
                                                    </span>
                                                </div>
                                                <time dateTime={post.publishedAt} className="text-yellow-500">
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Heç bir blog məqaləsi tapılmadı
                            </h3>
                            <p className="text-gray-400">
                                Yeni məzmun üçün daha sonra yoxlayın!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}