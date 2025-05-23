"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
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
    Building2,
    Bookmark,
    CheckCircle,
    Target,
    BookOpen
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react';
import {
    SanityCountry,
    SanityUniversity,
    Country,
    University,
} from "@/types/study-abroad";

interface UniversityClientProps {
    initialUniversityData: SanityUniversity;
    initialCountryData: SanityCountry;
}

export default function UniversityClient({
    initialUniversityData,
    initialCountryData,
}: UniversityClientProps) {
    // State management
    const [university, setUniversity] = useState<University | null>(null);
    const [country, setCountry] = useState<Country | null>(null);

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

    const transformUniversityData = (sanityUniversity: SanityUniversity): University => {
        return {
            id: sanityUniversity._id,
            name: sanityUniversity.name,
            slug: sanityUniversity.slug.current,
            country: {
                id: sanityUniversity.country._id,
                name: sanityUniversity.country.name,
                nameAz: sanityUniversity.country.nameAz,
                slug: sanityUniversity.country.slug.current,
            },
            shortDescription: sanityUniversity.shortDescription,
            fullDescription: sanityUniversity.fullDescription,
            logo: sanityUniversity.logo ? urlFor(sanityUniversity.logo).width(120).height(120).quality(90).url() : '',
            coverImage: sanityUniversity.coverImage ? urlFor(sanityUniversity.coverImage).width(1200).height(600).quality(85).url() : '',
            gallery: sanityUniversity.gallery?.map(img => urlFor(img).width(800).height(600).quality(85).url()),
            ranking: sanityUniversity.ranking,
            established: sanityUniversity.established,
            studentCount: sanityUniversity.studentCount,
            location: sanityUniversity.location,
            programs: sanityUniversity.programs,
            facilities: sanityUniversity.facilities,
            admissionInfo: sanityUniversity.admissionInfo,
            scholarships: sanityUniversity.scholarships,
            contactInfo: sanityUniversity.contactInfo,
            isFeatured: sanityUniversity.isFeatured,
        };
    };

    // Load data
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                if (initialUniversityData && isMounted) {
                    setUniversity(transformUniversityData(initialUniversityData));
                }
                if (initialCountryData && isMounted) {
                    setCountry(transformCountryData(initialCountryData));
                }
            } catch (error) {
                console.error('Error loading university data:', error);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [initialUniversityData, initialCountryData]);

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

    if (!university || !country) {
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
                        src={university.coverImage || '/assets/bg.webp'}
                        alt={university.name}
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                {/* Back Button */}
                <div className="absolute top-8 left-8 z-30">
                    <Link href={`/studyabroad/${country.slug}`}>
                        <Button variant="outline" className="border-white/50 text-white hover:bg-white hover:text-black">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {country.nameAz}ya qayıt
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
                        {/* University Logo and Name */}
                        <div className="flex items-center justify-center gap-6 mb-6">
                            {university.logo && (
                                <div className="w-24 h-24 rounded-lg bg-white p-2 shadow-lg">
                                    <Image
                                        src={university.logo}
                                        alt={`${university.name} logo`}
                                        width={96}
                                        height={96}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            )}
                            <div className="text-left">
                                <h1 className="text-5xl font-bold text-white mb-2">
                                    {university.name}
                                </h1>
                                <div className="flex items-center text-xl text-gray-200">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {university.location?.city}, {country.nameAz}
                                </div>
                            </div>
                        </div>

                        {/* University Badges */}
                        <div className="flex justify-center gap-4 mb-8">
                            {university.isFeatured && (
                                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold flex items-center">
                                    <Star className="w-4 h-4 mr-2" />
                                    Seçilmiş Universitet
                                </div>
                            )}
                            {university.ranking && (
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold flex items-center">
                                    <Award className="w-4 h-4 mr-2" />
                                    {university.ranking}
                                </div>
                            )}
                            {university.established && (
                                <div className="bg-gray-700 text-white px-4 py-2 rounded-full font-bold flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {university.established}
                                </div>
                            )}
                        </div>

                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            {university.shortDescription}
                        </p>


                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
            </motion.div>

            {/* University Information Section */}
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
                            {university.fullDescription && (
                                <div className="prose prose-invert prose-lg max-w-none mb-12">
                                    <PortableText value={university.fullDescription} />
                                </div>
                            )}

                            {/* Facilities */}
                            {university.facilities && university.facilities.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6 text-yellow-500">Kampus İmkanları</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {university.facilities.map((facility, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-500/50 transition-all duration-300"
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-white">{facility}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Programs */}
                            {university.programs && university.programs.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6 text-yellow-500">Təhsil Proqramları</h3>
                                    <div className="space-y-6">
                                        {university.programs.map((program, index) => (
                                            <div
                                                key={index}
                                                className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-500/50 transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-xl font-semibold text-white">
                                                        {program.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                                            {getDegreeDisplayName(program.degree)}
                                                        </span>
                                                        {program.duration && (
                                                            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                                                                {program.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {program.tuitionFee && (
                                                    <div className="flex items-center mb-3">
                                                        <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-300">Təhsil haqqı: {program.tuitionFee}</span>
                                                    </div>
                                                )}

                                                {program.requirements && program.requirements.length > 0 && (
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-gray-400 mb-2">Qəbul tələbləri:</h5>
                                                        <ul className="space-y-1">
                                                            {program.requirements.map((req, reqIndex) => (
                                                                <li key={reqIndex} className="text-sm text-gray-300 flex items-start">
                                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                                    {req}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Scholarships */}
                            {university.scholarships && university.scholarships.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6 text-yellow-500">Təqaüd İmkanları</h3>
                                    <div className="space-y-4">
                                        {university.scholarships.map((scholarship, index) => (
                                            <div
                                                key={index}
                                                className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-500/50 transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-lg font-semibold text-white">
                                                        {scholarship.name}
                                                    </h4>
                                                    {scholarship.amount && (
                                                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                            {scholarship.amount}
                                                        </span>
                                                    )}
                                                </div>
                                                {scholarship.criteria && (
                                                    <p className="text-gray-300 text-sm">
                                                        {scholarship.criteria}
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
                            {/* Quick Info Card */}
                            <div className="sticky top-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4 text-yellow-500">Universitet Məlumatları</h3>
                                <div className="space-y-4">
                                    {university.ranking && (
                                        <div className="flex items-center">
                                            <Award className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm text-gray-400">Dünya Reytinqi</div>
                                                <div className="text-white">{university.ranking}</div>
                                            </div>
                                        </div>
                                    )}
                                    {university.established && (
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm text-gray-400">Qurulma ili</div>
                                                <div className="text-white">{university.established}</div>
                                            </div>
                                        </div>
                                    )}
                                    {university.studentCount && (
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm text-gray-400">Tələbə sayı</div>
                                                <div className="text-white">{university.studentCount}</div>
                                            </div>
                                        </div>
                                    )}
                                    {university.location && (
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm text-gray-400">Ünvan</div>
                                                <div className="text-white">{university.location.city}</div>
                                                {university.location.address && (
                                                    <div className="text-sm text-gray-400">{university.location.address}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Info */}
                                {university.contactInfo && (
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <h4 className="text-lg font-semibold mb-3 text-white">Əlaqə</h4>
                                        <div className="space-y-3">
                                            {university.contactInfo.website && (
                                                <a
                                                    href={university.contactInfo.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Rəsmi sayt
                                                </a>
                                            )}
                                            {university.contactInfo.admissionsEmail && (
                                                <a
                                                    href={`mailto:${university.contactInfo.admissionsEmail}`}
                                                    className="flex items-center text-gray-300 hover:text-white transition-colors text-sm"
                                                >
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {university.contactInfo.admissionsEmail}
                                                </a>
                                            )}
                                            {university.contactInfo.phone && (
                                                <a
                                                    href={`tel:${university.contactInfo.phone}`}
                                                    className="flex items-center text-gray-300 hover:text-white transition-colors text-sm"
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {university.contactInfo.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Admission Info Card */}
                            {university.admissionInfo && (
                                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-4 text-yellow-500">Qəbul Məlumatları</h3>
                                    <div className="space-y-4">
                                        {university.admissionInfo.applicationDeadline && (
                                            <div className="flex items-center">
                                                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Müraciət tarixi</div>
                                                    <div className="text-white">{university.admissionInfo.applicationDeadline}</div>
                                                </div>
                                            </div>
                                        )}
                                        {university.admissionInfo.applicationFee && (
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Müraciət haqqı</div>
                                                    <div className="text-white">{university.admissionInfo.applicationFee}</div>
                                                </div>
                                            </div>
                                        )}

                                        {university.admissionInfo.requirements && university.admissionInfo.requirements.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-semibold text-gray-400 mb-2">Ümumi tələblər:</h4>
                                                <ul className="space-y-1">
                                                    {university.admissionInfo.requirements.map((req, index) => (
                                                        <li key={index} className="text-sm text-gray-300 flex items-start">
                                                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {university.admissionInfo.documents && university.admissionInfo.documents.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-semibold text-gray-400 mb-2">Tələb olunan sənədlər:</h4>
                                                <ul className="space-y-1">
                                                    {university.admissionInfo.documents.map((doc, index) => (
                                                        <li key={index} className="text-sm text-gray-300 flex items-start">
                                                            <FileText className="w-3 h-3 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                                                            {doc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
                        {university.name}ə <span className="text-yellow-500">müraciət etməyə</span> hazırsınız?
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        Peşəkar konsultantlarımız sizə müraciət prosesinin hər mərhələsində kömək edəcəklər
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
                        {university.contactInfo?.website && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-black"
                                asChild
                            >
                                <a href={university.contactInfo.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-5 w-5" />
                                    Rəsmi Sayt
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}