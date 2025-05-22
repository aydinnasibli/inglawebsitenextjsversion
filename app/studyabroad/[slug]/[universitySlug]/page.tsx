import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UniversityClient from '@/components/UniversityClient';
import { client } from '@/sanity/lib/client';
import {
    UNIVERSITY_BY_SLUG_QUERY,
    UNIVERSITY_SLUGS_BY_COUNTRY_QUERY,
    COUNTRY_BY_SLUG_QUERY
} from '@/sanity/lib/queries';
import { SanityUniversity, SanityCountry } from '@/types/study-abroad';

interface UniversityPageProps {
    params: Promise<{
        countrySlug: string;
        universitySlug: string;
    }>;
}

export async function generateStaticParams({ params }: { params: Promise<{ countrySlug: string }> }) {
    try {
        const { countrySlug } = await params;

        // First get the country
        const country = await client.fetch<SanityCountry>(COUNTRY_BY_SLUG_QUERY, { slug: countrySlug });

        if (!country) {
            return [];
        }

        // Then get universities for this country
        const universities = await client.fetch<Array<{ slug: string }>>(
            UNIVERSITY_SLUGS_BY_COUNTRY_QUERY,
            { countryId: country._id }
        );

        return universities.map((university) => ({
            countrySlug,
            universitySlug: university.slug,
        }));
    } catch (error) {
        console.error('Error generating university static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
    try {
        const { countrySlug, universitySlug } = await params;

        const [university, country] = await Promise.all([
            client.fetch<SanityUniversity>(UNIVERSITY_BY_SLUG_QUERY, {
                slug: universitySlug,
                countrySlug
            }),
            client.fetch<SanityCountry>(COUNTRY_BY_SLUG_QUERY, { slug: countrySlug })
        ]);

        if (!university || !country) {
            return {
                title: 'Universitet tapılmadı | İngla School',
                description: 'Axtardığınız universitet məlumatları tapılmadı.',
            };
        }

        return {
            title: university.seoTitle || `${university.name} | ${country.nameAz}də Təhsil | İngla School`,
            description: university.seoDescription || university.shortDescription,
            keywords: `${university.name}, ${country.nameAz}, xaricdə təhsil, universitet, beynəlxalq təhsil`,
            openGraph: {
                title: `${university.name} | ${country.nameAz}də Təhsil`,
                description: university.shortDescription,
                type: 'website',
                locale: 'az_AZ',
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Xaricdə Təhsil | İngla School',
            description: 'Xaricdə təhsil imkanları haqqında ətraflı məlumat',
        };
    }
}

async function getUniversityData(countrySlug: string, universitySlug: string) {
    try {
        const [university, country] = await Promise.all([
            client.fetch<SanityUniversity>(
                UNIVERSITY_BY_SLUG_QUERY,
                { slug: universitySlug, countrySlug },
                {
                    cache: 'force-cache',
                    next: { revalidate: 3600 }
                }
            ),
            client.fetch<SanityCountry>(
                COUNTRY_BY_SLUG_QUERY,
                { slug: countrySlug },
                {
                    cache: 'force-cache',
                    next: { revalidate: 3600 }
                }
            )
        ]);

        if (!university || !country) {
            return null;
        }

        return {
            university,
            country,
        };
    } catch (error) {
        console.error('Error fetching university data:', error);
        return null;
    }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
    const { countrySlug, universitySlug } = await params;
    const data = await getUniversityData(countrySlug, universitySlug);

    if (!data) {
        notFound();
    }

    return (
        <UniversityClient
            initialUniversityData={data.university}
            initialCountryData={data.country}
        />
    );
}