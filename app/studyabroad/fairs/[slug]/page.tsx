import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FairClient from '@/components/FairClient';
import { client } from '@/sanity/lib/client';
import { FAIR_BY_SLUG_QUERY, FAIR_SLUGS_QUERY } from '@/sanity/lib/queries';
import { SanityFair } from '@/types/study-abroad';

interface FairPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<Array<{ slug: string }>>(FAIR_SLUGS_QUERY);
        return slugs.map((item) => ({ slug: item.slug }));
    } catch (error) {
        console.error('Error generating fair static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }: FairPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const fair = await client.fetch<SanityFair>(FAIR_BY_SLUG_QUERY, { slug });
        if (!fair) {
            return { title: 'Sərgi tapılmadı | Ingla School' };
        }
        return {
            title: fair.seoTitle || `${fair.name} | Ingla School`,
            description: fair.seoDescription || fair.shortDescription,
            openGraph: {
                title: `${fair.name} | Ingla School`,
                description: fair.shortDescription,
                type: 'website',
                locale: 'az_AZ',
            },
        };
    } catch {
        return { title: 'Sərgilər | Ingla School' };
    }
}

export default async function FairPage({ params }: FairPageProps) {
    const { slug } = await params;

    let fair: SanityFair | null = null;
    try {
        fair = await client.fetch<SanityFair>(
            FAIR_BY_SLUG_QUERY,
            { slug },
            { cache: 'force-cache', next: { revalidate: 3600 } }
        );
    } catch (error) {
        console.error('Error fetching fair:', error);
    }

    if (!fair) notFound();

    return <FairClient fair={fair} />;
}
