// types/blog.ts
export interface BlogPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    author?: Author
    mainImage?: {
        alt?: string
        asset: {
            _ref: string
        }
    }
    categories?: Category[]
    publishedAt: string
    excerpt?: string
    content: any[] // Portable Text content
    featured?: boolean
    seo?: {
        metaTitle?: string
        metaDescription?: string
    }
}

export interface Author {
    _id: string
    name: string
    slug?: {
        current: string
    }
    image?: {
        alt?: string
        asset: {
            _ref: string
        }
    }
    bio?: string // Changed from any[] to string for simple text bio
    socialLinks?: {
        twitter?: string
        linkedin?: string
        instagram?: string
        website?: string
    }
    postCount?: number
}

export interface Category {
    _id: string
    title: string
    slug: {
        current: string
    }
    description?: string
    color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'pink' | 'indigo' | 'gray'
    postCount?: number
}

export interface BlogPostSummary {
    _id: string
    title: string
    slug: {
        current: string
    }
    author?: Pick<Author, '_id' | 'name' | 'image'>
    mainImage?: BlogPost['mainImage']
    categories?: Pick<Category, 'title' | 'slug'>[]
    publishedAt: string
    excerpt?: string
    featured?: boolean
}