// components/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <footer className="relative bg-black border-t border-gray-800">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="pt-16 pb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Information */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <Link href="/" className="inline-block mb-6 group">
                                <div className="flex items-center">
                                    <div className="relative h-12 w-12 mr-3">
                                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 h-full w-full rounded-full shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40 transition-all duration-300"></div>
                                        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                                            <span className="text-yellow-500 font-bold text-sm">İS</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                                        İngla School
                                    </span>
                                </div>
                            </Link>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri təqdim edirik.
                                Beynəlxalq standartlarda keyfiyyətli təhsil xidmətləri.
                            </p>
                            <div className="flex space-x-4">
                                {[
                                    { icon: Facebook, href: "#", label: "Facebook" },
                                    { icon: Instagram, href: "#", label: "Instagram" },
                                    { icon: Twitter, href: "#", label: "Twitter" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="group p-2 rounded-full bg-gray-800 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110"
                                        aria-label={label}
                                    >
                                        <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-white text-lg font-semibold mb-6 relative">
                                Əsas Səhifələr
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500 mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: "Tədris İstiqamətləri", href: "/xidmetler" },
                                    { name: "Haqqımızda", href: "/haqqimizda" },
                                    { name: "Xaricdə Təhsil", href: "/xaricde-tehsil" },
                                    { name: "Preschool", href: "/preschool" },
                                    { name: "Təlim Mərkəzi", href: "/telim-merkezi" },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-white text-lg font-semibold mb-6 relative">
                                Əlaqə Məlumatları
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500 mt-2"></div>
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3 text-gray-400 group">
                                    <MapPin size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="block">Bakı ş. Nizami rayonu</span>
                                        <span className="block">Qara Qarayev pr., 34</span>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone size={18} className="text-yellow-500 flex-shrink-0" />
                                    <a
                                        href="tel:+994503001234"
                                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                                    >
                                        +994 50 300 12 34
                                    </a>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Mail size={18} className="text-yellow-500 flex-shrink-0" />
                                    <a
                                        href="mailto:info@inglaschool.az"
                                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                                    >
                                        info@inglaschool.az
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Working Hours */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-white text-lg font-semibold mb-6 relative">
                                İş Saatları
                                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500 mt-2"></div>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Clock size={18} className="text-yellow-500" />
                                    <span className="text-gray-300 font-medium">Əmək vaxtı</span>
                                </div>
                                <ul className="space-y-3 text-gray-400 ml-7">
                                    <li className="flex justify-between items-center p-2 rounded bg-gray-900/50">
                                        <span>Həftəiçi:</span>
                                        <span className="text-yellow-500 font-medium">09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between items-center p-2 rounded bg-gray-900/50">
                                        <span>Şənbə:</span>
                                        <span className="text-yellow-500 font-medium">10:00 - 16:00</span>
                                    </li>
                                    <li className="flex justify-between items-center p-2 rounded bg-gray-900/50">
                                        <span>Bazar:</span>
                                        <span className="text-red-400 font-medium">Bağlıdır</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-800 py-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} İngla School. Bütün hüquqlar qorunur.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                href="/privacy"
                                className="text-gray-500 hover:text-yellow-500 text-sm transition-colors duration-300"
                            >
                                Məxfilik siyasəti
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-500 hover:text-yellow-500 text-sm transition-colors duration-300"
                            >
                                İstifadə şərtləri
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-gray-500 hover:text-yellow-500 text-sm transition-colors duration-300"
                            >
                                Cookie siyasəti
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        </footer>
    );
}