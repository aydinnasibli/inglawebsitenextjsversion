// Types
export interface Training {
    _id: string
    title: string
    slug: {
        current: string
    }
    description?: string
    content?: any[]
    featuredImage?: any
    duration?: string
    level?: 'beginner' | 'intermediate' | 'advanced'
    price?: number
    category?: string
    instructor?: string
    startDate?: string
    endDate?: string
    isActive?: boolean
}