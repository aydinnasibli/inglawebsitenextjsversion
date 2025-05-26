// types/blog.ts
export interface BlogPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    excerpt?: string
    content: any[]
    mainImage?: {
        asset: {
            _ref: string
        }
        alt?: string
    }
    author?: {
        name: string
        image?: {
            asset: {
                _ref: string
            }
        }
    }
    publishedAt: string
    categories?: Array<{
        title: string
        slug: {
            current: string
        }
    }>
    _createdAt: string
    _updatedAt: string
}
