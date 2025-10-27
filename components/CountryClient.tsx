"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
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

            {/* Universities Section - Creative Design */}
            <motion.section
                id="universities"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-32 relative overflow-hidden"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/5 to-black"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-block mb-4">
                            <span className="text-yellow-500 text-sm font-semibold tracking-wider uppercase px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                Tərəfdaş Universitetlər
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6">
                            Prestijli <span className="text-yellow-500">Universitetlər</span>
                        </h2>
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            Dünya səviyyəli universitetlərdə akademik mükəmməlliyə doğru ilk addımınızı atın
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
                        <>
                            {/* Top Row - Moving Right */}
                            <div className="relative mb-8">
                                <div className="overflow-hidden py-8">
                                    <motion.div
                                        className="flex gap-6"
                                        animate={{
                                            x: [0, -(420 * Math.ceil(universities.length / 2))],
                                        }}
                                        transition={{
                                            x: {
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                duration: Math.ceil(universities.length / 2) * 8,
                                                ease: "linear",
                                            },
                                        }}
                                    >
                                        {/* Render first half twice for seamless loop */}
                                        {[...Array(3)].map((_, setIndex) => (
                                            universities.slice(0, Math.ceil(universities.length / 2)).map((university) => (
                                                <Link
                                                    href={`/universities/${university.slug}`}
                                                    key={`top-${setIndex}-${university.id}`}
                                                    className="flex-shrink-0 w-[400px] h-[260px] group relative"
                                                >
                                                    {/* Glow effect */}
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                    {/* Card */}
                                                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-12 flex items-center justify-center overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500">
                                                        {/* Background pattern */}
                                                        <div className="absolute inset-0 opacity-5">
                                                            <div className="absolute inset-0" style={{
                                                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                                                backgroundSize: '40px 40px'
                                                            }}></div>
                                                        </div>

                                                        {/* Animated gradient overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                        {/* Logo */}
                                                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                            <Image
                                                                src={university.logo}
                                                                alt={university.name}
                                                                width={350}
                                                                height={220}
                                                                className="object-contain w-full h-full transition-all duration-500 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* University name overlay on hover */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                            <p className="text-white font-semibold text-lg text-center">
                                                                {university.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Bottom Row - Moving Left */}
                            {universities.length > 1 && (
                                <div className="relative">
                                    <div className="overflow-hidden py-8">
                                        <motion.div
                                            className="flex gap-6"
                                            animate={{
                                                x: [-(420 * Math.floor(universities.length / 2)), 0],
                                            }}
                                            transition={{
                                                x: {
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    duration: Math.floor(universities.length / 2) * 8,
                                                    ease: "linear",
                                                },
                                            }}
                                        >
                                            {/* Render second half twice for seamless loop */}
                                            {[...Array(3)].map((_, setIndex) => (
                                                universities.slice(Math.ceil(universities.length / 2)).map((university) => (
                                                    <Link
                                                        href={`/universities/${university.slug}`}
                                                        key={`bottom-${setIndex}-${university.id}`}
                                                        className="flex-shrink-0 w-[400px] h-[260px] group relative"
                                                    >
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-12 flex items-center justify-center overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500">
                                                            <div className="absolute inset-0 opacity-5">
                                                                <div className="absolute inset-0" style={{
                                                                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                                                    backgroundSize: '40px 40px'
                                                                }}></div>
                                                            </div>

                                                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                                <Image
                                                                    src={university.logo}
                                                                    alt={university.name}
                                                                    width={350}
                                                                    height={220}
                                                                    className="object-contain w-full h-full transition-all duration-500 group-hover:scale-105"
                                                                />
                                                            </div>

                                                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                                <p className="text-white font-semibold text-lg text-center">
                                                                    {university.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            )}

                            {/* Gradient overlays for fade effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black to-transparent pointer-events-none z-20"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black to-transparent pointer-events-none z-20"></div>
                        </>
                    )}
                </div>

                {/* Bottom CTA */}

            </motion.section>
        </div>
    );
}