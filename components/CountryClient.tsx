"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    ArrowLeft,
    GraduationCap,
    Globe,
    MapPin,
    Calendar,
    Users,
    Star,
    Clock,
    ExternalLink,
    Phone,
    Mail,
    DollarSign,
    FileText,
    Award,
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
                shortDescription: uni.shortDescription,
                fullDescription: uni.fullDescription,
                logo: uni.logo ? urlFor(uni.logo).width(120).height(120).quality(90).url() : '',
                coverImage: uni.coverImage ? urlFor(uni.coverImage).width(600).height(400).quality(85).url() : '',
                gallery: uni.gallery?.map(img => urlFor(img).width(800).height(600).quality(85).url()),
                ranking: uni.ranking,
                established: uni.established,
                studentCount: uni.studentCount,
                location: uni.location,
                programs: uni.programs,
                facilities: uni.facilities,
                admissionInfo: uni.admissionInfo,
                scholarships: uni.scholarships,
                contactInfo: uni.contactInfo,
                isFeatured: uni.isFeatured,
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

    // Helper functions
    const getDegreeDisplayName = (degree: string) => {
        const degreeNames: Record<string, string> = {
            'bachelor': 'Bakalavr',
            'master': 'Magistr',
            'phd': 'Doktorluq',
            'foundation': 'Foundation',
            'certificate': 'Sertifikat'
        };
        return degreeNames[degree] || degree;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('az-AZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                                <GraduationCap className="mr-2 h-5 w-5" />
                                Universitetləri Gör
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-black hover:bg-white hover:text-black"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Məsləhət Al
                            </Button>
                        </div>
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
                                <div className="sticky top-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
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

            {/* Universities Section */}
            <motion.section
                id="universities"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 bg-gray-900/30"
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {universities.map((university, index) => (
                                <motion.div
                                    key={university.id}
                                    variants={cardVariants}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/studyabroad/${country.slug}/${university.slug}`}>
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 hover:border-yellow-500/50">
                                            {/* University Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={university.coverImage || '/assets/bg.webp'}
                                                    alt={university.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                                {/* Logo and Featured Badge */}
                                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                                    {university.logo && (
                                                        <div className="w-12 h-12 rounded bg-white p-1">
                                                            <Image
                                                                src={university.logo}
                                                                alt={`${university.name} logo`}
                                                                width={48}
                                                                height={48}
                                                                className="object-contain w-full h-full"
                                                            />
                                                        </div>
                                                    )}
                                                    {university.isFeatured && (
                                                        <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                                                            <Star className="w-3 h-3 inline mr-1" />
                                                            Seçilmiş
                                                        </div>
                                                    )}
                                                </div>

                                                {/* University Name */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {university.name}
                                                    </h3>
                                                    {university.location && (
                                                        <div className="flex items-center text-gray-300 text-sm">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {university.location.city}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* University Details */}
                                            <div className="p-6">
                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                                    {university.shortDescription}
                                                </p>

                                                {/* University Stats */}
                                                <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                                                    {university.ranking && (
                                                        <div className="flex items-center text-gray-400">
                                                            <Award className="w-3 h-3 mr-1" />
                                                            {university.ranking}
                                                        </div>
                                                    )}
                                                    {university.established && (
                                                        <div className="flex items-center text-gray-400">
                                                            <Calendar className="w-3 h-3 mr-1" />
                                                            {university.established}
                                                        </div>
                                                    )}
                                                    {university.studentCount && (
                                                        <div className="flex items-center text-gray-400">
                                                            <Users className="w-3 h-3 mr-1" />
                                                            {university.studentCount}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Programs */}
                                                {university.programs && university.programs.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {university.programs.slice(0, 3).map((program, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="bg-gray-800 text-yellow-400 px-2 py-1 rounded text-xs"
                                                                >
                                                                    {getDegreeDisplayName(program.degree)}
                                                                </span>
                                                            ))}
                                                            {university.programs.length > 3 && (
                                                                <span className="text-xs text-gray-400">
                                                                    +{university.programs.length - 3} daha
                                                                </span>
                                                            )}
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



            {/* Contact CTA */}
            <motion.section
                className="py-24 bg-gradient-to-r from-gray-900 to-black relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        {country.nameAz}də təhsil <span className="text-yellow-500">imkanlarınızı</span> kəşf edin
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        Peşəkar konsultantlarımız sizə {country.nameAz}də təhsil prosesinin hər mərhələsində kömək edəcəklər
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20">
                            <Phone className="mr-2 h-5 w-5" />
                            İndi Zəng Et
                        </Button>
                        <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 shadow-lg">
                            <Mail className="mr-2 h-5 w-5" />
                            Məsləhət Al
                        </Button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}