// Sanity types from CMS
export interface SanityCountry {
    _id: string;
    name: string;
    nameAz: string;
    slug: {
        current: string;
    };
    shortDescription: string;
    fullDescription?: any[];
    flagImage: any;
    coverImage: any;
    gallery?: any[];
    highlights?: Array<{
        title: string;
        description?: string;
        icon?: string;
    }>;
    studyInfo?: {
        language?: string;
        currency?: string;
        averageCost?: string;
        livingCost?: string;
        applicationDeadline?: string;
        visaRequirements?: string[];
    };
    popularPrograms?: string[];
    order: number;
    isActive: boolean;
    isFeatured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface SanityUniversity {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    country: {
        _id: string;
        name: string;
        nameAz: string;
        slug: {
            current: string;
        };
    };
    shortDescription: string;
    fullDescription?: any[];
    logo: any;
    coverImage: any;
    gallery?: any[];
    ranking?: string;
    established?: number;
    studentCount?: string;
    location: {
        city: string;
        address?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    programs?: Array<{
        name: string;
        degree: 'bachelor' | 'master' | 'phd' | 'foundation' | 'certificate';
        duration?: string;
        tuitionFee?: string;
        requirements?: string[];
    }>;
    facilities?: string[];
    admissionInfo?: {
        applicationDeadline?: string;
        applicationFee?: string;
        requirements?: string[];
        documents?: string[];
    };
    scholarships?: Array<{
        name: string;
        amount?: string;
        criteria?: string;
    }>;
    contactInfo?: {
        website?: string;
        admissionsEmail?: string;
        phone?: string;
    };
    order: number;
    isActive: boolean;
    isFeatured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}


// Frontend display types
export interface Country {
    id: string;
    name: string;
    nameAz: string;
    slug: string;
    shortDescription: string;
    fullDescription?: any[];
    flagImage: string;
    coverImage: string;
    gallery?: string[];
    highlights?: Array<{
        title: string;
        description?: string;
        icon?: string;
    }>;
    studyInfo?: {
        language?: string;
        currency?: string;
        averageCost?: string;
        livingCost?: string;
        applicationDeadline?: string;
        visaRequirements?: string[];
    };
    popularPrograms?: string[];
    isFeatured?: boolean;
}

export interface University {
    id: string;
    name: string;
    slug: string;
    country: {
        id: string;
        name: string;
        nameAz: string;
        slug: string;
    };
    shortDescription: string;
    fullDescription?: any[];
    logo: string;
    coverImage: string;
    gallery?: string[];
    ranking?: string;
    established?: number;
    studentCount?: string;
    location: {
        city: string;
        address?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    programs?: Array<{
        name: string;
        degree: string;
        duration?: string;
        tuitionFee?: string;
        requirements?: string[];
    }>;
    facilities?: string[];
    admissionInfo?: {
        applicationDeadline?: string;
        applicationFee?: string;
        requirements?: string[];
        documents?: string[];
    };
    scholarships?: Array<{
        name: string;
        amount?: string;
        criteria?: string;
    }>;
    contactInfo?: {
        website?: string;
        admissionsEmail?: string;
        phone?: string;
    };
    isFeatured?: boolean;
}
