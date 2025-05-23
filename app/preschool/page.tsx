"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Users, Star, BookOpen, Heart, Smile, Zap } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRESCHOOL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem, PreschoolServiceItem } from "@/types/preschool";

interface PreschoolServicesPageProps {
    initialServicesData?: SanityPreschoolServiceItem[];
}

const transformSanityData = (sanityItems: SanityPreschoolServiceItem[]): PreschoolServiceItem[] => {
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
            targetAgeGroup: item.targetAgeGroup,
            duration: item.duration,
            priceRange: item.priceRange,
            contactInfo: item.contactInfo,
            scheduleInfo: item.scheduleInfo,
            requirements: item.requirements,
            activities: item.activities,
            learningOutcomes: item.learningOutcomes,
            order: item.order,
            isFeatured: item.isFeatured,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
        }));
};

const preparationMethods = [
    {
        icon: BookOpen,
        title: "Akademik Hazırlıq",
        description: "Məktəbəqədər yaş uşaqları üçün əlifba, hesab və oxu öyrətmə metodları",
        features: ["Hərflərin öyrədilməsi", "Rəqəmlərlə tanışlıq", "Sadə oxu vərdişləri"]
    },
    {
        icon: Heart,
        title: "Sosial Hazırlıq",
        description: "Uşaqların sosial bacarıqlarını inkişaf etdirmək və kollektiv həyata hazırlamaq",
        features: ["Ünsiyyət qurma", "Paylaşma vərdiş", "Dostluq münasibətləri"]
    },
    {
        icon: Smile,
        title: "Emosional Hazırlıq",
        description: "Uşaqların emosional sabitliyini təmin etmək və özünəinam formalaşdırmaq",
        features: ["Özünəinam artırma", "Stress idarə etmə", "Müstəqillik inkişafı"]
    },
    {
        icon: Zap,
        title: "Fiziki Hazırlıq",
        description: "Motor vərdişlərin inkişafı və sağlam həyat tərzinin formalaşması",
        features: ["İnce motor vərdişlər", "Koordinasiya inkişafı", "Sağlam vərdişlər"]
    }
];

export default function PreschoolServicesPage({ initialServicesData }: PreschoolServicesPageProps) {
    const [services, setServices] = useState<PreschoolServiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(!initialServicesData);
    const [activeTab, setActiveTab] = useState<'services' | 'methods'>('services');

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

                const data = await client.fetch<SanityPreschoolServiceItem[]>(
                    PRESCHOOL_SERVICES_QUERY,
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
                console.error('Error fetching preschool services data from Sanity:', error);
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
                        alt="Məktəbəqədər Təhsil"
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
                            <span className="text-yellow-500">Məktəbəqədər Təhsil</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            Uşaqlarınızın parlaq gələcəyə hazırlanması üçün keyfiyyətli məktəbəqədər təhsil xidmətlərimiz
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-16 -mt-16 relative z-10"
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-2 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'services'
                                    ? 'bg-yellow-500 text-black'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Xidmətlər
                            </button>
                            <button
                                onClick={() => setActiveTab('methods')}
                                className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'methods'
                                    ? 'bg-yellow-500 text-black'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Hazırlıq Metodu
                            </button>
                        </div>
                    </div>

                    {/* Services Tab Content */}
                    {activeTab === 'services' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center h-96">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                        <p className="text-gray-300">Xidmətlər yüklənir...</p>
                                    </div>
                                </div>
                            ) : services.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-gray-400 text-lg mb-4">
                                        Heç bir xidmət tapılmadı.
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {services.map((service, index) => (
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
                                                    {service.targetAgeGroup && (
                                                        <div className="flex items-center text-sm text-gray-400">
                                                            <Users className="w-4 h-4 mr-2" />
                                                            <span>Yaş qrupu: {service.targetAgeGroup}</span>
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
                                                <Link href={`/preschool/${service.slug}`}>
                                                    <Button className="w-full border cursor-pointer border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                                                        <span>Ətraflı</span>
                                                        <ChevronRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Preparation Methods Tab Content */}
                    {activeTab === 'methods' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {preparationMethods.map((method, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                        className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 hover:shadow-xl hover:shadow-yellow-900/10 transition-all duration-300"
                                    >
                                        <div className="flex items-center mb-6">
                                            <div className="bg-yellow-500/10 p-3 rounded-lg mr-4">
                                                <method.icon className="w-8 h-8 text-yellow-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                                        </div>

                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            {method.description}
                                        </p>

                                        <div className="space-y-3">
                                            {method.features.map((feature, i) => (
                                                <div key={i} className="flex items-center">
                                                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3 flex-shrink-0"></div>
                                                    <span className="text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Info Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                                className="mt-16 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-lg p-8"
                            >
                                <h3 className="text-3xl font-bold mb-6 text-yellow-500">Bizim Metodumuzun Üstünlükləri</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">5+</div>
                                        <p className="text-gray-300">İllik Təcrübə</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">200+</div>
                                        <p className="text-gray-300">Uğurlu Mezun</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">95%</div>
                                        <p className="text-gray-300">Məmnuniyyət Səviyyəsi</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
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
                        Uşağınızın <span className="text-yellow-500">gələcəyinə investisiya</span> edin
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        Məktəbəqədər təhsil xidmətlərimiz haqqında ətraflı məlumat almaq üçün bizimlə əlaqə saxlayın
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