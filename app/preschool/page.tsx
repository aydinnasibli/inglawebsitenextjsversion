"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Users, Star, BookOpen, Heart, Smile, Zap, ArrowDown, Sparkles, Trophy, Shield } from "lucide-react";
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
        features: ["Hərflərin öyrədilməsi", "Rəqəmlərlə tanışlıq", "Sadə oxu vərdişləri"],
        color: "from-blue-500/20 to-purple-500/20",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-400"
    },
    {
        icon: Heart,
        title: "Sosial Hazırlıq",
        description: "Uşaqların sosial bacarıqlarını inkişaf etdirmək və kollektiv həyata hazırlamaq",
        features: ["Ünsiyyət qurma", "Paylaşma vərdiş", "Dostluq münasibətləri"],
        color: "from-rose-500/20 to-pink-500/20",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-400"
    },
    {
        icon: Smile,
        title: "Emosional Hazırlıq",
        description: "Uşaqların emosional sabitliyini təmin etmək və özünəinam formalaşdırmaq",
        features: ["Özünəinam artırma", "Stress idarə etmə", "Müstəqillik inkişafı"],
        color: "from-green-500/20 to-emerald-500/20",
        iconBg: "bg-green-500/10",
        iconColor: "text-green-400"
    },
    {
        icon: Zap,
        title: "Fiziki Hazırlıq",
        description: "Motor vərdişlərin inkişafı və sağlam həyat tərzinin formalaşması",
        features: ["İnce motor vərdişlər", "Koordinasiya inkişafı", "Sağlam vərdişlər"],
        color: "from-yellow-500/20 to-orange-500/20",
        iconBg: "bg-yellow-500/10",
        iconColor: "text-yellow-400"
    }
];

const heroStats = [
    { icon: Trophy, value: "5+", label: "İllik Təcrübə" },
    { icon: Users, value: "200+", label: "Uğurlu Mezun" },
    { icon: Shield, value: "95%", label: "Məmnuniyyət" },
];

export default function PreschoolServicesPage({ initialServicesData }: PreschoolServicesPageProps) {
    const [services, setServices] = useState<PreschoolServiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(!initialServicesData);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Enhanced parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const heroY = useTransform(smoothScrollY, [0, 0.4], [0, -200]);
    const heroScale = useTransform(smoothScrollY, [0, 0.4], [1, 1.1]);
    const heroOpacity = useTransform(smoothScrollY, [0, 0.3], [1, 0.2]);
    const textY = useTransform(smoothScrollY, [0, 0.4], [0, -100]);

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
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-2000"></div>
            </div>

            {/* Enhanced Hero Section */}
            <motion.div
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background Image with Enhanced Effects */}
                <motion.div
                    style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 to-transparent z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Məktəbəqədər Təhsil"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute inset-0 z-10">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/4 left-10 opacity-20"
                    >
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, 15, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                        className="absolute top-1/3 right-16 opacity-20"
                    >
                        <BookOpen className="w-6 h-6 text-blue-400" />
                    </motion.div>
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        style={{ y: textY }}
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center px-6 py-3 mb-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-sm font-medium text-yellow-400">Keyfiyyətli Təhsil</span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                                Məktəbəqədər
                            </span>
                            <br />
                            <span className="text-white">Təhsil</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed"
                        >
                            Uşaqlarınızın parlaq gələcəyə hazırlanması üçün keyfiyyətli məktəbəqədər təhsil xidmətlərimiz ilə onların potensialını ortaya çıxarırıq
                        </motion.p>

                        {/* Hero Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center gap-8 mb-12"
                        >
                            {heroStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10"
                                >
                                    <div className="bg-yellow-500/10 p-2 rounded-lg">
                                        <stat.icon className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                                        <div className="text-sm text-gray-300">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>



                        {/* Scroll Indicator */}
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex flex-col items-center  text-white/60"
                        >
                            <span className="text-sm mb-2">Aşağı sürüşdür</span>
                            <ArrowDown className="w-5 h-5" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Preparation Methods Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="py-24 relative z-10"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center px-4 py-2 mb-6 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                            <BookOpen className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-sm font-medium text-yellow-400">Hazırlıq Metodları</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Uşaqlarınızın Gələcəyini
                            <br />
                            <span className="text-yellow-400">İnşa Edirik</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Müasir və sınanmış metodlarımızla uşaqların hər sahədə inkişafını təmin edirik
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {preparationMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.8 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`bg-gradient-to-br ${method.color} backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group relative overflow-hidden`}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`${method.iconBg} p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                                            {method.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                                        {method.description}
                                    </p>

                                    <div className="space-y-3">
                                        {method.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                viewport={{ once: true }}
                                                className="flex items-center group/item"
                                            >
                                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                                                <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Enhanced Services Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="py-24 relative z-10"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center px-4 py-2 mb-6 bg-blue-500/10 rounded-full border border-blue-500/20">
                            <Star className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-blue-400">Xidmətlərimiz</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Keyfiyyətli Təhsil
                            <br />
                            <span className="text-blue-400">Xidmətləri</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Hər uşağın ehtiyaclarına uyğun fərdiləşdirilmiş təhsil proqramları
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full mx-auto mb-4"
                                />
                                <p className="text-gray-400 text-lg">Xidmətlər yüklənir...</p>
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
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group relative ${service.isFeatured
                                        ? 'border-yellow-500/50 shadow-yellow-500/10'
                                        : 'border-white/10'
                                        }`}
                                >
                                    {/* Service Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {service.isFeatured && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg"
                                            >
                                                <Star className="w-4 h-4 mr-1" />
                                                Populyar
                                            </motion.div>
                                        )}
                                        <Image
                                            src={service.featuredImage}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                                            {service.shortDescription}
                                        </p>

                                        {/* Service Info */}
                                        <div className="space-y-2 mb-6">
                                            {service.duration && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                                    <span>Müddət: {service.duration}</span>
                                                </div>
                                            )}
                                            {service.targetAgeGroup && (
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <Users className="w-4 h-4 mr-2 text-green-400" />
                                                    <span>Yaş qrupu: {service.targetAgeGroup}</span>
                                                </div>
                                            )}
                                            {service.priceRange && (
                                                <div className="text-sm font-semibold text-yellow-400">
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
                                                            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mr-3 mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-300">{feature.feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <Link href={`/preschool/${service.slug}`}>
                                            <Button className="w-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/50 text-yellow-400 hover:from-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-300 rounded-xl font-medium">
                                                <span>Ətraflı Məlumat</span>
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
        </div>
    );
}