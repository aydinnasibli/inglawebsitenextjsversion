import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CountryClient from '@/components/CountryClient';
import { client } from '@/sanity/lib/client';
import {
    COUNTRY_BY_SLUG_QUERY,
    UNIVERSITIES_BY_COUNTRY_QUERY,
    COUNTRY_SLUGS_QUERY
} from '@/sanity/lib/queries';
import { SanityCountry, SanityUniversity } from '@/types/study-abroad';

interface CountryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<Array<{ slug: string }>>(COUNTRY_SLUGS_QUERY);
        return slugs.map((item) => ({
            slug: item.slug,
        }));
    } catch (error) {
        console.error('Error generating country static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const country = await client.fetch<SanityCountry>(COUNTRY_BY_SLUG_QUERY, { slug });

        if (!country) {
            return {
                title: 'Ölkə tapılmadı | İngla School',
                description: 'Axtardığınız ölkə məlumatları tapılmadı.',
            };
        }

        return {
            title: country.seoTitle || `${country.nameAz}də Təhsil | İngla School`,
            description: country.seoDescription || country.shortDescription,
            keywords: `${country.nameAz}, xaricdə təhsil, universitet, beynəlxalq təhsil`,
            openGraph: {
                title: `${country.nameAz}də Təhsil | İngla School`,
                description: country.shortDescription,
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

async function getCountryData(slug: string) {
    try {
        const country = await client.fetch<SanityCountry>(
            COUNTRY_BY_SLUG_QUERY,
            { slug },
            {
                cache: 'force-cache',
                next: { revalidate: 3600 }
            }
        );

        if (!country) {
            return null;
        }

        const [universities] = await Promise.all([
            client.fetch<SanityUniversity[]>(
                UNIVERSITIES_BY_COUNTRY_QUERY,
                { countryId: country._id },
                {
                    cache: 'force-cache',
                    next: { revalidate: 3600 }
                }
            ),

        ]);

        return {
            country,
            universities: universities || [],
        };
    } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
    }
}

export default async function CountryPage({ params }: CountryPageProps) {
    const { slug } = await params;
    const data = await getCountryData(slug);

    if (!data) {
        notFound();
    }

    return (
        <CountryClient
            initialCountryData={data.country}
            initialUniversitiesData={data.universities}
        />
    );
}