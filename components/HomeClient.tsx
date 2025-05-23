"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Carousel from "./Carousel";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOMEPAGE_CAROUSEL_QUERY, FAQ_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { SanityCarouselItem, CarouselItem } from "@/types/carousel";
import { SanityFAQItem, SanityTestimonialItem, FAQItem, TestimonialItem } from "@/types/faq-testimonials";

// Updated interface to include all props
interface HomeClientProps {
    initialCarouselData?: SanityCarouselItem[];
    initialFaqData?: SanityFAQItem[];
    initialTestimonialsData?: SanityTestimonialItem[];
}

// Fallback carousel items in case Sanity data is not available
const fallbackCarouselItems: CarouselItem[] = [
    {
        id: "1",
        title: "Dünya Səviyyəsində Təhsil",
        description: "Beynəlxalq standartlara uyğun təhsil proqramları və müasir tədris metodları ilə gələcəyinizi formalaşdırın.",
        image: "/assets/bg.webp",
        buttonText: "Daha Ətraflı",
        buttonAction: () => console.log("Learn more clicked")
    },
    {
        id: "2",
        title: "Xaricdə Təhsil İmkanları",
        description: "Dünyanın ən yaxşı universitetlərində təhsil almaq üçün peşəkar məsləhət və tam dəstək alın.",
        image: "/assets/bg.webp",
        buttonText: "Müraciət Et",
        buttonAction: () => console.log("Apply clicked")
    },
    {
        id: "3",
        title: "Peşəkar Müəllimlər",
        description: "Sahəsində mütəxəssis müəllim heyətimiz ilə keyfiyyətli təhsil və fərdi yanaşma təcrübəsi yaşayın.",
        image: "/assets/bg.webp",
        buttonText: "Komandamız",
        buttonAction: () => console.log("Team clicked")
    },
    {
        id: "4",
        title: "Kiçik Yaşdan Böyük Nailiyyətlər",
        description: "Preschool proqramımız ilə uşaqlarınızın erkən yaşlardan dil və sosial bacarıqlarını inkişaf etdirin.",
        image: "/assets/bg.webp",
        buttonText: "Qeydiyyat",
        buttonAction: () => console.log("Register clicked")
    }
];

// Helper functions
const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
        'all': 'Hamısı',
        'general': 'Ümumi',
        'admissions': 'Qəbul',
        'programs': 'Proqramlar',
        'study-abroad': 'Xaricdə Təhsil',
        'preschool': 'Preschool'
    };
    return categoryNames[category] || category;
};

const getProgramDisplayName = (program: string) => {
    const programNames: Record<string, string> = {
        'language-courses': 'Dil Kursları',
        'study-abroad': 'Xaricdə Təhsil',
        'preschool': 'Preschool',
        'training-center': 'Təlim Mərkəzi',
        'general': 'Ümumi'
    };
    return programNames[program] || program;
};

// Transform functions
const transformFaqData = (sanityItems: SanityFAQItem[]): FAQItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.question && item.answer)
        .map((item) => ({
            id: item._id,
            question: item.question,
            answer: item.answer,
            category: item.category || 'general',
        }));
};

const transformTestimonialsData = (sanityItems: SanityTestimonialItem[]): TestimonialItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.name && item.testimonial)
        .map((item) => ({
            id: item._id,
            name: item.name,
            position: item.position,
            company: item.company,
            testimonial: item.testimonial,
            image: item.image ? urlFor(item.image).width(96).height(96).quality(85).url() : undefined,
            rating: item.rating || 5,
            program: item.program || 'general',
            featured: item.featured || false,
        }));
};

export default function HomeClient({ initialCarouselData, initialFaqData, initialTestimonialsData }: HomeClientProps) {
    // Carousel state
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>(fallbackCarouselItems);
    const [isLoading, setIsLoading] = useState(!initialCarouselData);

    // FAQ state
    const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
    const [faqLoading, setFaqLoading] = useState(!initialFaqData);
    const [activeFaq, setActiveFaq] = useState<string | null>(null);
    const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');

    // Testimonials state
    const [testimonialItems, setTestimonialItems] = useState<TestimonialItem[]>([]);
    const [testimonialsLoading, setTestimonialsLoading] = useState(!initialTestimonialsData);

    // References for parallax sections
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Parallax effects for different sections
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

    // Animation variants
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

    // Computed values for FAQ
    const faqCategories = ['all', ...Array.from(new Set(faqItems.map(item => item.category)))];
    const filteredFaqItems = activeFaqCategory === 'all'
        ? faqItems
        : faqItems.filter(item => item.category === activeFaqCategory);

    const transformSanityData = (sanityItems: SanityCarouselItem[]): CarouselItem[] => {
        return sanityItems
            .filter(item => item && item._id && item.title && item.description)
            .map((item) => {
                try {
                    return {
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        image: item.image ? urlFor(item.image).width(1920).height(1080).quality(85).url() : '/assets/bg.webp',
                        buttonText: item.buttonText,
                        buttonAction: item.buttonLink ? () => {
                            try {
                                if (item.buttonLink?.startsWith('http')) {
                                    window.open(item.buttonLink, '_blank', 'noopener,noreferrer');
                                } else {
                                    window.location.href = item.buttonLink || '#';
                                }
                            } catch (error) {
                                console.error('Error navigating to link:', error);
                            }
                        } : undefined,
                    };
                } catch (error) {
                    console.error('Error transforming carousel item:', item, error);
                    return {
                        id: item._id || 'fallback',
                        title: item.title || 'Untitled',
                        description: item.description || 'No description available',
                        image: '/assets/bg.webp',
                    };
                }
            });
    };

    // Effect for carousel data
    useEffect(() => {
        let isMounted = true;

        const loadCarouselData = async () => {
            try {
                if (initialCarouselData && initialCarouselData.length > 0) {
                    if (isMounted) {
                        setCarouselItems(transformSanityData(initialCarouselData));
                        setIsLoading(false);
                    }
                    return;
                }

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const data = await client.fetch<SanityCarouselItem[]>(
                    HOMEPAGE_CAROUSEL_QUERY,
                    {},
                    {
                        signal: controller.signal,
                        cache: 'force-cache'
                    }
                );

                clearTimeout(timeoutId);

                if (isMounted) {
                    if (data && data.length > 0) {
                        setCarouselItems(transformSanityData(data));
                    } else {
                        console.log('No carousel data found in Sanity, using fallback data');
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching carousel data from Sanity:', error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadCarouselData();

        return () => {
            isMounted = false;
        };
    }, [initialCarouselData]);

    // Effect for FAQ and Testimonials data
    useEffect(() => {
        let isMounted = true;

        const loadFaqAndTestimonials = async () => {
            try {
                // Handle FAQ data
                if (initialFaqData && initialFaqData.length > 0) {
                    if (isMounted) {
                        setFaqItems(transformFaqData(initialFaqData));
                        setFaqLoading(false);
                    }
                } else {
                    const faqData = await client.fetch<SanityFAQItem[]>(FAQ_QUERY);
                    if (isMounted && faqData) {
                        setFaqItems(transformFaqData(faqData));
                        setFaqLoading(false);
                    }
                }

                // Handle Testimonials data
                if (initialTestimonialsData && initialTestimonialsData.length > 0) {
                    if (isMounted) {
                        setTestimonialItems(transformTestimonialsData(initialTestimonialsData));
                        setTestimonialsLoading(false);
                    }
                } else {
                    const testimonialsData = await client.fetch<SanityTestimonialItem[]>(TESTIMONIALS_QUERY);
                    if (isMounted && testimonialsData) {
                        setTestimonialItems(transformTestimonialsData(testimonialsData));
                        setTestimonialsLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching FAQ or Testimonials data:', error);
                if (isMounted) {
                    setFaqLoading(false);
                    setTestimonialsLoading(false);
                }
            }
        };

        loadFaqAndTestimonials();

        return () => {
            isMounted = false;
        };
    }, [initialFaqData, initialTestimonialsData]);

    return (
        <div ref={containerRef} className="relative min-h-screen text-white">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="İngla School"
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
                        <h1 className="text-6xl font-bold mb-6 text-white">
                            <span className="text-yellow-500">İngla</span> School
                        </h1>
                        <p className="text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
                            Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24"></div>
            </motion.div>

            {/* Carousel Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
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
                            Bizim <span className="text-yellow-500">Üstünlüklərimiz</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            İngla School-da təhsil təcrübənizi daha da zənginləşdirən xüsusiyyətlərimizi kəşf edin
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Məlumatlar yüklənir...</p>
                            </div>
                        </div>
                    ) : (
                        <Carousel
                            items={carouselItems}
                            autoPlay={true}
                            autoPlayInterval={6000}
                            showControls={true}
                            showIndicators={true}
                            className="shadow-2xl shadow-yellow-900/20 border border-gray-800"
                        />
                    )}
                </div>
            </motion.section>

            {/* Xidmətlər Section */}
            <motion.section
                id="xidmetler"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 "
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl shadow-yellow-900/10 border border-gray-800">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Xidmətlər"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">
                                <span className="text-yellow-500">Xidmətlər</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Müxtəlif təhsil xidmətlərimiz və proqramlarımız haqqında ətraflı məlumat əldə edin. İngla School
                                olaraq tələbələrimizin ehtiyaclarına uyğun geniş xidmət spektri təklif edirik.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "Dil kursları və təlimləri",
                                    "Beynəlxalq imtahanlara hazırlıq",
                                    "Akademik mentorluq və təlimatlandırma",
                                    "Xaricdə təhsil konsultasiyaları",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="border-2 border-white hover:bg-white hover:text-black cursor-pointer transition duration-300  text-white">
                                <span>Ətraflı</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Haqqımızda Section */}
            <motion.section
                id="haqqimizda"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 "
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl shadow-yellow-900/10 border border-gray-800">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Haqqımızda"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">
                                <span className="text-yellow-500">Haqqımızda</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                İngla School komandası, missiyamız və təhsil fəlsəfəmiz haqqında məlumat. 2010-cu ildən bəri
                                Azərbaycanda keyfiyyətli təhsil xidmətləri təqdim edirik. Peşəkar müəllim heyətimiz və
                                innovativ tədris metodologiyamızla tələbələrimizin akademik və şəxsi inkişafını təmin edirik.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "Təcrübəli müəllimlər və mentorlar",
                                    "Beynəlxalq standartlara uyğun tədris proqramları",
                                    "Müasir tədris infrastrukturu",
                                    "Fərdi yanaşma və kiçik qruplarla məşğələlər",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="border-2 border-white hover:bg-white hover:text-black cursor-pointer transition duration-300  text-white">
                                <span>Ətraflı</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Xaricdə Təhsil Section */}
            <motion.section
                id="xaricde-tehsil"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl shadow-yellow-900/10 border border-gray-800">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Xaricdə Təhsil"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">
                                <span className="text-yellow-500">Xaricdə Təhsil</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Dünyanın aparıcı universitetlərində təhsil fürsətləri və tərəfdaşlıq proqramlarımız. Xaricdə təhsil
                                almaq istəyən tələbələr üçün bütün mərhələlərdə dəstək veririk.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "ABŞ, Böyük Britaniya, Almaniya və digər ölkələrdə təhsil imkanları",
                                    "Təqaüd proqramları və maliyyə dəstəyi",
                                    "Sənəd hazırlığı və müraciət prosesi",
                                    "Viza məsləhətləri və yaşayış dəstəyi",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="border-2 border-white hover:bg-white hover:text-black cursor-pointer transition duration-300  text-white">
                                <span>Ətraflı</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Preschool Section */}
            <motion.section
                id="preschool"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 "
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl shadow-yellow-900/10 border border-gray-800">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Preschool"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">
                                <span className="text-yellow-500">Preschool</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Kiçik yaşlı uşaqlar üçün erkən təhsil və inkişaf proqramlarımız. 3-6 yaş aralığındakı uşaqların
                                təhsil və sosial bacarıqlarını inkişaf etdirmək üçün əyləncəli və interaktiv dərs metodlarımız.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "Oyun əsaslı öyrənmə metodları",
                                    "Dil inkişafı proqramları",
                                    "Sosial bacarıqların təkmilləşdirilməsi",
                                    "İngilis dilli mühitdə təhsil",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="border-2 border-white hover:bg-white hover:text-black cursor-pointer transition duration-300  text-white">
                                <span>Ətraflı</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>


            {/* Təlim Mərkəzi Section */}
            <motion.section
                id="telim-merkezi"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24 "
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl shadow-yellow-900/10 border border-gray-800">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Təlim Mərkəzi"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">
                                <span className="text-yellow-500">Təlim Mərkəzi</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Peşəkar inkişaf üçün müxtəlif təlim proqramları və sertifikatlaşdırma kursları. Karyera yüksəlişi
                                və ixtisaslaşma üçün fərdi və korporativ təlim həlləri təklif edirik.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "İxtisaslaşmış biznes təlimləri",
                                    "Rəqəmsal bacarıqların inkişafı",
                                    "Kommunikasiya və liderlik üzrə kurslar",
                                    "Korporativ təlim proqramları",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="border-2 border-white hover:bg-white hover:text-black cursor-pointer transition duration-300  text-white">
                                <span>Ətraflı</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>


            {/* Testimonials Section */}
            <motion.section
                id="testimonials"
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
                            Tələbə <span className="text-yellow-500">Rəyləri</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            İngla School məzunları və tələbələrinin təcrübələrini oxuyun
                        </p>
                    </motion.div>

                    {testimonialsLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">Rəylər yüklənir...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonialItems.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    className={`bg-gray-900/50 border rounded-lg p-6 hover:shadow-xl hover:shadow-yellow-900/10 transition-all duration-300 ${testimonial.featured
                                        ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-transparent'
                                        : 'border-gray-800'
                                        }`}
                                >
                                    {/* Star Rating */}
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-600'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <blockquote className="text-gray-300 mb-6 italic">
                                        {testimonial.testimonial}
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="flex items-center">
                                        {testimonial.image && (
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-700">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-semibold text-white flex items-center">
                                                {testimonial.name}
                                                {testimonial.featured && (
                                                    <span className="ml-2 text-yellow-500">⭐</span>
                                                )}
                                            </div>
                                            {testimonial.position && (
                                                <div className="text-sm text-gray-400">
                                                    {testimonial.position}
                                                    {testimonial.company && ` at ${testimonial.company}`}
                                                </div>
                                            )}
                                            <div className="text-xs text-yellow-500 mt-1">
                                                {getProgramDisplayName(testimonial.program)}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                id="faq"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="py-24"
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
                            Tez-tez <span className="text-yellow-500">Verilən Suallar</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            İngla School haqqında ən çox soruşulan sualların cavablarını tapın
                        </p>
                    </motion.div>

                    {faqLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-300">FAQ məlumatları yüklənir...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* FAQ Categories */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveFaqCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFaqCategory === category
                                            ? 'bg-yellow-500 text-black'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        {getCategoryDisplayName(category)}
                                    </button>
                                ))}
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-4">
                                {filteredFaqItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                        className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setActiveFaq(activeFaq === item.id ? null : item.id)}
                                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors"
                                        >
                                            <span className="font-medium text-white">{item.question}</span>
                                            <ChevronRight
                                                className={`w-5 h-5 text-yellow-500 transition-transform duration-300 ${activeFaq === item.id ? 'rotate-90' : ''
                                                    }`}
                                            />
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: activeFaq === item.id ? 'auto' : 0,
                                                opacity: activeFaq === item.id ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 mt-3 pb-4 text-gray-300">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.section>



        </div>
    );
}