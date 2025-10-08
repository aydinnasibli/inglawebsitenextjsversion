"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Globe,
    Calendar,
    DollarSign,
    FileText,
    Building2
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react';
import {
    UNIVERSITIES_BY_COUNTRY_QUERY,
} from "@/sanity/lib/queries";
import {
    SanityCountry,
    SanityUniversity,
    Country,
    University,
} from "@/types/study-abroad";

interface CountryClientProps {
    initialCountryData: SanityCountry;
    initialUniversitiesData?: SanityUniversity[];
}

export default function CountryClient({
    initialCountryData,
    initialUniversitiesData,
}: CountryClientProps) {
    // State management
    const [country, setCountry] = useState<Country | null>(null);
    const [universities, setUniversities] = useState<University[]>([]);
    const [universitiesLoading, setUniversitiesLoading] = useState(!initialUniversitiesData);

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

    // Transform functions
    const transformCountryData = (sanityCountry: SanityCountry): Country => {
        return {
            id: sanityCountry._id,
            name: sanityCountry.name,
            nameAz: sanityCountry.nameAz,
            slug: sanityCountry.slug.current,
            shortDescription: sanityCountry.shortDescription,
            fullDescription: sanityCountry.fullDescription,
            flagImage: sanityCountry.flagImage ? urlFor(sanityCountry.flagImage).width(120).height(90).quality(90).url() : '',
            coverImage: sanityCountry.coverImage ? urlFor(sanityCountry.coverImage).width(1200).height(600).quality(85).url() : '',
            gallery: sanityCountry.gallery?.map(img => urlFor(img).width(800).height(600).quality(85).url()),
            highlights: sanityCountry.highlights,
            studyInfo: sanityCountry.studyInfo,
            popularPrograms: sanityCountry.popularPrograms,
            isFeatured: sanityCountry.isFeatured,
        };
    };

    const transformUniversitiesData = (sanityUniversities: SanityUniversity[]): University[] => {
        return sanityUniversities
            .filter(uni => uni && uni._id && uni.name)
            .map((uni) => ({
                id: uni._id,
                name: uni.name,
                slug: uni.slug.current,
                country: {
                    id: uni.country._id,
                    name: uni.country.name,
                    nameAz: uni.country.nameAz,
                    slug: uni.country.slug.current,
                },
                logo: uni.logo ? urlFor(uni.logo).width(200).height(200).quality(90).url() : '',
            }));
    };

    // Load data
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                // Transform initial country data
                if (initialCountryData && isMounted) {
                    setCountry(transformCountryData(initialCountryData));
                }

                // Load universities
                if (initialUniversitiesData && initialUniversitiesData.length > 0) {
                    if (isMounted) {
                        setUniversities(transformUniversitiesData(initialUniversitiesData));
                        setUniversitiesLoading(false);
                    }
                } else if (initialCountryData) {
                    const universitiesData = await client.fetch<SanityUniversity[]>(
                        UNIVERSITIES_BY_COUNTRY_QUERY,
                        { countryId: initialCountryData._id }
                    );
                    if (isMounted && universitiesData) {
                        setUniversities(transformUniversitiesData(universitiesData));
                        setUniversitiesLoading(false);
                    }
                }

            } catch (error) {
                console.error('Error loading country data:', error);
                if (isMounted) {
                    setUniversitiesLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [initialCountryData, initialUniversitiesData]);

    if (!country) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-300">Məlumatlar yüklənir...</p>
                </div>
            </div>
        );
    }

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
                        src={country.coverImage || '/assets/bg.webp'}
                        alt={country.nameAz}
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                {/* Back Button */}
                <div className="absolute top-8 left-8 z-30">
                    <Link href="/studyabroad">
                        <Button variant="outline" className="border-white/50 text-white hover:bg-white hover:text-black">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Geri
                        </Button>
                    </Link>
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Flag and Country Name */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            {country.flagImage && (
                                <div className="w-16 h-12 rounded overflow-hidden border-2 border-white shadow-lg">
                                    <Image
                                        src={country.flagImage}
                                        alt={`${country.nameAz} bayrağı`}
                                        width={64}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                            <h1 className="text-6xl font-bold text-white">
                                <span className="text-yellow-500">{country.nameAz}də</span> Təhsil
                            </h1>
                        </div>

                        <p className="text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
                            {country.shortDescription}
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
            </motion.div>

            {/* Country Information Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {country.fullDescription && (
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <PortableText value={country.fullDescription} />
                                </div>
                            )}

                            {/* Highlights */}
                            {country.highlights && country.highlights.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold mb-6 text-yellow-500">Üstünlüklər</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {country.highlights.map((highlight, index) => (
                                            <div
                                                key={index}
                                                className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-500/50 transition-all duration-300"
                                            >
                                                <h4 className="text-lg font-semibold text-white mb-2">
                                                    {highlight.title}
                                                </h4>
                                                {highlight.description && (
                                                    <p className="text-gray-300 text-sm">
                                                        {highlight.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Study Info Card */}
                            {country.studyInfo && (
                                <div className="top-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold mb-4 text-yellow-500">Təhsil Məlumatları</h3>
                                    <div className="space-y-4">
                                        {country.studyInfo.language && (
                                            <div className="flex items-center">
                                                <Globe className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Dil</div>
                                                    <div className="text-white">{country.studyInfo.language}</div>
                                                </div>
                                            </div>
                                        )}
                                        {country.studyInfo.currency && (
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Valyuta</div>
                                                    <div className="text-white">{country.studyInfo.currency}</div>
                                                </div>
                                            </div>
                                        )}
                                        {country.studyInfo.averageCost && (
                                            <div className="flex items-center">
                                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Orta Təhsil Haqqı</div>
                                                    <div className="text-white">{country.studyInfo.averageCost}</div>
                                                </div>
                                            </div>
                                        )}
                                        {country.studyInfo.livingCost && (
                                            <div className="flex items-center">
                                                <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Yaşayış Xərci</div>
                                                    <div className="text-white">{country.studyInfo.livingCost}</div>
                                                </div>
                                            </div>
                                        )}
                                        {country.studyInfo.applicationDeadline && (
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Müraciət Tarixi</div>
                                                    <div className="text-white">{country.studyInfo.applicationDeadline}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Visa Requirements */}
                                    {country.studyInfo.visaRequirements && country.studyInfo.visaRequirements.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-700">
                                            <h4 className="text-lg font-semibold mb-3 text-white">Viza Tələbləri</h4>
                                            <ul className="space-y-2">
                                                {country.studyInfo.visaRequirements.map((requirement, index) => (
                                                    <li key={index} className="text-sm text-gray-300 flex items-start">
                                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        {requirement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Popular Programs */}
                            {country.popularPrograms && country.popularPrograms.length > 0 && (
                                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-4 text-yellow-500">Populyar Proqramlar</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {country.popularPrograms.map((program, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-800 text-yellow-400 px-3 py-1 rounded text-sm"
                                            >
                                                {program}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Universities Carousel Section */}
            <motion.section
                id="universities"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 bg-gray-900/30 overflow-hidden"
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
                            {country.nameAz} <span className="text-yellow-500">Universitetləri</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            {country.nameAz}in ən yaxşı universitetlərində təhsil imkanlarını kəşf edin
                        </p>
                    </motion.div>

                    {universitiesLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Universitetlər yüklənir...</p>
                            </div>
                        </div>
                    ) : universities.length === 0 ? (
                        <div className="text-center py-12">
                            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                Hal-hazırda universitet məlumatı yoxdur
                            </h3>
                            <p className="text-gray-500">
                                Bu ölkədəki universitet imkanları haqqında məlumat üçün bizimlə əlaqə saxlayın
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Infinite Carousel */}
                            <div className="overflow-hidden">
                                <motion.div
                                    className="flex gap-12"
                                    animate={{
                                        x: [0, -100 * universities.length],
                                    }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: universities.length * 3,
                                            ease: "linear",
                                        },
                                    }}
                                >
                                    {/* First set */}
                                    {universities.map((university) => (
                                        <div
                                            key={`first-${university.id}`}
                                            className="flex-shrink-0 w-48 h-48 bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
                                        >
                                            <Image
                                                src={university.logo}
                                                alt={university.name}
                                                width={150}
                                                height={150}
                                                className="object-contain max-w-full max-h-full"
                                            />
                                        </div>
                                    ))}
                                    {/* Duplicate set for seamless loop */}
                                    {universities.map((university) => (
                                        <div
                                            key={`second-${university.id}`}
                                            className="flex-shrink-0 w-48 h-48 bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
                                        >
                                            <Image
                                                src={university.logo}
                                                alt={university.name}
                                                width={150}
                                                height={150}
                                                className="object-contain max-w-full max-h-full"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Gradient overlays */}
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900/30 to-transparent pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900/30 to-transparent pointer-events-none"></div>
                        </div>
                    )}
                </div>
            </motion.section>
        </div>
    );
}