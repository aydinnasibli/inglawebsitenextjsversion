"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    Clock,
    Tag,
    Users,
    Phone,
    Mail,
    MessageCircle,
    CheckCircle,
    ArrowLeft,
    Calendar,
    DollarSign,
    Target,
    BookOpen
} from "lucide-react";
import { PortableText } from '@portabletext/react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem, ServiceItem, getCategoryLabel } from "@/types/services";

interface ServiceDetailPageProps {
    slug: string;
    initialServiceData?: SanityServiceItem;
}

const transformSanityData = (sanityItem: SanityServiceItem): ServiceItem => {
    return {
        id: sanityItem._id,
        title: sanityItem.title,
        slug: sanityItem.slug?.current || '',
        shortDescription: sanityItem.shortDescription,
        fullDescription: sanityItem.fullDescription,
        featuredImage: sanityItem.featuredImage ? urlFor(sanityItem.featuredImage).width(1200).height(600).quality(85).url() : '/assets/bg.webp',
        gallery: sanityItem.gallery?.map(img => ({
            url: urlFor(img.asset).width(800).height(600).quality(85).url(),
            alt: img.alt,
            caption: img.caption,
        })),
        keyFeatures: sanityItem.keyFeatures,
        targetAudience: sanityItem.targetAudience,
        duration: sanityItem.duration,
        priceRange: sanityItem.priceRange,
        contactInfo: sanityItem.contactInfo,
        scheduleInfo: sanityItem.scheduleInfo,
        requirements: sanityItem.requirements,
        category: sanityItem.category,
        order: sanityItem.order,
        isFeatured: sanityItem.isFeatured,
        seoTitle: sanityItem.seoTitle,
        seoDescription: sanityItem.seoDescription,
    };
};

// Portable Text components for rich text rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={urlFor(value).width(800).height(400).quality(85).url()}
                    alt={value.alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
                {value.caption && (
                    <p className="text-sm text-gray-400 text-center mt-2">{value.caption}</p>
                )}
            </div>
        ),
    },
    block: {
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold mt-12 mb-6 text-yellow-500">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-white">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic text-yellow-300">{children}</em>
        ),
    },
};

export default function ServiceDetailPage({ slug, initialServiceData }: ServiceDetailPageProps) {
    const [service, setService] = useState<ServiceItem | null>(null);
    const [isLoading, setIsLoading] = useState(!initialServiceData);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

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

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const data = await client.fetch<SanityServiceItem>(
                    SERVICE_BY_SLUG_QUERY,
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
                console.error('Error fetching service data from Sanity:', error);
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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-gray-300">Xidmət məlumatları yüklənir...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Xidmət Tapılmadı</h1>
                    <p className="text-gray-300 mb-8">Axtardığınız xidmət mövcud deyil və ya silinmişdir.</p>
                    <Link href="/tedris-istiqametleri">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Xidmətlərə qayıt
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative min-h-screen text-white">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity }}
                className="relative h-96 flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <Image
                        src={service.featuredImage}
                        alt={service.title}
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
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center mb-6">
                            <Link
                                href="/tedris-istiqametleri"
                                className="text-gray-300 hover:text-yellow-500 transition-colors flex items-center"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Tədris İstiqamətləri
                            </Link>
                            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
                            <span className="text-yellow-500">{service.title}</span>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center justify-center mb-4">
                            <Tag className="w-4 h-4 text-yellow-500 mr-2" />
                            <span className="text-yellow-500 text-sm font-medium bg-yellow-500/10 px-3 py-1 rounded-full">
                                {getCategoryLabel(service.category)}
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold mb-6 text-white">
                            {service.title}
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            {service.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Service Info Cards */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-16 -mt-16 relative z-10"
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {service.duration && (
                            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 text-center backdrop-blur-sm">
                                <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-white mb-2">Müddət</h3>
                                <p className="text-gray-300">{service.duration}</p>
                            </div>
                        )}
                        {service.priceRange && (
                            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 text-center backdrop-blur-sm">
                                <DollarSign className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-white mb-2">Qiymət</h3>
                                <p className="text-gray-300">{service.priceRange}</p>
                            </div>
                        )}
                        {service.targetAudience && service.targetAudience.length > 0 && (
                            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 text-center backdrop-blur-sm">
                                <Users className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-white mb-2">Hədəf Qrup</h3>
                                <p className="text-gray-300">{service.targetAudience[0]}</p>
                            </div>
                        )}
                        {service.scheduleInfo && (
                            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 text-center backdrop-blur-sm">
                                <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-white mb-2">Cədvəl</h3>
                                <p className="text-gray-300 text-sm">{service.scheduleInfo}</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Main Content */}
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
                            {/* Full Description */}
                            {service.fullDescription && (
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-yellow-500">
                                        <BookOpen className="w-8 h-8 inline-block mr-3" />
                                        Ətraflı Məlumat
                                    </h2>
                                    <div className="prose prose-invert max-w-none">
                                        <PortableText
                                            value={service.fullDescription}
                                            components={portableTextComponents}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Key Features */}
                            {service.keyFeatures && service.keyFeatures.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-yellow-500">
                                        <Target className="w-8 h-8 inline-block mr-3" />
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
                                                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                                            >
                                                <div className="flex items-start">
                                                    <CheckCircle className="w-6 h-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <h3 className="font-semibold text-white mb-2">{feature.feature}</h3>
                                                        {feature.description && (
                                                            <p className="text-gray-300 text-sm">{feature.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Requirements */}
                            {service.requirements && service.requirements.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-yellow-500">Tələblər</h2>
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                                        <ul className="space-y-3">
                                            {service.requirements.map((requirement, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3 mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-300">{requirement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {service.gallery && service.gallery.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 text-yellow-500">Qalereya</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.gallery.map((image, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 * index }}
                                                viewport={{ once: true }}
                                                className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-yellow-900/20 transition-all duration-300"
                                                onClick={() => setActiveGalleryIndex(index)}
                                            >
                                                <Image
                                                    src={image.url}
                                                    alt={image.alt || service.title}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                {/* Contact Card */}
                                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold mb-6 text-yellow-500">Əlaqə</h3>

                                    {service.contactInfo ? (
                                        <div className="space-y-4 mb-6">
                                            {service.contactInfo.phone && (
                                                <div className="flex items-center">
                                                    <Phone className="w-5 h-5 text-yellow-500 mr-3" />
                                                    <a
                                                        href={`tel:${service.contactInfo.phone}`}
                                                        className="text-gray-300 hover:text-yellow-500 transition-colors"
                                                    >
                                                        {service.contactInfo.phone}
                                                    </a>
                                                </div>
                                            )}
                                            {service.contactInfo.email && (
                                                <div className="flex items-center">
                                                    <Mail className="w-5 h-5 text-yellow-500 mr-3" />
                                                    <a
                                                        href={`mailto:${service.contactInfo.email}`}
                                                        className="text-gray-300 hover:text-yellow-500 transition-colors"
                                                    >
                                                        {service.contactInfo.email}
                                                    </a>
                                                </div>
                                            )}
                                            {service.contactInfo.whatsapp && (
                                                <div className="flex items-center">
                                                    <MessageCircle className="w-5 h-5 text-yellow-500 mr-3" />
                                                    <a
                                                        href={`https://wa.me/${service.contactInfo.whatsapp}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-300 hover:text-yellow-500 transition-colors"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-gray-300 mb-6">
                                            Bu xidmət haqqında daha ətraflı məlumat almaq üçün bizimlə əlaqə saxlayın.
                                        </p>
                                    )}

                                    <div className="space-y-3">
                                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                                            Qeydiyyat
                                        </Button>
                                        <Button className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800">
                                            Məsləhət Al
                                        </Button>
                                    </div>
                                </div>

                                {/* Target Audience */}
                                {service.targetAudience && service.targetAudience.length > 1 && (
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                                        <h3 className="text-xl font-bold mb-4 text-yellow-500">Hədəf Qrup</h3>
                                        <ul className="space-y-2">
                                            {service.targetAudience.map((audience, index) => (
                                                <li key={index} className="flex items-center">
                                                    <Users className="w-4 h-4 text-yellow-500 mr-3" />
                                                    <span className="text-gray-300">{audience}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Related Services CTA */}
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
                        Digər <span className="text-yellow-500">xidmətlərimizi</span> kəşf edin
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        İngla School-da təqdim olunan bütün təhsil proqramlarına nəzər salın
                    </p>
                    <Link href="/tedris-istiqametleri">
                        <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Bütün Xidmətlər
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}