"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, GraduationCap, Globe, Lightbulb, BookOpen, Users } from "lucide-react";

export default function Home() {
    // References for parallax sections
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    // Parallax effects for different sections
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900 z-10" />
                    <Image
                        src="/api/placeholder/1920/1080"
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
                        <h1 className="text-6xl font-bold mb-6 text-white">İngla School</h1>
                        <p className="text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
                            Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri
                        </p>
                        <Button size="lg" className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-6 text-lg">
                            Bizimlə Əlaqə
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Services Section */}
            <div ref={servicesRef} className="relative py-24 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-16 text-center"
                    >
                        Xidmətlərimiz
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Xidmətlər",
                                description: "Müxtəlif təhsil xidmətlərimiz və proqramlarımız haqqında ətraflı məlumat əldə edin",
                                icon: <BookOpen className="h-10 w-10 text-indigo-500" />,
                                color: "indigo",
                            },
                            {
                                title: "Haqqımızda",
                                description: "İngla School komandası, missiyamız və təhsil fəlsəfəmiz haqqında məlumat",
                                icon: <Users className="h-10 w-10 text-emerald-500" />,
                                color: "emerald",
                            },
                            {
                                title: "Xaricdə Təhsil",
                                description: "Dünyanın aparıcı universitetlərində təhsil fürsətləri və tərəfdaşlıq proqramlarımız",
                                icon: <Globe className="h-10 w-10 text-purple-500" />,
                                color: "purple",
                            },
                            {
                                title: "Preschool",
                                description: "Kiçik yaşlı uşaqlar üçün erkən təhsil və inkişaf proqramlarımız",
                                icon: <GraduationCap className="h-10 w-10 text-pink-500" />,
                                color: "pink",
                            },
                            {
                                title: "Təlim Mərkəzi",
                                description: "Peşəkar inkişaf üçün müxtəlif təlim proqramları və sertifikatlaşdırma kursları",
                                icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
                                color: "amber",
                            },
                        ].map((service, i) => (
                            <motion.div
                                key={service.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={cardVariants}
                            >
                                <Link href={`/${service.title.toLowerCase().replace(" ", "-")}`}>
                                    <Card className={`bg-gray-800 border-gray-700 hover:border-${service.color}-500 transition-all duration-300 h-full overflow-hidden group`}>
                                        <CardContent className="p-6">
                                            <div className="mb-4">{service.icon}</div>
                                            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                                            <p className="text-gray-300 mb-6">{service.description}</p>
                                            <div className={`flex items-center text-${service.color}-500 font-medium`}>
                                                <span>Ətraflı</span>
                                                <ChevronRight className={`h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform`} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section with Parallax */}
            <motion.div
                className="relative py-24 bg-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <motion.div
                            className="md:w-1/2 mb-12 md:mb-0"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative h-96 w-full overflow-hidden rounded-lg">
                                <Image
                                    src="/api/placeholder/800/600"
                                    alt="İngla School classroom"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2 md:pl-12"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6">Niyə İngla School?</h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                İngla School 2010-cu ildən bəri Azərbaycanda keyfiyyətli təhsil xidmətləri təqdim edir. Peşəkar müəllim heyətimiz və innovativ tədris metodologiyamızla tələbələrimizin akademik və şəxsi inkişafını təmin edirik.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Təcrübəli müəllimlər və mentorlar",
                                    "Beynəlxalq standartlara uyğun tədris proqramları",
                                    "Müasir tədris infrastrukturu",
                                    "Fərdi yanaşma və kiçik qruplarla məşğələlər",
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        viewport={{ once: true }}
                                        className="flex items-center"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-indigo-500 mr-3"></div>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            <Button className="mt-8 bg-indigo-700 hover:bg-indigo-800 text-white">
                                Daha Ətraflı
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Programs Section */}
            <div className="py-24 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-16 text-center"
                    >
                        Tədris Proqramlarımız
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Dil kursları",
                                desc: "İngilis, Alman, Fransız və digər dillərdə tədris proqramları",
                                color: "blue",
                            },
                            {
                                title: "IELTS/TOEFL",
                                desc: "Beynəlxalq imtahanlara hazırlıq",
                                color: "green",
                            },
                            {
                                title: "SAT/GRE",
                                desc: "Amerika universitetlərinə qəbul imtahanlarına hazırlıq",
                                color: "orange",
                            },
                            {
                                title: "Preschool",
                                desc: "3-6 yaş uşaqlar üçün erkən inkişaf proqramları",
                                color: "pink",
                            },
                        ].map((program, i) => (
                            <motion.div
                                key={program.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`bg-gray-800 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2 border-b-4 border-${program.color}-600`}
                            >
                                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                                <p className="text-gray-300 mb-4">{program.desc}</p>
                                <Link
                                    href="#"
                                    className={`text-${program.color}-400 flex items-center text-sm font-medium hover:underline`}
                                >
                                    <span>Ətraflı məlumat</span>
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <motion.div
                className="py-24 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Uğurlu gələcəyiniz üçün bizə qoşulun</h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        İngla School-da sizin üçün ən uyğun təhsil proqramı haqqında məlumat almaq üçün bizimlə əlaqə saxlayın
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
                            Bizə Zəng Edin
                        </Button>
                        <Button size="lg" className="bg-indigo-700 hover:bg-indigo-800">
                            Email Göndərin
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}