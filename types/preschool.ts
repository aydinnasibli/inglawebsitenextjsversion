// types/preschool.ts

export interface SanityPreschoolServiceItem {
    _id: string;
    title: string;
    slug?: {
        current: string;
    };
    shortDescription: string;
    fullDescription?: any; // Portable Text
    featuredImage?: any; // Sanity Image
    gallery?: {
        asset: any;
        alt?: string;
        caption?: string;
    }[];
    keyFeatures?: {
        feature: string;
        description?: string;
    }[];
    targetAgeGroup?: string;
    duration?: string;
    priceRange?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        whatsapp?: string;
    };
    scheduleInfo?: string;
    requirements?: string[];
    activities?: {
        activity: string;
        description?: string;
    }[];
    learningOutcomes?: string[];
    order?: number;
    isFeatured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface PreschoolServiceItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription?: any;
    featuredImage: string;
    gallery?: {
        url: string;
        alt?: string;
        caption?: string;
    }[];
    keyFeatures?: {
        feature: string;
        description?: string;
    }[];
    targetAgeGroup?: string;
    duration?: string;
    priceRange?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        whatsapp?: string;
    };
    scheduleInfo?: string;
    requirements?: string[];
    activities?: {
        activity: string;
        description?: string;
    }[];
    learningOutcomes?: string[];
    order?: number;
    isFeatured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}