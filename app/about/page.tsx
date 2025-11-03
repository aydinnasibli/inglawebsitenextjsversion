"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Globe, Sparkles, ArrowDown } from "lucide-react";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Enhanced parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
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
                ease: "easeOut",
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    // Statistics data
    const stats = [
        {
            number: "13+",
            label: "İllik Təcrübə",
            description: "2010-cu ildən bəri keyfiyyətli təhsil",
            icon: <Award className="w-6 h-6" />
        },
        {
            number: "500+",
            label: "Məzun Tələbə",
            description: "Uğurlu həyat yoluna qədəm atan mezunlar",
            icon: <Users className="w-6 h-6" />
        },
        {
            number: "50+",
            label: "Təcrübəli Müəllim",
            description: "Sahəsində mütəxəssis komanda",
            icon: <Target className="w-6 h-6" />
        },
        {
            number: "15+",
            label: "Ölkəyə Məzun Göndərmişik",
            description: "Beynəlxalq təhsil imkanları",
            icon: <Globe className="w-6 h-6" />
        }
    ];

    // Values data
    const values = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "Keyfiyyət",
            description: "Təhsil və təqdim etdiyimiz xidmətlərdə yüksək standartları qoruyuruq.",
            gradient: "from-yellow-400 to-orange-500"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "İnnovasiya",
            description: "Yenilikçi metodlar və texnologiyalardan istifadə edərək daim inkişaf edirik.",
            gradient: "from-blue-400 to-purple-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Fərdi Yanaşma",
            description: "Hər insanın və müəssisənin ehtiyaclarına uyğun fərdi həllər hazırlayırıq.",
            gradient: "from-green-400 to-teal-500"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Beynəlxalq Əməkdaşlıq",
            description: "Akademik və biznes tərəfdaşlıqlar quraraq qlobal rəqabətə davamlı mütəxəssislər yetişdiririk.",
            gradient: "from-pink-400 to-red-500"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Məsuliyyətlilik",
            description: "Cəmiyyət və fərdlər qarşısında etik və sosial məsuliyyətimizi qoruyuruq.",
            gradient: "from-purple-400 to-indigo-500"
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "Şəffaflıq və Dürüstlük",
            description: "Müştərilərimizlə açıq və etibarlı əməkdaşlıq qururuq.",
            gradient: "from-cyan-400 to-blue-500"
        }
    ];

    // Goals data
    const goals = [
        {
            title: "Qlobal Mövqe və İnkişaf",
            description: "Şirkət olaraq qlobal bazarda daha geniş yer tutmağı və beynəlxalq əməkdaşlıqlar qurmağı hədəfləyirik.",
            icon: <Globe className="w-6 h-6" />
        },
        {
            title: "Müştəri Məmnuniyyəti və Keyfiyyət",
            description: "Keyfiyyətə verdiyimiz önəm sayəsində, ən effektiv və etibarlı həlləri təqdim etməyə sadiqik.",
            icon: <Heart className="w-6 h-6" />
        },
        {
            title: "İnnovasiya və Fərdi Yanaşma",
            description: "Daim yenilənən texnologiyalar vasitəsilə fərdi yanaşmanı əsas götürərək xüsusi həllər hazırlayırıq.",
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: "Dəyər Yaratmaq",
            description: "Cəmiyyət qarşısında məsuliyyətli yanaşmanı qoruyaraq dayanıqlı inkişafı təmin etməyə çalışırıq.",
            icon: <Target className="w-6 h-6" />
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Enhanced Hero Section */}
            <motion.div
                ref={heroRef}
                className="relative h-screen flex items-center justify-center"
            >
                {/* Background with enhanced parallax */}
                <motion.div
                    style={{ y: heroY, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Ingla School Haqqında"
                        fill
                        priority
                        quality={95}
                        className="object-cover"
                    />
                    {/* Animated overlay patterns */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-30 z-10">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>
                </motion.div>

                {/* Hero Content */}
                <motion.div
                    style={{ y: textY, opacity }}
                    className="container mx-auto px-4 relative z-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center max-w-5xl mx-auto"
                    >


                        {/* Main heading with gradient */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                                Ingla School
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                                Haqqında
                            </span>
                        </motion.h1>

                        {/* Enhanced description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-gray-200 leading-relaxed"
                        >
                            İllərlə formalaşan təcrübə ilə sizi uğura aparan bilik və metodlarla zənginləşdiririk.
                            <span className="block mt-2 text-lg text-gray-300">
                                Keyfiyyətli təhsil və innovativ yanaşmalarla gələcəyinizə sərmayə edin.
                            </span>
                        </motion.p>


                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center text-white/60"
                    >
                        <span className="text-sm mb-2">Aşağı keçin</span>
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Enhanced Statistics Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/30 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-blue-500/5" />
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div variants={cardVariants}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Uğur <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Hekayəmiz</span>
                            </h2>
                            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                                Uğur hekayəmiz komanda işi və səbirin sübutudur. Birlikdə çətinlikləri dəf etmiş,
                                qələbələrimizi qeyd etmiş və irəliləyiş və uğurdan ibarət bir hekayə yaratmışıq.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="text-center p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-500 hover:border-yellow-500/30 group"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                                    {stat.number}
                                </div>
                                <div className="text-xl font-semibold mb-3 text-white group-hover:text-yellow-100 transition-colors duration-300">
                                    {stat.label}
                                </div>
                                <div className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                    {stat.description}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Enhanced Vision Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={sectionVariants}
                className="py-24 relative"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-yellow-900/20 border border-gray-800/50 group">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Vizyonumuz"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-blue-500/10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <div className="space-y-6">
                                <div>
                                    <span className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
                                        Vizyonumuz
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Gələcəyin İnnovativ Lideri
                                    </h2>
                                </div>

                                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                                    <p>
                                        Biz gələcəyin innovativ və dayanıqlı inkişafına töhfə verən lider şirkət olmaq istəyirik.
                                        Texnologiya və təhsili birləşdirərək, müştərilərimizə və cəmiyyətə dəyər qatan həllər
                                        təqdim etməyi hədəfləyirik.
                                    </p>
                                    <p>
                                        Qlobal bazarda güclü mövqe tutaraq, beynəlxalq əməkdaşlıqları genişləndirmək,
                                        insan kapitalının inkişafına töhfə vermək və rəqabətə davamlı mütəxəssislər
                                        yetişdirmək bizim əsas məqsədlərimizdəndir.
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Enhanced Mission Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={sectionVariants}
                className="py-24 bg-gradient-to-b from-gray-900/30 to-transparent relative"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/20 border border-gray-800/50 group">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Missiyamız"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <div className="space-y-6">
                                <div>
                                    <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                                        Missiyamız
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Keyfiyyət və İnnovasiya
                                    </h2>
                                </div>

                                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                                    <p>
                                        Biz texnologiya və innovasiyaların gücündən istifadə edərək müştərilərimizə ən yaxşı
                                        həlləri təqdim etməyə və onların bizneslərini inkişaf etdirməyə çalışırıq.
                                    </p>
                                    <p>
                                        Yenilikçi yanaşmalarımızla insanlara və müəssisələrə daha səmərəli, keyfiyyətli və
                                        dayanıqlı xidmətlər göstərməyi hədəfləyirik.
                                    </p>
                                    <p>
                                        Beynəlxalq əməkdaşlıqlar quraraq, müasir və keyfiyyətli təhsil imkanları yaratmaq,
                                        fərdlərin akademik və peşəkar inkişafını dəstəkləmək üçün çalışırıq.
                                    </p>
                                </div>


                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Enhanced Values Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-24 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div variants={cardVariants}>
                            <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
                                Dəyərlərimiz
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Bizim <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Dəyərlərimiz</span>
                            </h2>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                                Ingla School-un əsas dəyərləri və prinsipləri
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:border-purple-500/30 group"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-110 transition-transform duration-300">
                                    <div className={`bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                                        {value.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-100 transition-colors duration-300">
                                    {value.title}
                                </h3>

                                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Enhanced Goals Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-24 bg-gradient-to-b from-gray-900/30 to-black relative"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div variants={cardVariants}>
                            <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
                                Hədəflərimiz
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Bizim <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Hədəflərimiz</span>
                            </h2>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                                Gələcək üçün müəyyən etdiyimiz əsas istiqamətlər və hədəflər
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {goals.map((goal, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -5, scale: 1.01 }}
                                className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-500 hover:border-green-500/30 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <div className="text-green-400 group-hover:text-green-300 transition-colors duration-300">
                                            {goal.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-green-100 transition-colors duration-300">
                                            {goal.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            {goal.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>


        </div>
    );
}