import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from '@portabletext/types'

export interface ServiceItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription?: PortableTextBlock[];
    featuredImage: string;
    gallery?: ServiceGalleryImage[];
    keyFeatures?: ServiceFeature[];
    targetAudience?: string[];
    duration?: string;
    priceRange?: string;
    contactInfo?: ServiceContactInfo;
    scheduleInfo?: string;
    requirements?: string[];
    category: string;
    order: number;
    isFeatured: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface SanityServiceItem {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    shortDescription: string;
    fullDescription?: PortableTextBlock[];
    featuredImage: SanityImageSource;
    gallery?: SanityGalleryImage[];
    keyFeatures?: ServiceFeature[];
    targetAudience?: string[];
    duration?: string;
    priceRange?: string;
    contactInfo?: ServiceContactInfo;
    scheduleInfo?: string;
    requirements?: string[];
    category: string;
    order: number;
    isActive: boolean;
    isFeatured: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface ServiceFeature {
    feature: string;
    description?: string;
}

export interface ServiceContactInfo {
    phone?: string;
    email?: string;
    whatsapp?: string;
}

export interface SanityGalleryImage {
    asset: SanityImageSource;
    alt?: string;
    caption?: string;
}

export interface ServiceGalleryImage {
    url: string;
    alt?: string;
    caption?: string;
}

export interface ServiceCategory {
    value: string;
    label: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    { value: 'language-courses', label: 'Dil Kursları' },
    { value: 'study-abroad', label: 'Xaricdə Təhsil' },
    { value: 'preschool', label: 'Preschool' },
    { value: 'training-center', label: 'Təlim Mərkəzi' },
    { value: 'academic-preparation', label: 'Akademik Hazırlıq' },
    { value: 'professional-development', label: 'Peşəkar İnkişaf' },
    { value: 'test-preparation', label: 'İmtahan Hazırlığı' },
    { value: 'online-courses', label: 'Onlayn Kurslar' },
    { value: 'special-programs', label: 'Xüsusi Proqramlar' },
];

export const getCategoryLabel = (category: string): string => {
    return SERVICE_CATEGORIES.find(cat => cat.value === category)?.label || category;
};