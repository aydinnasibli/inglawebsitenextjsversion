// app/training-center/page.tsx
import { client } from '@/sanity/lib/client';
import { trainingQueries } from '@/sanity/lib/queries';
import { Training } from '@/types/training';
import { Metadata } from 'next';
import TrainingClient from './TrainingClient';

export const metadata: Metadata = {
    title: 'Training Center - Professional Development Courses',
    description: 'Explore our comprehensive training programs designed to enhance your skills and advance your career.',
}

async function getTrainings(): Promise<Training[]> {
    try {
        const trainings = await client.fetch(trainingQueries.all)
        return trainings || []
    } catch (error) {
        console.error('Error fetching trainings:', error)
        return []
    }
}

export default async function TrainingCenterPage() {
    const trainings = await getTrainings()

    return <TrainingClient initialTrainings={trainings} />
}