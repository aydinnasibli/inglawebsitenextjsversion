// app/training-center/page.tsx
import { client } from '@/sanity/lib/client';
import { trainingQueries } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { Training } from '@/types/training';
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Training Center - Professional Development Courses',
    description: 'Explore our comprehensive training programs designed to enhance your skills and advance your career.',
}

async function getTrainings(): Promise<Training[]> {
    try {
        const trainings = await client.fetch(trainingQueries.all)
        return trainings
    } catch (error) {
        console.error('Error fetching trainings:', error)
        return []
    }
}

function TrainingCard({ training }: { training: Training }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-100 text-green-800'
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800'
            case 'advanced':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {training.featuredImage && (
                <div className="relative h-48 w-full">
                    <Image
                        src={urlFor(training.featuredImage).width(400).height(200).url()}
                        alt={training.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    {training.level && (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor(training.level)}`}>
                            {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
                        </span>
                    )}
                    {training.price && (
                        <span className="text-lg font-bold text-blue-600">
                            ${training.price}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {training.title}
                </h3>

                {training.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {training.description}
                    </p>
                )}

                <div className="space-y-2 mb-4">
                    {training.instructor && (
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Instructor:</span>
                            <span className="ml-2">{training.instructor}</span>
                        </div>
                    )}

                    {training.duration && (
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Duration:</span>
                            <span className="ml-2">{training.duration}</span>
                        </div>
                    )}

                    {training.category && (
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Category:</span>
                            <span className="ml-2">{training.category}</span>
                        </div>
                    )}

                    {training.startDate && (
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Start Date:</span>
                            <span className="ml-2">{formatDate(training.startDate)}</span>
                        </div>
                    )}
                </div>

                <Link
                    href={`/training-center/${training.slug.current}`}
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Learn More
                </Link>
            </div>
        </div>
    )
}

export default async function TrainingCenterPage() {
    const trainings = await getTrainings()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Training Center
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Advance your career with our comprehensive training programs.
                            Learn from industry experts and gain practical skills that matter.
                        </p>
                    </div>
                </div>
            </div>

            {/* Training Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {trainings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trainings.map((training) => (
                            <TrainingCard key={training._id} training={training} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            No trainings available at the moment
                        </h2>
                        <p className="text-gray-500">
                            Check back soon for new training opportunities!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}