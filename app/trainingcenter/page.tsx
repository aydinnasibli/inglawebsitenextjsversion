// app/telim-merkezi/page.tsx
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { TRAININGS_QUERY } from '@/sanity/lib/queries';
import { SanityTrainingItem } from '@/types/training';
import TrainingClient from './TrainingClient';

export const metadata: Metadata = {
    title: 'Təlim Mərkəzi - İngla School',
    description: 'Peşəkar inkişaf üçün müxtəlif təlim proqramları və sertifikatlaşdırma kursları',
    keywords: 'təlim, kurs, sertifikat, peşəkar inkişaf, İngla School',
};

async function getTrainings(): Promise<SanityTrainingItem[]> {
    try {
        const trainings = await client.fetch<SanityTrainingItem[]>(
            TRAININGS_QUERY,
            {},
            {
                cache: 'force-cache',
                next: { revalidate: 3600 }, // Revalidate every hour
            }
        );
        return trainings || [];
    } catch (error) {
        console.error('Error fetching trainings:', error);
        return [];
    }
}

export default async function TrainingPage() {
    const trainings = await getTrainings();

    return <TrainingClient initialTrainings={trainings} />;
}