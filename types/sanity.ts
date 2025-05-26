// types/sanity.ts
export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
    alt?: string
    hotspot?: {
        x: number
        y: number
        height: number
        width: number
    }
}

export interface Author {
    _id: string
    name: string
    slug: {
        current: string
    }
    image?: SanityImage
    bio?: any[] // Block content
    email?: string
    socialLinks?: {
        twitter?: string
        linkedin?: string
        website?: string
    }
}

export interface Category {
    _id: string
    title: string
    slug: {
        current: string
    }
    description?: string
    color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'gray'
}

export interface BlogPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    author: Author
    mainImage?: SanityImage
    categories?: Category[]
    publishedAt: string
    excerpt?: string
    body?: any[] // Block content
    featured?: boolean
    seo?: {
        title?: string
        description?: string
        keywords?: string[]
    }
}

export interface BlogListProps {
    posts: BlogPost[]
    categories: Category[]
}

export interface BlogPostPageProps {
    post: BlogPost
    relatedPosts: BlogPost[]
}