"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    GraduationCap,
    Globe,
    MapPin,
    Calendar,
    Users,
    Star,
    Clock,
    ExternalLink,
    Phone,
    Mail
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { COUNTRIES_QUERY } from "@/sanity/lib/queries";
import {
    SanityCountry,
    Country,
} from "@/types/study-abroad";

interface StudyAbroadClientProps {
    initialCountriesData?: SanityCountry[];
}

export default function StudyAbroadClient({
    initialCountriesData,
}: StudyAbroadClientProps) {
    // State management
    const [countries, setCountries] = useState<Country[]>([]);
    const [countriesLoading, setCountriesLoading] = useState(!initialCountriesData);

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

    // Transform functions
    const transformCountriesData = (sanityCountries: SanityCountry[]): Country[] => {
        return sanityCountries
            .filter(country => country && country._id && country.nameAz)
            .map((country) => ({
                id: country._id,
                name: country.name,
                nameAz: country.nameAz,
                slug: country.slug.current,
                shortDescription: country.shortDescription,
                fullDescription: country.fullDescription,
                flagImage: country.flagImage ? urlFor(country.flagImage).width(80).height(60).quality(90).url() : '',
                coverImage: country.coverImage ? urlFor(country.coverImage).width(400).height(300).quality(85).url() : '',
                gallery: country.gallery?.map(img => urlFor(img).width(800).height(600).quality(85).url()),
                highlights: country.highlights,
                studyInfo: country.studyInfo,
                popularPrograms: country.popularPrograms,
                isFeatured: country.isFeatured,
            }));
    };



    // Load data
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                // Load countries
                if (initialCountriesData && initialCountriesData.length > 0) {
                    if (isMounted) {
                        setCountries(transformCountriesData(initialCountriesData));
                        setCountriesLoading(false);
                    }
                } else {
                    const countriesData = await client.fetch<SanityCountry[]>(COUNTRIES_QUERY);
                    if (isMounted && countriesData) {
                        setCountries(transformCountriesData(countriesData));
                        setCountriesLoading(false);
                    }
                }


            } catch (error) {
                console.error('Error loading study abroad data:', error);
                if (isMounted) {
                    setCountriesLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [initialCountriesData]);

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'text-blue-400 bg-blue-400/10';
            case 'ongoing': return 'text-green-400 bg-green-400/10';
            case 'completed': return 'text-gray-400 bg-gray-400/10';
            case 'cancelled': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'upcoming': return 'Gələcək';
            case 'ongoing': return 'Davam edir';
            case 'completed': return 'Tamamlandı';
            case 'cancelled': return 'Ləğv edildi';
            default: return status;
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                        alt="Xaricdə Təhsil"
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
                            <span className="text-yellow-500">Xaricdə</span> Təhsil
                        </h1>
                        <p className="text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
                            Dünya universitetlərində təhsil imkanları və gələcəyinizin qurulması
                        </p>

                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
            </motion.div>

            {/* Countries Section */}
            <motion.section
                id="countries"
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
                            Təhsil <span className="text-yellow-500">Ölkələri</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Dünyanın ən prestijli universitetlərinə malik ölkələrdə təhsil imkanlarını kəşf edin
                        </p>
                    </motion.div>

                    {countriesLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Ölkələr yüklənir...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {countries.map((country, index) => (
                                <motion.div
                                    key={country.id}
                                    variants={cardVariants}
                                    className={`group cursor-pointer ${country.isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                                >
                                    <Link href={`/studyabroad/${country.slug}`}>
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 hover:border-yellow-500/50">
                                            {/* Country Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={country.coverImage || '/assets/bg.webp'}
                                                    alt={country.nameAz}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                                {/* Flag and Featured Badge */}
                                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                                    {country.flagImage && (
                                                        <div className="w-10 h-8 rounded overflow-hidden border border-gray-600">
                                                            <Image
                                                                src={country.flagImage}
                                                                alt={`${country.nameAz} bayrağı`}
                                                                width={40}
                                                                height={32}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                    )}
                                                    {country.isFeatured && (
                                                        <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                                                            Populyar
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Quick Info */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {country.nameAz}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Country Details */}
                                            <div className="p-6">
                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                                    {country.shortDescription}
                                                </p>

                                                {/* Study Info */}
                                                {country.studyInfo && (
                                                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                                                        {country.studyInfo.language && (
                                                            <div className="flex items-center text-gray-400">
                                                                <Globe className="w-3 h-3 mr-1" />
                                                                {country.studyInfo.language}
                                                            </div>
                                                        )}
                                                        {country.studyInfo.currency && (
                                                            <div className="flex items-center text-gray-400">
                                                                <span className="mr-1">💰</span>
                                                                {country.studyInfo.currency}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Popular Programs */}
                                                {country.popularPrograms && country.popularPrograms.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {country.popularPrograms.slice(0, 3).map((program, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="bg-gray-800 text-yellow-400 px-2 py-1 rounded text-xs"
                                                                >
                                                                    {program}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Action */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-yellow-500 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                                                        Ətraflı məlumat
                                                    </span>
                                                    <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>


            {/* Why Study Abroad Section */}
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
                            Niyə <span className="text-yellow-500">Xaricdə Təhsil?</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Beynəlxalq təhsil təcrübəsinin gətirdiyi üstünlüklər
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <GraduationCap className="w-8 h-8" />,
                                title: "Keyfiyyətli Təhsil",
                                description: "Dünya standartlarına uyğun təhsil proqramları və beynəlxalq akkreditasiya"
                            },
                            {
                                icon: <Globe className="w-8 h-8" />,
                                title: "Beynəlxalq Təcrübə",
                                description: "Müxtəlif mədəniyyətlərlə tanışlıq və qlobal dünyagörüşün formalaşması"
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Geniş Şəbəkə",
                                description: "Beynəlxalq əlaqələr və peşəkar şəbəkənin qurulması"
                            },
                            {
                                icon: <Star className="w-8 h-8" />,
                                title: "Karyera İmkanları",
                                description: "Qlobal iş bazarında rəqabət qabiliyyəti və geniş iş imkanları"
                            },
                            {
                                icon: <MapPin className="w-8 h-8" />,
                                title: "Yeni Mədəniyyətlər",
                                description: "Fərqli mədəniyyətləri tanımaq və şəxsi inkişaf imkanları"
                            },
                            {
                                icon: <ExternalLink className="w-8 h-8" />,
                                title: "Gələcək Perspektivləri",
                                description: "Beynəlxalq diploma və geniş karyera perspektivləri"
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


        </div>
    );
}