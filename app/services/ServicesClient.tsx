"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Tag, Users, Star, Filter } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem, ServiceItem, SERVICE_CATEGORIES, getCategoryLabel } from "@/types/services";

interface ServicesPageProps {
    initialServicesData?: SanityServiceItem[];
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
            category: item.category,
            order: item.order,
            isFeatured: item.isFeatured,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
        }));
};

export default function ServicesPage({ initialServicesData }: ServicesPageProps) {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(!initialServicesData);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    // Load services data
    useEffect(() => {
        let isMounted = true;

        const loadServicesData = async () => {
            try {
                if (initialServicesData && initialServicesData.length > 0) {
                    if (isMounted) {
                        setServices(transformSanityData(initialServicesData));
                        setIsLoading(false);
                    }
                    return;
                }

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const data = await client.fetch<SanityServiceItem[]>(
                    SERVICES_QUERY,
                    {},
                    {
                        signal: controller.signal,
                        cache: 'force-cache'
                    }
                );

                clearTimeout(timeoutId);

                if (isMounted) {
                    if (data && data.length > 0) {
                        setServices(transformSanityData(data));
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching services data from Sanity:', error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadServicesData();

        return () => {
            isMounted = false;
        };
    }, [initialServicesData]);

    // Filter services by category
    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    // Get unique categories from services
    const availableCategories = ['all', ...Array.from(new Set(services.map(service => service.category)))];

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

    return (
        <div ref={containerRef} className="relative min-h-screen text-white">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity }}
                className="relative h-96 flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Tədris İstiqamətləri"
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
                        <h1 className="text-5xl font-bold mb-6 text-white">
                            <span className="text-yellow-500">Tədris İstiqamətləri</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            İngla School-da təqdim olunan bütün təhsil xidmətləri və proqramlarımızı kəşf edin
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Filter Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-12 bg-gray-900/30"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="flex items-center mb-4">
                            <Filter className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="text-gray-300 font-medium">Kateqoriya seçin:</span>
                        </div>
                        {availableCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-900/30'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                    }`}
                            >
                                {category === 'all' ? 'Hamısı' : getCategoryLabel(category)}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Services Grid Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Xidmətlər yüklənir...</p>
                            </div>
                        </div>
                    ) : filteredServices.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 text-lg mb-4">
                                Bu kateqoriyada heç bir xidmət tapılmadı.
                            </div>
                            <Button
                                onClick={() => setActiveCategory('all')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                            >
                                Bütün xidmətləri göstər
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className={`bg-gray-900/50 border rounded-lg overflow-hidden hover:shadow-xl hover:shadow-yellow-900/10 transition-all duration-300 group ${service.isFeatured
                                            ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-transparent'
                                            : 'border-gray-800'
                                        }`}
                                >
                                    {/* Service Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {service.isFeatured && (
                                            <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                                <Star className="w-4 h-4 mr-1" />
                                                Populyar
                                            </div>
                                        )}
                                        <Image
                                            src={service.featuredImage}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-6">
                                        {/* Category Badge */}
                                        <div className="flex items-center mb-3">
                                            <Tag className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-yellow-500 text-sm font-medium">
                                                {getCategoryLabel(service.category)}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                            {service.shortDescription}
                                        </p>

                                        {/* Service Info */}
                                        <div className="space-y-2 mb-6">
                                            {service.duration && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    <span>Müddət: {service.duration}</span>
                                                </div>
                                            )}
                                            {service.targetAudience && service.targetAudience.length > 0 && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <Users className="w-4 h-4 mr-2" />
                                                    <span>Hədəf qrup: {service.targetAudience[0]}</span>
                                                </div>
                                            )}
                                            {service.priceRange && (
                                                <div className="text-sm font-semibold text-yellow-500">
                                                    Qiymət: {service.priceRange}
                                                </div>
                                            )}
                                        </div>

                                        {/* Key Features */}
                                        {service.keyFeatures && service.keyFeatures.length > 0 && (
                                            <div className="mb-6">
                                                <div className="space-y-2">
                                                    {service.keyFeatures.slice(0, 3).map((feature, i) => (
                                                        <div key={i} className="flex items-start text-sm">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-3 mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-300">{feature.feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <Link href={`/tedris-istiqametleri/${service.slug}`}>
                                            <Button className="w-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                                                <span>Ətraflı</span>
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Contact CTA */}
            <motion.div
                className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Sizə uyğun <span className="text-yellow-500">proqramı seçin</span>
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        Hər hansı bir xidmət haqqında ətraflı məlumat almaq və ya müraciət etmək üçün bizimlə əlaqə saxlayın
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 shadow-lg">
                            Bizə Zəng Edin
                        </Button>
                        <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20">
                            Məsləhət Alın
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}