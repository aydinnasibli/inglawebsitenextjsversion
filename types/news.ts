import { SanityImage } from './sanity'

export interface NewsCategory {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    color?: string
}

export interface NewsPost {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: SanityImage
    categories?: NewsCategory[]
    publishedAt: string
    excerpt?: string
    body?: any[]
    featured?: boolean
    seo?: {
        title?: string
        description?: string
        keywords?: string[]
    }
}

export interface HomepageNewsData {
    featured: NewsPost | null
    latest: NewsPost[]
}
