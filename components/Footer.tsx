// components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-8 md:mb-0"
                    >
                        <Link href="/" className="inline-block mb-6">
                            <div className="flex items-center">
                                <div className="relative h-10 w-10 mr-3">
                                    <div className="bg-indigo-600 h-full w-full rounded-full"></div>
                                    {/* Replace with your actual logo */}
                                </div>
                                <span className="text-xl font-bold text-white">İngla School</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri təqdim edirik.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white text-lg font-semibold mb-6">Əsas Səhifələr</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Xidmətlər", href: "/xidmetler" },
                                { name: "Haqqımızda", href: "/haqqimizda" },
                                { name: "Xaricdə Təhsil", href: "/xaricde-tehsil" },
                                { name: "Preschool", href: "/preschool" },
                                { name: "Təlim Mərkəzi", href: "/telim-merkezi" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white text-lg font-semibold mb-6">Əlaqə</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400">
                                <span className="block">Bakı ş. Nizami rayonu</span>
                                <span className="block">Qara Qarayev pr., 34</span>
                            </li>
                            <li>
                                <a href="tel:+994503001234" className="text-gray-400 hover:text-white transition-colors">
                                    +994 50 300 12 34
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@inglaschool.az" className="text-gray-400 hover:text-white transition-colors">
                                    info@inglaschool.az
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white text-lg font-semibold mb-6">İş saatları</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex justify-between">
                                <span>Həftəiçi:</span>
                                <span>09:00 - 18:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Şənbə:</span>
                                <span>10:00 - 16:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Bazar:</span>
                                <span>Bağlıdır</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {currentYear} İngla School. Bütün hüquqlar qorunur.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                                Məxfilik siyasəti
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                                İstifadə şərtləri
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}