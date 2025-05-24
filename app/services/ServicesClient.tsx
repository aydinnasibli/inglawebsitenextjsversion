"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Users, Star, } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem, ServiceItem } from "@/types/services";

interface ServicesPageProps {
    initialServicesData?: SanityServiceItem[];
}

interface Particle {
    id: string;
    left: number;
    top: number;
    delay: number;
    duration: number;
}

const transformSanityData = (sanityItems: SanityServiceItem[]): ServiceItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.title && item.shortDescription)
        .map((item) => ({
            id: item._id,
            title: item.title,
            slug: item.slug?.current || '',
            shortDescription: item.shortDescription,
            fullDescription: item.fullDescription,
            featuredImage: item.featuredImage ? urlFor(item.featuredImage).width(600).height(400).quality(85).url() : '/assets/bg.webp',
            gallery: item.gallery?.map(img => ({
                url: urlFor(img.asset).width(800).height(600).quality(85).url(),
                alt: img.alt,
                caption: img.caption,
            })),
            keyFeatures: item.keyFeatures,
            targetAudience: item.targetAudience,
            duration: item.duration,
            priceRange: item.priceRange,
            contactInfo: item.contactInfo,
            scheduleInfo: item.scheduleInfo,
            requirements: item.requirements,
            order: item.order,
            isFeatured: item.isFeatured,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
        }));
};

export default function ServicesPage({ initialServicesData }: ServicesPageProps) {
    const [services, setServices] = useState<ServiceItem[]>(() => {
        return initialServicesData ? transformSanityData(initialServicesData) : [];
    });
    const [isLoading, setIsLoading] = useState(!initialServicesData);
    const [isMounted, setIsMounted] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Generate particles on client side only
    useEffect(() => {
        setIsMounted(true);

        // Generate particles
        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: `particle-${i}`,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
        }));

        setParticles(newParticles);
    }, []);

    // Parallax effects - only initialize after mount
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [0, -150]),
        {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001
        }
    );

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [1, 0.2]),
        {
            stiffness: 100,
            damping: 30
        }
    );

    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.3], [1, 1.1]),
        {
            stiffness: 100,
            damping: 30
        }
    );


    // Load services data with proper error handling and cleanup
    useEffect(() => {
        let isCancelled = false;
        let timeoutId: NodeJS.Timeout;

        const loadServicesData = async () => {
            // Skip if we already have initial data
            if (initialServicesData && initialServicesData.length > 0) {
                setIsLoading(false);
                return;
            }

            try {
                const controller = new AbortController();
                timeoutId = setTimeout(() => controller.abort(), 10000);

                const data = await client.fetch<SanityServiceItem[]>(
                    SERVICES_QUERY,
                    {},
                    {
                        signal: controller.signal,
                        cache: 'force-cache'
                    }
                );

                clearTimeout(timeoutId);

                if (!isCancelled && data) {
                    setServices(data.length > 0 ? transformSanityData(data) : []);
                    setIsLoading(false);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Error fetching services data from Sanity:', error);
                    setIsLoading(false);
                }
            }
        };

        if (!initialServicesData) {
            loadServicesData();
        } else {
            setIsLoading(false);
        }

        return () => {
            isCancelled = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [initialServicesData]);

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.25, 0.25, 0.25, 0.75]
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.25, 0.25, 0.75]
            },
        },
    };

    // Prevent hydration mismatch by not rendering motion styles on server
    const motionStyles = isMounted ? { y: heroY, opacity } : {};
    const scaleStyles = isMounted ? { scale } : {};

    return (
        <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            {/* Enhanced Hero Section */}
            <motion.div
                ref={heroRef}
                style={motionStyles}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background with enhanced effects */}
                <motion.div
                    style={scaleStyles}
                    className="absolute inset-0 z-0"
                >
                    {/* Gradient overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-20" />

                    {/* Main background image */}
                    <Image
                        src="/assets/bg.webp"
                        alt="Tədris İstiqamətləri"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                        sizes="100vw"
                    />

                    {/* Animated particles effect - only render on client */}
                    {isMounted && particles.length > 0 && (
                        <div className="absolute inset-0 z-15">
                            {particles.map((particle) => (
                                <motion.div
                                    key={particle.id}
                                    className="absolute w-1 h-1 bg-yellow-500/30 rounded-full"
                                    style={{
                                        left: `${particle.left}%`,
                                        top: `${particle.top}%`,
                                    }}
                                    animate={{
                                        y: [-20, -100],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: particle.duration,
                                        repeat: Infinity,
                                        delay: particle.delay,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-30">
                    <motion.div
                        initial={isMounted ? { opacity: 0, y: 50 } : {}}
                        animate={isMounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.25, 0.25, 0.25, 0.75] }}
                        className="text-center max-w-5xl mx-auto"
                    >


                        {/* Main heading with gradient text */}
                        <motion.h1
                            initial={isMounted ? { opacity: 0, y: 30 } : {}}
                            animate={isMounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                        >
                            Tədris

                            <br />
                            <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                                İstiqamətləri
                            </span>
                        </motion.h1>

                        {/* Enhanced description */}
                        <motion.div
                            initial={isMounted ? { opacity: 0, y: 20 } : {}}
                            animate={isMounted ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mb-12"
                        >
                            <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto text-gray-200 leading-relaxed">
                                İngla School-da təqdim olunan bütün təhsil xidmətləri və proqramlarımızı kəşf edin
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-yellow-400">
                                <span className="flex items-center bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                                    <Star className="w-4 h-4 mr-2" />
                                    Premium Keyfiyyət
                                </span>
                                <span className="flex items-center bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                                    <Users className="w-4 h-4 mr-2" />
                                    Təcrübəli Müəllimlər
                                </span>
                                <span className="flex items-center bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Çevik Cədvəl
                                </span>
                            </div>
                        </motion.div>


                    </motion.div>
                </div>

                {/* Scroll indicator */}
                {isMounted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-yellow-500/50 rounded-full flex justify-center"
                        >
                            <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            {/* Enhanced Services Grid Section */}
            <motion.section
                id="services-section"
                initial={isMounted ? "hidden" : false}
                whileInView={isMounted ? "visible" : {}}
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-32 relative"
            >
                {/* Section background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section header */}
                    <motion.div
                        initial={isMounted ? { opacity: 0, y: 30 } : {}}
                        whileInView={isMounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Bizim Xidmətlərimiz
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Hər yaş qrupu və səviyyə üçün uyğunlaşdırılmış təhsil proqramları
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-center">
                                <motion.div
                                    animate={isMounted ? { rotate: 360 } : {}}
                                    transition={isMounted ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                                    className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full mx-auto mb-6"
                                />
                                <p className="text-gray-300 text-lg">Xidmətlər yüklənir...</p>
                            </div>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-gray-400 text-xl mb-4">
                                Heç bir xidmət tapılmadı.
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    variants={cardVariants}
                                    initial={isMounted ? "hidden" : false}
                                    whileInView={isMounted ? "visible" : {}}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={isMounted ? {
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    } : {}}
                                    className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 group ${service.isFeatured
                                        ? 'border-yellow-500/50 shadow-yellow-500/20'
                                        : 'border-gray-700/50'
                                        }`}
                                >
                                    {/* Featured badge */}
                                    {service.isFeatured && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <motion.div
                                                initial={isMounted ? { scale: 0 } : {}}
                                                animate={isMounted ? { scale: 1 } : {}}
                                                transition={{ delay: 0.2 * index + 0.5, type: "spring" }}
                                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg"
                                            >
                                                <Star className="w-4 h-4 mr-1" />
                                                Populyar
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Service Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={service.featuredImage}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-8">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-500 transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {service.shortDescription}
                                        </p>

                                        {/* Service Info */}
                                        <div className="space-y-3 mb-8">
                                            {service.duration && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                                                        <Clock className="w-4 h-4 text-yellow-500" />
                                                    </div>
                                                    <span>Müddət: {service.duration}</span>
                                                </div>
                                            )}
                                            {service.targetAudience && service.targetAudience.length > 0 && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                                                        <Users className="w-4 h-4 text-yellow-500" />
                                                    </div>
                                                    <span>Hədəf qrup: {service.targetAudience[0]}</span>
                                                </div>
                                            )}
                                            {service.priceRange && (
                                                <div className="text-lg font-bold text-yellow-500">
                                                    Qiymət: {service.priceRange}
                                                </div>
                                            )}
                                        </div>

                                        {/* Key Features */}
                                        {service.keyFeatures && service.keyFeatures.length > 0 && (
                                            <div className="mb-8">
                                                <div className="space-y-3">
                                                    {service.keyFeatures.slice(0, 3).map((feature, i) => (
                                                        <motion.div
                                                            key={`${service.id}-feature-${i}`}
                                                            initial={isMounted ? { opacity: 0, x: -20 } : {}}
                                                            whileInView={isMounted ? { opacity: 1, x: 0 } : {}}
                                                            transition={{ delay: 0.1 * i }}
                                                            viewport={{ once: true }}
                                                            className="flex items-start text-sm"
                                                        >
                                                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mr-3 mt-2 flex-shrink-0 shadow-sm" />
                                                            <span className="text-gray-300 leading-relaxed">{feature.feature}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <Link href={`/services/${service.slug}`} className="block">
                                            <Button className="w-full border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 rounded-xl py-3 font-semibold group/btn">
                                                <span>Ətraflı Məlumat</span>
                                                <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>
        </div>
    );
}