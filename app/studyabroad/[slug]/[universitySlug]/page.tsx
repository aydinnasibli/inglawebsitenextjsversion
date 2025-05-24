import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UniversityClient from '@/components/UniversityClient';
import { client } from '@/sanity/lib/client';
import {
    UNIVERSITY_BY_SLUG_QUERY,
    COUNTRY_BY_SLUG_QUERY,
    ALL_UNIVERSITY_SLUGS_QUERY
} from '@/sanity/lib/queries';
import { SanityUniversity, SanityCountry } from '@/types/study-abroad';

interface UniversityPageProps {
    params: {
        slug: string; // country slug
        universitySlug: string; // university slug
    };
}

// Generate static params for all universities
export async function generateStaticParams() {
    try {
        const universities = await client.fetch(ALL_UNIVERSITY_SLUGS_QUERY);
        return universities.map((university: SanityUniversity) => ({
            slug: university.country.slug,
            universitySlug: university.slug,
        }));
    } catch (error) {
        console.error('Error generating university static params:', error);
        return [];
    }
}

// Generate metadata
export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
    try {
        const { slug: countrySlug, universitySlug } = params;
        const university = await client.fetch(UNIVERSITY_BY_SLUG_QUERY, {
            slug: universitySlug,
            countrySlug: countrySlug,
        });

        if (!university) {
            return {
                title: 'University Not Found',
                description: 'The requested university could not be found.',
            };
        }

        const title = university.seoTitle || `${university.name} - ${university.country.nameAz}da Təhsil`;
        const description = university.seoDescription || university.shortDescription || `${university.name} haqqında ətraflı məlumat, qəbul şərtləri və təhsil proqramları.`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: university.coverImage ? [university.coverImage] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: university.coverImage ? [university.coverImage] : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'University Not Found',
            description: 'The requested university could not be found.',
        };
    }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
    const { slug: countrySlug, universitySlug } = params;

    try {
        // Fetch university data
        const universityData = await client.fetch(UNIVERSITY_BY_SLUG_QUERY, {
            slug: universitySlug,
            countrySlug: countrySlug,
        });

        // Fetch country data
        const countryData = await client.fetch(COUNTRY_BY_SLUG_QUERY, {
            slug: countrySlug,
        });

        if (!universityData || !countryData) {
            notFound();
        }

        return (
            <UniversityClient
                initialUniversityData={universityData}
                initialCountryData={countryData}
            />
        );
    } catch (error) {
        console.error('Error fetching university data:', error);
        notFound();
    }
}