import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PRESCHOOL_SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem } from "@/types/preschool";
import PreschoolDetailClient from "./PreschoolDetailClient";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const service = await client.fetch<SanityPreschoolServiceItem>(PRESCHOOL_SERVICE_BY_SLUG_QUERY, { slug });
        if (!service) return { title: "Preschool | Ingla School" };
        return {
            title: service.seoTitle || `${service.title} | Ingla School`,
            description: service.seoDescription || service.shortDescription,
            openGraph: {
                title: service.seoTitle || service.title,
                description: service.seoDescription || service.shortDescription,
                type: "website",
            },
        };
    } catch {
        return { title: "Preschool | Ingla School" };
    }
}

export default async function PreschoolServicePage({ params }: PageProps) {
    const { slug } = await params;

    let service: SanityPreschoolServiceItem | null = null;
    try {
        service = await client.fetch<SanityPreschoolServiceItem>(
            PRESCHOOL_SERVICE_BY_SLUG_QUERY,
            { slug },
            { cache: "force-cache", next: { revalidate: 3600 } }
        );
    } catch (error) {
        console.error("Error fetching preschool service:", error);
    }

    if (!service) notFound();

    return <PreschoolDetailClient slug={slug} initialData={service} />;
}
