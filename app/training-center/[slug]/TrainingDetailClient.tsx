"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";

interface TrainingDetailClientProps {
    training: Training;
}

// Custom components for PortableText
const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).width(800).height(400).url()}
                    alt={value.alt || 'Training content image'}
                    width={800}
                    height={400}
                    className="rounded-lg mx-auto"
                />
            </div>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-medium mt-4 mb-2 text-gray-800">{children}</h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
    },
    marks: {
        link: ({ value, children }: any) => (
            <a
                href={value.href}
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};

export default function TrainingDetailClient({ training }: TrainingDetailClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'advanced':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleEnrollClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <nav className="mb-6">
                        <Link
                            href="/training-center"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Training Center
                        </Link>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {training.title}
                            </h1>

                            {training.description && (
                                <p className="text-xl text-gray-600 mb-6">
                                    {training.description}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-4 mb-6">
                                {training.level && (
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getLevelBadgeColor(training.level)}`}>
                                        {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
                                    </span>
                                )}
                                {training.category && (
                                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                                        {training.category}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Training Details Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                {training.featuredImage && (
                                    <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                                        <Image
                                            src={urlFor(training.featuredImage).width(400).height(200).url()}
                                            alt={training.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="space-y-4 mb-6">
                                    {training.price && (
                                        <div className="text-center">
                                            <span className="text-3xl font-bold text-blue-600">
                                                ${training.price}
                                            </span>
                                        </div>
                                    )}

                                    {training.instructor && (
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Instructor</h3>
                                            <p className="text-gray-600">{training.instructor}</p>
                                        </div>
                                    )}

                                    {training.duration && (
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Duration</h3>
                                            <p className="text-gray-600">{training.duration}</p>
                                        </div>
                                    )}

                                    {training.startDate && (
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Start Date</h3>
                                            <p className="text-gray-600">{formatDate(training.startDate)}</p>
                                        </div>
                                    )}

                                    {training.endDate && (
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">End Date</h3>
                                            <p className="text-gray-600">{formatDate(training.endDate)}</p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={handleEnrollClick}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Enroll Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {training.content && training.content.length > 0 ? (
                        <div className="prose prose-lg max-w-none">
                            <PortableText
                                value={training.content}
                                components={portableTextComponents}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                Detailed content for this training will be available soon.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={training.title}
            />
        </div>
    );
}