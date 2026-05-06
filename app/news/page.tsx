import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { newsQuery, newsCategoriesQuery } from '@/sanity/lib/queries'
import { NewsPost, NewsCategory } from '@/types/news'
import NewsClient from './NewsClient'

export const metadata: Metadata = {
    title: 'Xəbərlər | Ingla School',
    description: 'Ingla School-un son xəbərləri, tədbirlər, nailiyyətlər və elanlar.',
    openGraph: {
        title: 'Xəbərlər | Ingla School',
        description: 'Ingla School-un son xəbərləri, tədbirlər, nailiyyətlər və elanlar.',
        type: 'website',
    },
}

async function getNewsData() {
    try {
        const [posts, categories] = await Promise.all([
            client.fetch<NewsPost[]>(newsQuery),
            client.fetch<NewsCategory[]>(newsCategoriesQuery),
        ])
        return { posts: posts || [], categories: categories || [] }
    } catch (e) {
        console.error('Failed to fetch news data:', e)
        return { posts: [], categories: [] }
    }
}

export default async function NewsPage() {
    const { posts, categories } = await getNewsData()
    return <NewsClient posts={posts} categories={categories} />
}
