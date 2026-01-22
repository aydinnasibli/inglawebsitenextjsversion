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
        <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden bg-background">
            {/* Enhanced Hero Section */}
            <motion.div
                ref={heroRef}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background with enhanced parallax */}
                <motion.div
                    style={{ y: heroY, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
                    <Image
                        src="/assets/bg.webp"
                        alt="Ingla School Haqqında"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                    />

                    {/* Animated overlay patterns */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent z-10 mix-blend-overlay" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none z-10" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-10" />
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
                            className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight"
                        >
                            <span className="text-white drop-shadow-lg">
                                Ingla School
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">
                                Haqqında
                            </span>
                        </motion.h1>

                        {/* Enhanced description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-light"
                        >
                            İllərlə formalaşan təcrübə ilə sizi uğura aparan bilik və metodlarla zənginləşdiririk.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                        <span className="text-xs tracking-widest uppercase mb-2">Aşağı keçin</span>
                        <ArrowDown className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Enhanced Statistics Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-32 relative overflow-hidden"
            >
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-500/5 opacity-30" />

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.div variants={cardVariants}>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                Uğur <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Hekayəmiz</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
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
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 rounded-3xl text-center group"
                            >
                                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-yellow-400 transition-colors">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-semibold text-gray-200 mb-4">
                                    {stat.label}
                                </div>
                                <div className="text-gray-400 text-sm leading-relaxed">
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
                className="py-32 relative"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, rotate: -5, x: -50 }}
                            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl transform -rotate-6 scale-95 rounded-3xl" />
                            <div className="relative h-[600px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Vizyonumuz"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <span className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
                                Vizyonumuz
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
                                Gələcəyin <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">İnnovativ Lideri</span>
                            </h2>

                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                                <p className="border-l-2 border-yellow-500/50 pl-6">
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
                className="py-32 relative bg-black/30"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, rotate: 5, x: 50 }}
                            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl transform rotate-6 scale-95 rounded-3xl" />
                            <div className="relative h-[600px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
                                <Image
                                    src="/assets/bg.webp"
                                    alt="Missiyamız"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                                Missiyamız
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
                                Keyfiyyət və <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">İnnovasiya</span>
                            </h2>

                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                                <p className="border-l-2 border-blue-500/50 pl-6">
                                    Biz texnologiya və innovasiyaların gücündən istifadə edərək müştərilərimizə ən yaxşı
                                    həlləri təqdim etməyə və onların bizneslərini inkişaf etdirməyə çalışırıq.
                                </p>
                                <p>
                                    Yenilikçi yanaşmalarımızla insanlara və müəssisələrə daha səmərəli, keyfiyyətli və
                                    dayanıqlı xidmətlər göstərməyi hədəfləyirik.
                                </p>
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
                className="py-32 relative overflow-hidden"
            >
                {/* Background Blobs */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.div variants={cardVariants}>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                Bizim <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dəyərlərimiz</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
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
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 rounded-3xl group hover:border-purple-500/30"
                            >
                                <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <div className={`text-2xl text-transparent bg-clip-text bg-gradient-to-r ${value.gradient}`}>
                                        {value.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                                    {value.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed font-light">
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
                className="py-32 relative"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.div variants={cardVariants}>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                Bizim <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">Hədəflərimiz</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
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
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-10 rounded-3xl group flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left hover:border-green-500/30"
                            >
                                <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-green-500/10 to-teal-500/10 text-green-400 group-hover:scale-110 transition-transform duration-300">
                                    {goal.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">
                                        {goal.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-light text-lg">
                                        {goal.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}