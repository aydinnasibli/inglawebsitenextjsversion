// app/telim-merkezi/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { TRAINING_BY_SLUG_QUERY, TRAINING_SLUGS_QUERY } from '@/sanity/lib/queries';
import { SanityTrainingItem } from '@/types/training';
import TrainingDetailClient from './TrainingDetailClient';

interface TrainingDetailPageProps {
    params: Promise<{ slug: string }>;
}

async function getTraining(slug: string): Promise<SanityTrainingItem | null> {
    try {
        const training = await client.fetch<SanityTrainingItem>(
            TRAINING_BY_SLUG_QUERY,
            { slug },
            {
                cache: 'force-cache',
                next: { revalidate: 3600 },
            }
        );
        return training || null;
    } catch (error) {
        console.error('Error fetching training:', error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<string[]>(TRAINING_SLUGS_QUERY);
        return slugs.map((slug) => ({
            slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }: TrainingDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const training = await getTraining(slug);

    if (!training) {
        return {
            title: 'Təlim Tapılmadı - İngla School',
            description: 'Axtardığınız təlim tapılmadı.',
        };
    }

    return {
        title: `${training.title} - Təlim Mərkəzi - İngla School`,
        description: training.shortDescription || training.description.substring(0, 160),
        keywords: `${training.title}, təlim, kurs, sertifikat, İngla School, ${training.category}`,
    };
}

export default async function TrainingDetailPage({ params }: TrainingDetailPageProps) {
    const { slug } = await params;
    const training = await getTraining(slug);

    if (!training) {
        notFound();
    }

    return <TrainingDetailClient training={training} />;
}