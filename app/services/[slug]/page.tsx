import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from "@/sanity/lib/client";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem } from "@/types/services";
import ServiceDetailClient from './ServiceDetailClient';

interface ServicePageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    try {
        const service = await client.fetch<SanityServiceItem>(SERVICE_BY_SLUG_QUERY, { slug: params.slug });

        if (!service) {
            return {
                title: 'Service Not Found',
                description: 'The requested service could not be found.',
            };
        }

        return {
            title: service.seoTitle || service.title,
            description: service.seoDescription || service.shortDescription,
            openGraph: {
                title: service.seoTitle || service.title,
                description: service.seoDescription || service.shortDescription,
                type: 'website',
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Service',
            description: 'Service details page',
        };
    }
}

export default async function ServicePage({ params }: ServicePageProps) {
    let service: SanityServiceItem | null = null;

    try {
        service = await client.fetch<SanityServiceItem>(SERVICE_BY_SLUG_QUERY, { slug: params.slug });
    } catch (error) {
        console.error('Error fetching service:', error);
    }

    if (!service) {
        notFound();
    }

    return <ServiceDetailClient slug={params.slug} initialServiceData={service} />;
}