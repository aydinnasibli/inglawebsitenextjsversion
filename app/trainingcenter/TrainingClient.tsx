// app/telim-merkezi/TrainingClient.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Users,
    Star,
    Calendar,
    ChevronRight,
    BookOpen,
    Award,
    Filter,
    Search
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TRAININGS_QUERY } from "@/sanity/lib/queries";
import { SanityTrainingItem, TrainingItem } from "@/types/training";

interface TrainingClientProps {
    initialTrainings: SanityTrainingItem[];
}

const getLevelDisplayName = (level: string) => {
    const levelNames: Record<string, string> = {
        'beginner': 'Başlanğıc',
        'intermediate': 'Orta',
        'advanced': 'İrəliqəl'
    };
    return levelNames[level] || 'Başlanğıc';
};

const getLevelColor = (level: string) => {
    const levelColors: Record<string, string> = {
        'beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
        'intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return levelColors[level] || 'bg-green-500/20 text-green-400 border-green-500/30';
};

const transformTrainingData = (sanityItems: SanityTrainingItem[]): TrainingItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.title)
        .map((item) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            shortDescription: item.shortDescription,
            slug: item.slug?.current || '',
            image: item.image ? urlFor(item.image).width(600).height(400).quality(85).url() : '/assets/bg.webp',
            duration: item.duration,
            price: item.price,
            level: item.level,
            category: item.category,
            instructor: item.instructor,
            features: item.features,
            schedule: item.schedule,
            maxStudents: item.maxStudents,
            currentStudents: item.currentStudents || 0,
            isActive: item.isActive !== false,
            createdAt: item._createdAt,
            updatedAt: item._updatedAt,
        }));
};

export default function TrainingClient({ initialTrainings }: TrainingClientProps) {
    const [trainings, setTrainings] = useState<TrainingItem[]>([]);
    const [filteredTrainings, setFilteredTrainings] = useState<TrainingItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    useEffect(() => {
        const transformedData = transformTrainingData(initialTrainings);
        setTrainings(transformedData);
        setFilteredTrainings(transformedData);
    }, [initialTrainings]);

    // Filter trainings based on search and filters
    useEffect(() => {
        let filtered = trainings;

        if (searchTerm) {
            filtered = filtered.filter(training =>
                training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                training.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedLevel !== 'all') {
            filtered = filtered.filter(training => training.level === selectedLevel);
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(training => training.category === selectedCategory);
        }

        setFilteredTrainings(filtered);
    }, [trainings, searchTerm, selectedLevel, selectedCategory]);

    // Get unique levels and categories for filters
    const levels = Array.from(new Set(trainings.map(t => t.level).filter(Boolean)));
    const categories = Array.from(new Set(trainings.map(t => t.category).filter(Boolean)));

    const availableSpots = (maxStudents: number = 0, currentStudents: number = 0) => {
        return Math.max(0, maxStudents - currentStudents);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Təlim Mərkəzi"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                <span className="text-yellow-500">Təlim</span> Mərkəzi
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                                Peşəkar inkişaf üçün müxtəlif təlim proqramları və sertifikatlaşdırma kursları
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    <span>Sertifikatlaşdırma</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-yellow-500" />
                                    <span>Praktik Təlim</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-yellow-500" />
                                    <span>Kiçik Qruplar</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Filter Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-12 bg-gray-900/30"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                {/* Search */}
                                <div className="relative flex-1 min-w-0">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Təlim axtarın..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                </div>

                                {/* Level Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-gray-400" />
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                    >
                                        <option value="all">Bütün Səviyyələr</option>
                                        {levels.map(level => (
                                            <option key={level} value={level}>
                                                {getLevelDisplayName(level || '')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                    >
                                        <option value="all">Bütün Kateqoriyalar</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Trainings Grid */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Təlimlər yüklənir...</p>
                            </div>
                        </div>
                    ) : filteredTrainings.length === 0 ? (
                        <div className="text-center py-16">
                            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">Təlim tapılmadı</h3>
                            <p className="text-gray-500">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTrainings.map((training, index) => (
                                <motion.div
                                    key={training.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-500 hover:border-yellow-500/30 hover:-translate-y-2">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={training.image || '/assets/bg.webp'}
                                                alt={training.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Level Badge */}
                                            {training.level && (
                                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(training.level)}`}>
                                                    {getLevelDisplayName(training.level)}
                                                </div>
                                            )}

                                            {/* Price Badge */}
                                            {training.price && (
                                                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                                    {training.price} AZN
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors line-clamp-2">
                                                    {training.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm line-clamp-3">
                                                    {training.shortDescription || training.description}
                                                </p>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="space-y-3 mb-6">
                                                {training.duration && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Clock className="w-4 h-4 text-yellow-500" />
                                                        <span>{training.duration}</span>
                                                    </div>
                                                )}

                                                {training.maxStudents && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Users className="w-4 h-4 text-yellow-500" />
                                                        <span>
                                                            {availableSpots(training.maxStudents, training.currentStudents)} yer qalıb
                                                        </span>
                                                    </div>
                                                )}

                                                {training.instructor && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span>{training.instructor}</span>
                                                    </div>
                                                )}

                                                {training.schedule?.startDate && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Calendar className="w-4 h-4 text-yellow-500" />
                                                        <span>
                                                            {new Date(training.schedule.startDate).toLocaleDateString('az-AZ')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Features */}
                                            {training.features && training.features.length > 0 && (
                                                <div className="mb-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {training.features.slice(0, 3).map((feature, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                        {training.features.length > 3 && (
                                                            <span className="text-xs text-yellow-500">
                                                                +{training.features.length - 3} daha
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <Link href={`/telim-merkezi/${training.slug}`}>
                                                <Button className="w-full bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">
                                                    <span>Ətraflı Məlumat</span>
                                                    <ChevronRight className="ml-2 w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Öz <span className="text-yellow-500">Karyeranızı</span> İnkişaf Etdirin
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Peşəkar təlimlərimizlə yeni bacarıqlar əldə edin və karyera yüksəlişinizi təmin edin
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-yellow-500 text-black hover:bg-yellow-600 transition-colors px-8 py-3">
                            Məsləhət Alın
                        </Button>
                        <Button className="border-2 border-white text-white hover:bg-white hover:text-black transition-colors px-8 py-3">
                            Əlaqə
                        </Button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}