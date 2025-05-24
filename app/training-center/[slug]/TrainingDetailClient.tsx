"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";
import {
    ChevronLeft,
    User,
    Clock,
    Calendar,
    BookOpen,
    Award,
    DollarSign,
    ArrowRight
} from "lucide-react";

interface TrainingDetailClientProps {
    training: Training;
}

// Type definitions for PortableText components
interface ImageValue {
    asset: {
        _ref: string;
        _type: string;
    };
    alt?: string;
    _type: string;
}

interface PortableTextProps {
    children: React.ReactNode;
}

interface ImageProps {
    value: ImageValue;
}

interface LinkValue {
    href: string;
}

interface LinkProps {
    value: LinkValue;
    children: React.ReactNode;
}

// Custom components for PortableText with dark theme
const portableTextComponents = {
    types: {
        image: ({ value }: ImageProps) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).width(800).height(400).url()}
                    alt={value.alt || 'Training content image'}
                    width={800}
                    height={400}
                    className="rounded-lg mx-auto border border-gray-700"
                />
            </div>
        ),
    },
    block: {
        h1: ({ children }: PortableTextProps) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
        ),
        h2: ({ children }: PortableTextProps) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-200">{children}</h2>
        ),
        h3: ({ children }: PortableTextProps) => (
            <h3 className="text-xl font-medium mt-4 mb-2 text-gray-200">{children}</h3>
        ),
        blockquote: ({ children }: PortableTextProps) => (
            <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4 text-gray-300 bg-gray-900/50 p-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
        normal: ({ children }: PortableTextProps) => (
            <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
        ),
    },
    marks: {
        link: ({ value, children }: LinkProps) => (
            <a
                href={value.href}
                className="text-yellow-400 hover:text-yellow-300 underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
        strong: ({ children }: PortableTextProps) => (
            <strong className="text-white font-semibold">{children}</strong>
        ),
    },
    list: {
        bullet: ({ children }: PortableTextProps) => (
            <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">
                {children}
            </ul>
        ),
        number: ({ children }: PortableTextProps) => (
            <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: PortableTextProps) => (
            <li className="ml-4">{children}</li>
        ),
        number: ({ children }: PortableTextProps) => (
            <li className="ml-4">{children}</li>
        ),
    },
};

export default function TrainingDetailClient({ training }: TrainingDetailClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'intermediate':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'advanced':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const handleEnrollClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative">
                {training.featuredImage && (
                    <div className="relative h-[60vh] overflow-hidden">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                        <Image
                            src={urlFor(training.featuredImage).width(1200).height(600).url()}
                            alt={training.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="relative z-20 container mx-auto px-4 -mt-32">
                    {/* Navigation */}
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <Link
                            href="/training-center"
                            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium group transition-colors duration-300"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
                            Təlim Mərkəzinə Qayıt
                        </Link>
                    </motion.nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2"
                        >
                            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                                {training.title}
                            </h1>

                            {training.description && (
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    {training.description}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 mb-8">
                                {training.level && (
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getLevelBadgeColor(training.level)}`}>
                                        {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
                                    </span>
                                )}
                                {training.category && (
                                    <span className="px-3 py-1 text-sm font-medium bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                                        {training.category}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Training Details Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 sticky top-8 shadow-2xl">
                                {training.price && (
                                    <div className="text-center mb-6">
                                        <div className="bg-yellow-500 text-black px-4 py-2 rounded-full inline-block mb-2">
                                            <DollarSign className="w-5 h-5 inline mr-1" />
                                            <span className="text-2xl font-bold">{training.price}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 mb-8">
                                    {training.instructor && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <User className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-200 text-sm">İnstruktor</h3>
                                                <p className="text-white">{training.instructor}</p>
                                            </div>
                                        </div>
                                    )}

                                    {training.duration && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <Clock className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-200 text-sm">Müddət</h3>
                                                <p className="text-white">{training.duration}</p>
                                            </div>
                                        </div>
                                    )}

                                    {training.startDate && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <Calendar className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-200 text-sm">Başlama Tarixi</h3>
                                                <p className="text-white">{formatDate(training.startDate)}</p>
                                            </div>
                                        </div>
                                    )}

                                    {training.endDate && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <Calendar className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-200 text-sm">Bitmə Tarixi</h3>
                                                <p className="text-white">{formatDate(training.endDate)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={handleEnrollClick}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 group text-lg"
                                >
                                    <span>İndi Qeydiyyatdan Keç</span>
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="container mx-auto px-4 py-16"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 lg:p-12">
                        <div className="flex items-center mb-8">
                            <BookOpen className="w-6 h-6 text-yellow-500 mr-3" />
                            <h2 className="text-2xl font-bold text-white">Təlim Məzmunu</h2>
                        </div>

                        {training.content && training.content.length > 0 ? (
                            <div className="prose prose-lg max-w-none prose-invert">
                                <PortableText
                                    value={training.content}
                                    components={portableTextComponents}
                                />
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg">
                                    Bu təlim üçün ətraflı məzmun tezliklə əlavə ediləcək.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={training.title}
            />
        </div>
    );
}