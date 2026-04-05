// app/blog/page.tsx
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery, categoriesQuery } from '@/sanity/lib/queries'
import { BlogPost, Category } from '@/types/sanity'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
    title: 'Blog | Ingla School',
    description: 'Ingla School-un blogu: təhsil, dil öyrənmə, xaricdə təhsil və karyera inkişafı haqqında ən son məqalələr.',
    openGraph: {
        title: 'Blog | Ingla School',
        description: 'Ingla School-un blogu: təhsil, dil öyrənmə, xaricdə təhsil və karyera inkişafı haqqında ən son məqalələr.',
        type: 'website',
    },
}

async function getBlogData() {
    try {
        const [posts, categories] = await Promise.all([
            client.fetch<BlogPost[]>(postsQuery),
            client.fetch<Category[]>(categoriesQuery),
        ])
        return { posts: posts || [], categories: categories || [] }
    } catch (e) {
        console.error('Failed to fetch blog data:', e)
        return { posts: [], categories: [] }
    }
}

export default async function BlogPage() {
    const { posts, categories } = await getBlogData()

    return <BlogClient posts={posts} categories={categories} />
}
