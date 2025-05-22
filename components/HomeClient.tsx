"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, GraduationCap, Globe, Lightbulb, BookOpen, Users } from "lucide-react";
import Carousel from "./Carousel";

const carouselItems = [
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



export default function Home() {
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



    return (
        <div ref={containerRef} className="relative min-h-screen  text-white">
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

                {/* Bottom fade for hero section */}
                <div className="absolute bottom-0 left-0 right-0 h-24  "></div>
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

                    <Carousel
                        items={carouselItems}
                        autoPlay={true}
                        autoPlayInterval={6000}
                        showControls={true}
                        showIndicators={true}
                        className="shadow-2xl shadow-yellow-900/20 border border-gray-800"
                    />
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


            {/* Contact CTA */}
            <motion.div
                className="py-24 bg-gradient-to-r  relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                {/* Yellow accent lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Uğurlu gələcəyiniz üçün <span className="text-yellow-500">bizə qoşulun</span>
                    </h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-200">
                        İngla School-da sizin üçün ən uyğun təhsil proqramı haqqında məlumat almaq üçün bizimlə əlaqə saxlayın
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 shadow-lg">
                            Bizə Zəng Edin
                        </Button>
                        <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20">
                            Email Göndərin
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}