"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Clock,
    Users,
    Star,
    Phone,
    Mail,
    MessageCircle,
    Calendar,
    CheckCircle,
    Play,
    Award,
    Target
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRESCHOOL_SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem, PreschoolServiceItem } from "@/types/preschool";
import RegistrationModal from "@/components/RegistrationModal";

interface PreschoolServicePageProps {
    initialServiceData?: SanityPreschoolServiceItem;
}

const transformSanityData = (sanityItem: SanityPreschoolServiceItem): PreschoolServiceItem => {
    return {
        id: sanityItem._id,
        title: sanityItem.title,
        slug: sanityItem.slug?.current || '',
        shortDescription: sanityItem.shortDescription,
        fullDescription: sanityItem.fullDescription,
        featuredImage: sanityItem.featuredImage
            ? urlFor(sanityItem.featuredImage).width(1200).height(600).quality(90).url()
            : '/assets/bg.webp',
        gallery: sanityItem.gallery?.map(img => ({
            url: urlFor(img.asset).width(800).height(600).quality(85).url(),
            alt: img.alt,
            caption: img.caption,
        })),
        keyFeatures: sanityItem.keyFeatures,
        targetAgeGroup: sanityItem.targetAgeGroup,
        duration: sanityItem.duration,
        priceRange: sanityItem.priceRange,
        contactInfo: sanityItem.contactInfo,
        scheduleInfo: sanityItem.scheduleInfo,
        requirements: sanityItem.requirements,
        activities: sanityItem.activities,
        learningOutcomes: sanityItem.learningOutcomes,
        order: sanityItem.order,
        isFeatured: sanityItem.isFeatured,
        seoTitle: sanityItem.seoTitle,
        seoDescription: sanityItem.seoDescription,
    };
};

export default function PreschoolServicePage({ initialServiceData }: PreschoolServicePageProps) {
    const params = useParams();
    const slug = params?.slug as string;

    const [service, setService] = useState<PreschoolServiceItem | null>(null);
    const [isLoading, setIsLoading] = useState(!initialServiceData);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    if (activeGalleryIndex >= (service?.gallery?.length || 0)) {
        console.log('gallery active index reset');
        // Parallax effects
        const { scrollYProgress } = useScroll({
            target: containerRef,
            offset: ["start start", "end end"],
        });

        const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
        const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

        // Load service data
        useEffect(() => {
            let isMounted = true;

            const loadServiceData = async () => {
                try {
                    if (initialServiceData) {
                        if (isMounted) {
                            setService(transformSanityData(initialServiceData));
                            setIsLoading(false);
                        }
                        return;
                    }

                    if (!slug) return;

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);

                    const data = await client.fetch<SanityPreschoolServiceItem>(
                        PRESCHOOL_SERVICE_BY_SLUG_QUERY,
                        { slug },
                        {
                            signal: controller.signal,
                            cache: 'force-cache'
                        }
                    );

                    clearTimeout(timeoutId);

                    if (isMounted) {
                        if (data) {
                            setService(transformSanityData(data));
                        }
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error fetching preschool service data from Sanity:', error);
                    if (isMounted) {
                        setIsLoading(false);
                    }
                }
            };

            loadServiceData();

            return () => {
                isMounted = false;
            };
        }, [slug, initialServiceData]);

        const sectionVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                },
            },
        };

        if (isLoading) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-300">Xidmət məlumatları yüklənir...</p>
                    </div>
                </div>
            );
        }

        if (!service) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Xidmət tapılmadı</h1>
                        <p className="text-gray-300 mb-8">Axtardığınız xidmət mövcud deyil.</p>
                        <Link href="/preschool">
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Geri qayıt
                            </Button>
                        </Link>
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
                    className="relative h-[70vh] flex items-end overflow-hidden"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <Image
                            src={service.featuredImage}
                            alt={service.title}
                            fill
                            priority
                            quality={100}
                            className="object-cover"
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-20 pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Back Button */}
                            <Link href="/preschool" className="inline-flex items-center text-gray-300 hover:text-yellow-500 transition-colors mb-6">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Məktəbəqədər Xidmətlər
                            </Link>

                            {/* Service Badge */}
                            {service.isFeatured && (
                                <div className="inline-flex items-center bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <Star className="w-4 h-4 mr-2" />
                                    Populyar Xidmət
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-5xl font-bold mb-6 text-white">
                                {service.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xl mb-8 max-w-3xl text-gray-200 leading-relaxed">
                                {service.shortDescription}
                            </p>

                            {/* Service Quick Info */}
                            <div className="flex flex-wrap gap-6">
                                {service.duration && (
                                    <div className="flex items-center bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                                        <span className="text-sm font-medium">{service.duration}</span>
                                    </div>
                                )}
                                {service.targetAgeGroup && (
                                    <div className="flex items-center bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Users className="w-5 h-5 mr-2 text-yellow-500" />
                                        <span className="text-sm font-medium">{service.targetAgeGroup}</span>
                                    </div>
                                )}
                                {service.priceRange && (
                                    <div className="flex items-center bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-500/30">
                                        <span className="text-sm font-bold text-yellow-500">{service.priceRange}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="relative mt-3 z-30">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content Column */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Full Description */}
                                {service.fullDescription && (
                                    <motion.section
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8"
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-yellow-500">Xidmət Haqqında</h2>
                                        <div className="prose prose-lg prose-invert max-w-none">
                                            <p className="text-gray-300 leading-relaxed">{service.fullDescription}</p>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Key Features */}
                                {service.keyFeatures && service.keyFeatures.length > 0 && (
                                    <motion.section
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8"
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-yellow-500 flex items-center">
                                            <CheckCircle className="mr-3 h-8 w-8" />
                                            Əsas Xüsusiyyətlər
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {service.keyFeatures.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    viewport={{ once: true }}
                                                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                                                >
                                                    <div className="flex items-start">
                                                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-4 mt-2 flex-shrink-0"></div>
                                                        <div>
                                                            <h3 className="font-semibold text-white mb-2">{feature.feature}</h3>
                                                            {feature.description && (
                                                                <p className="text-gray-400 text-sm">{feature.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* Activities */}
                                {service.activities && service.activities.length > 0 && (
                                    <motion.section
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8"
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-yellow-500 flex items-center">
                                            <Play className="mr-3 h-8 w-8" />
                                            Fəaliyyətlər
                                        </h2>
                                        <div className="space-y-4">
                                            {service.activities.map((activity, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    viewport={{ once: true }}
                                                    className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-yellow-500"
                                                >
                                                    <h3 className="font-semibold text-white mb-2">{activity.activity}</h3>
                                                    {activity.description && (
                                                        <p className="text-gray-400">{activity.description}</p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* Learning Outcomes */}
                                {service.learningOutcomes && service.learningOutcomes.length > 0 && (
                                    <motion.section
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-lg p-8"
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-yellow-500 flex items-center">
                                            <Target className="mr-3 h-8 w-8" />
                                            Öyrənmə Nəticələri
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.learningOutcomes.map((outcome, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    viewport={{ once: true }}
                                                    className="flex items-start"
                                                >
                                                    <Award className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300">{outcome}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* Gallery */}
                                {service.gallery && service.gallery.length > 0 && (
                                    <motion.section
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 mb-6 rounded-lg p-8"
                                    >
                                        <h2 className="text-3xl font-bold mb-6 text-yellow-500">Qalereya</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {service.gallery.map((image, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    viewport={{ once: true }}
                                                    className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                                                    onClick={() => setActiveGalleryIndex(index)}
                                                >
                                                    <Image
                                                        src={image.url}
                                                        alt={image.alt || service.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                {/* Contact Card */}
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={sectionVariants}
                                    className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6  top-8"
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-yellow-500">Əlaqə</h3>

                                    {service.contactInfo && (
                                        <div className="space-y-4 mb-6">
                                            {service.contactInfo.phone && (
                                                <a href={`tel:${service.contactInfo.phone}`} className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors">
                                                    <Phone className="w-5 h-5 mr-3" />
                                                    {service.contactInfo.phone}
                                                </a>
                                            )}
                                            {service.contactInfo.email && (
                                                <a href={`mailto:${service.contactInfo.email}`} className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors">
                                                    <Mail className="w-5 h-5 mr-3" />
                                                    {service.contactInfo.email}
                                                </a>
                                            )}
                                            {service.contactInfo.whatsapp && (
                                                <a href={`https://wa.me/${service.contactInfo.whatsapp}`} className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors">
                                                    <MessageCircle className="w-5 h-5 mr-3" />
                                                    WhatsApp
                                                </a>
                                            )}
                                        </div>
                                    )}

                                    {service.scheduleInfo && (
                                        <div className="mb-6">
                                            <div className="flex items-center text-gray-300 mb-2">
                                                <Calendar className="w-5 h-5 mr-3" />
                                                <span className="font-semibold">Cədvəl</span>
                                            </div>
                                            <p className="text-gray-400 ml-8">{service.scheduleInfo}</p>
                                        </div>
                                    )}


                                    <div className="space-y-3">
                                        <Button
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                                            onClick={() => setIsRegistrationModalOpen(true)}
                                        >
                                            Müraciət Et
                                        </Button>

                                    </div>
                                </motion.div>

                                {/* Requirements */}
                                {service.requirements && service.requirements.length > 0 && (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={sectionVariants}
                                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
                                    >
                                        <h3 className="text-xl font-bold mb-4 text-yellow-500">Tələblər</h3>
                                        <ul className="space-y-2">
                                            {service.requirements.map((requirement, index) => (
                                                <li key={index} className="flex items-start text-gray-300">
                                                    <CheckCircle className="w-4 h-4 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                                                    <span className="text-sm">{requirement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Modal */}
                <RegistrationModal
                    isOpen={isRegistrationModalOpen}
                    onClose={() => setIsRegistrationModalOpen(false)}
                    serviceTitle={service.title}
                />
            </div>
        );
    }