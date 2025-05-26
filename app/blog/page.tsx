// app/blog/page.tsx
import { client } from '@/sanity/lib/client'
import { BLOG_POSTS_QUERY } from '@/sanity/lib/queries'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Bloq | Sayt Adınız',
    description: 'Ən son bloq yazılarımızı və fikirlərlərimizi oxuyun',
}

export const revalidate = 60 // Hər 60 saniyədə yenilə

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await client.fetch(BLOG_POSTS_QUERY)
        return posts || []
    } catch (error) {
        console.error('Bloq yazılarını yükləməkdə xəta:', error)
        return []
    }
}

function formatDate(dateString: string): string {
    try {
        return new Date(dateString).toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    } catch (error) {
        console.error('Date formatting error:', error)
        return dateString
    }
}

// Loading component for better UX
function BlogPostSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-6">
                    <div className="flex gap-2 mb-4">
                        <div className="h-5 w-16 bg-gray-800 rounded-full"></div>
                        <div className="h-5 w-20 bg-gray-800 rounded-full"></div>
                    </div>
                    <div className="h-6 bg-gray-800 rounded mb-3"></div>
                    <div className="h-4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded mb-6 w-3/4"></div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-800 rounded-full mr-3"></div>
                            <div className="h-4 w-20 bg-gray-800 rounded"></div>
                        </div>
                        <div className="h-3 w-16 bg-gray-800 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Separate component for blog posts list
async function BlogPostsList() {
    const posts = await getBlogPosts()

    if (posts.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-6">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                    Hələ ki bloq yazısı yoxdur
                </h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Yeni məzmun üçün tezliklə yenidən yoxlayın! Maraqlı yazılar yolda.
                </p>
                <div className="mt-8">
                    <div className="inline-flex items-center px-6 py-3 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tezliklə yenilənəcək
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">{posts.length}</div>
                    <div className="text-gray-300">Bloq Yazısı</div>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">∞</div>
                    <div className="text-gray-300">İlham Mənbəyi</div>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
                    <div className="text-gray-300">Yenilənmə</div>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                    // Ensure all required fields exist before rendering
                    if (!post || !post._id || !post.slug?.current) {
                        return null
                    }

                    return (
                        <article
                            key={post._id}
                            className={`group bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            <Link href={`/blog/${post.slug.current}`} className="block">
                                {/* Featured Image */}
                                {post.mainImage && (
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <Image
                                            src={urlFor(post.mainImage).width(600).height(300).url()}
                                            alt={post.mainImage.alt || post.title || 'Blog post image'}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            onError={(e) => {
                                                console.error('Image loading error for post:', post._id)
                                            }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Categories */}
                                    {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.categories.slice(0, 2).map((category) => {
                                                if (!category || !category.slug?.current) return null
                                                return (
                                                    <span
                                                        key={category.slug.current}
                                                        className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-semibold rounded-full border border-yellow-500/30 backdrop-blur-sm"
                                                    >
                                                        {category.title || 'Kategori'}
                                                    </span>
                                                )
                                            })}
                                            {post.categories.length > 2 && (
                                                <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-semibold rounded-full">
                                                    +{post.categories.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
                                        {post.title || 'Başlıqsız'}
                                    </h2>

                                    {/* Excerpt */}
                                    {post.excerpt && (
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                        <div className="flex items-center">
                                            {post.author?.image && (
                                                <div className="relative w-8 h-8 mr-3">
                                                    <Image
                                                        src={urlFor(post.author.image).width(32).height(32).url()}
                                                        alt={post.author.name || 'Author'}
                                                        fill
                                                        className="rounded-full object-cover ring-2 ring-yellow-500/30"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-white">
                                                    {post.author?.name || 'Anonim'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {post.publishedAt && (
                                                <time
                                                    dateTime={post.publishedAt}
                                                    className="text-xs text-gray-500"
                                                >
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            )}
                                        </div>
                                    </div>

                                    {/* Read More Indicator */}
                                    <div className="mt-4 flex items-center text-yellow-500 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                                        <span>Oxumağa davam et</span>
                                        <svg
                                            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </>
    )
}

export default async function BlogPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-400/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v3a2 2 0 11-4 0V7.5A1.5 1.5 0 0110.5 6H15v1z" />
                            </svg>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Bizim <span className="text-yellow-500">Bloq</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Komandamızdan örnəklər, dərs vərəqləri və hekayələri kəşf edin.
                            Texnologiya və innovasiya dünyasından ən son yeniliklər.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Blog Posts Section with Suspense */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <BlogPostSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <BlogPostsList />
                </Suspense>

                {/* Newsletter Section */}
                <div className="mt-20 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Yeniliklər üçün <span className="text-yellow-500">abunə olun</span>
                        </h3>
                        <p className="text-gray-400 mb-8">
                            Ən son bloq yazılarından və texnoloji yeniliklərdən xəbərdar olmaq üçün bülletenimizə qoşulun.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="E-poçt ünvanınız"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            />
                            <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                                Abunə ol
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}