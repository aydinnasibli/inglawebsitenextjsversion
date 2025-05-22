import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export interface SanityFAQItem {
    _id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
    isActive: boolean;
}

export interface TestimonialItem {
    id: string;
    name: string;
    position?: string;
    company?: string;
    testimonial: string;
    image?: string;
    rating: number;
    program: string;
    featured: boolean;
}

export interface SanityTestimonialItem {
    _id: string;
    name: string;
    position?: string;
    company?: string;
    testimonial: string;
    image?: SanityImageSource;
    rating: number;
    program: string;
    order: number;
    isActive: boolean;
    featured: boolean;
}