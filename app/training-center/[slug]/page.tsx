// app/training-center/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { trainingQueries } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { Training } from '@/types/training';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import TrainingDetailClient from './TrainingDetailClient';

interface PageProps {
    params: Promise<{ slug: string }>
}

async function getTraining(slug: string): Promise<Training | null> {
    try {
        const training = await client.fetch(trainingQueries.bySlug, { slug })
        return training
    } catch (error) {
        console.error('Error fetching training:', error)
        return null
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const training = await getTraining(slug)

    if (!training) {
        return {
            title: 'Training Not Found',
        }
    }

    return {
        title: `${training.title} - Training Center`,
        description: training.description || `Learn more about ${training.title}`,
        openGraph: {
            title: training.title,
            description: training.description || `Learn more about ${training.title}`,
            images: training.featuredImage
                ? [urlFor(training.featuredImage).width(1200).height(630).url()]
                : [],
        },
    }
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch(trainingQueries.slugs)
        return slugs.map((item: { slug: string }) => ({
            slug: item.slug,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

export default async function TrainingDetailPage({ params }: PageProps) {
    const { slug } = await params
    const training = await getTraining(slug)

    if (!training) {
        notFound()
    }

    return <TrainingDetailClient training={training} />
}