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
        <footer className="relative bg-black/60 backdrop-blur-md border-t border-white/5 pt-16 pb-8 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 right-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16"
                >
                    {/* Brand Column (4 cols) */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-8">
                        <Link href="/" className="inline-block mb-6 group">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40 transition-all duration-300">
                                    <span className="font-bold text-black text-xl">İS</span>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-yellow-200 transition-all duration-300">
                                    Ingla School
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri.
                            Bizimlə dünyanı kəşf edin və potensialınızı maksimuma çatdırın.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: "#", label: "Facebook" },
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Column (2 cols) */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-6">Menu</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Ana Səhifə", href: "/" },
                                { name: "Haqqımızda", href: "/about" },
                                { name: "Xidmətlər", href: "/services" },
                                { name: "Blog", href: "/blog" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-yellow-400 transition-colors inline-block hover:translate-x-1 duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Programs Column (3 cols) */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h3 className="text-white font-semibold mb-6">Proqramlar</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Xaricdə Təhsil", href: "/studyabroad" },
                                { name: "Preschool", href: "/preschool" },
                                { name: "Təlim Mərkəzi", href: "/training-center" },
                                { name: "Yay Məktəbi", href: "/services#summer-school" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-yellow-400 transition-colors inline-block hover:translate-x-1 duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Column (3 cols) */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h3 className="text-white font-semibold mb-6">Əlaqə</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                                <span>Grand Hayat Yaşayış Kompleksi<br />9-cu bina, 4-cü mərtəbə</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-yellow-500 shrink-0" />
                                <a href="tel:+994503001234" className="text-gray-400 hover:text-white transition-colors">
                                    +994 10 310 71 17
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-yellow-500 shrink-0" />
                                <a href="mailto:info@inglaschool.az" className="text-gray-400 hover:text-white transition-colors">
                                    info@inglaschool.az
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                                <span className="text-gray-400">B.e - Ş. 09:00 - 18:00</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500"
                >
                    <p>© {currentYear} Ingla School. Bütün hüquqlar qorunur.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-yellow-500 transition-colors">Məxfilik Siyasəti</Link>
                        <Link href="/terms" className="hover:text-yellow-500 transition-colors">İstifadə Şərtləri</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}