"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    GraduationCap,
    Clock,
    Users,
    Star,
    Calendar,
    BookOpen,
    Award,
    Target,
    TrendingUp,
    User,
    DollarSign
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";
import RegistrationModal from "@/components/RegistrationModal";

interface TrainingClientProps {
    initialTrainings: Training[];
}

export default function TrainingClient({ initialTrainings }: TrainingClientProps) {
    const [trainings] = useState<Training[]>(initialTrainings);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string>("");

    // Refs for scroll effects
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    // Animation variants
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
            transition: {
                duration: 0.6,
            },
        },
    };

    // Helper functions
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleRegisterClick = (trainingTitle: string) => {
        setSelectedTraining(trainingTitle);
        setIsModalOpen(true);
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Training Center"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl font-bold mb-6 text-white">
                            <span className="text-yellow-500">Təlim</span> Mərkəzi
                        </h1>
                        <p className="text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
                            Peşəkar inkişaf üçün hərtərəfli təlim proqramları və karyeranızın qurulması
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
            </motion.div>

            {/* Trainings Section */}
            <motion.section
                id="trainings"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Mövcud <span className="text-yellow-500">Təlimlər</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Sahə ekspertlərindən öyrənin və praktik bacarıqlar qazanın
                        </p>
                    </motion.div>

                    {trainings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trainings.map((training, index) => (
                                <motion.div
                                    key={training._id}
                                    variants={cardVariants}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 hover:border-yellow-500/50 h-full flex flex-col">
                                        {/* Training Image */}
                                        {training.featuredImage && (
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={urlFor(training.featuredImage).width(400).height(200).url()}
                                                    alt={training.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                                {/* Level Badge */}
                                                <div className="absolute top-4 left-4">
                                                    {training.level && (
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getLevelBadgeColor(training.level)}`}>
                                                            {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Price Badge */}
                                                <div className="absolute top-4 right-4">
                                                    {training.price && (
                                                        <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                                            ${training.price}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Training Details */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                                {training.title}
                                            </h3>

                                            {training.description && (
                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3 flex-1">
                                                    {training.description}
                                                </p>
                                            )}

                                            {/* Training Info Grid */}
                                            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                                {training.instructor && (
                                                    <div className="flex items-center text-gray-400">
                                                        <User className="w-3 h-3 mr-1 text-yellow-500" />
                                                        <span className="truncate">{training.instructor}</span>
                                                    </div>
                                                )}

                                                {training.duration && (
                                                    <div className="flex items-center text-gray-400">
                                                        <Clock className="w-3 h-3 mr-1 text-yellow-500" />
                                                        <span>{training.duration}</span>
                                                    </div>
                                                )}

                                                {training.category && (
                                                    <div className="flex items-center text-gray-400">
                                                        <BookOpen className="w-3 h-3 mr-1 text-yellow-500" />
                                                        <span className="truncate">{training.category}</span>
                                                    </div>
                                                )}

                                                {training.startDate && (
                                                    <div className="flex items-center text-gray-400">
                                                        <Calendar className="w-3 h-3 mr-1 text-yellow-500" />
                                                        <span className="truncate">{formatDate(training.startDate)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 mt-auto">
                                                <Button
                                                    onClick={() => handleRegisterClick(training.title)}
                                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-colors"
                                                >
                                                    Qeydiyyat
                                                </Button>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="px-3 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                                                >
                                                    <a href={`/training-center/${training.slug.current}`}>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            variants={cardVariants}
                            className="text-center py-16"
                        >
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 max-w-md mx-auto">
                                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                                    Hazırda təlim yoxdur
                                </h2>
                                <p className="text-gray-400">
                                    Yeni təlim imkanları üçün tezliklə yoxlayın!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.section>

            {/* Why Choose Our Training Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Niyə <span className="text-yellow-500">Bizim Təlimləri</span> Seçməlisiniz?
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Peşəkar inkişaf üçün keyfiyyətli təlim təcrübəsinin üstünlükləri
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Sertifikatlaşdırılmış Təlimlər",
                                description: "Beynəlxalq standartlara uyğun sertifikatlar və peşəkar tanınma"
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Təcrübəli İnstruktorlar",
                                description: "Sahə ekspertlərindən praktik təcrübə və real layihələr"
                            },
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: "Praktik Yanaşma",
                                description: "Nəzəri biliklərla yanaşı praktik bacarıqların inkişafı"
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8" />,
                                title: "Karyera İnkişafı",
                                description: "İş imkanları və karyera perspektivlərinin genişləndirilməsi"
                            },
                            {
                                icon: <BookOpen className="w-8 h-8" />,
                                title: "Aktual Məzmun",
                                description: "Müasir tələblərə uyğun yenilənən təlim materialları"
                            },
                            {
                                icon: <Star className="w-8 h-8" />,
                                title: "Keyfiyyət Zəmanəti",
                                description: "Yüksək keyfiyyətli təhsil və müştəri məmnuniyyəti"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-500/50 transition-all duration-300"
                            >
                                <div className="text-yellow-500 mb-4 flex justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={cardVariants}
                        className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Karyeranızı <span className="text-yellow-500">İrəli Aparın</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Bizim peşəkar təlim proqramlarımızla bacarıqlarınızı inkişaf etdirin və karyera məqsədlərinizə çatın
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => {
                                    setSelectedTraining("Ümumi Məsləhət");
                                    setIsModalOpen(true);
                                }}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg"
                            >
                                İndi Başlayın
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg"
                            >
                                <a href="#trainings">Təlimləri Araşdırın</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={selectedTraining}
            />
        </div>
    );
}