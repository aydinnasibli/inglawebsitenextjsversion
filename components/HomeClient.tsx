// app/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Globe, BookOpen, Users, School } from 'lucide-react';

export default function Home() {
    // Hero section animation
    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            İngla School
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                            Azərbaycanda keyfiyyətli təhsil və xaricdə təhsil imkanları ilə gələcəyinizi formalaşdırın
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                Bizimlə əlaqə <ArrowRight size={18} />
                            </Link>
                            <Link href="/about" className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
                                Haqqımızda
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative element */}
                <div className="hidden md:block absolute bottom-0 right-0 w-1/3 h-3/4 bg-white/5 rounded-tl-full transform -translate-y-12"></div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Xidmətlərimiz</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">İngla School tərəfindən təqdim olunan müxtəlif təhsil xidmətləri ilə tanış olun</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service Card 1 */}
                        <Link href="/xidmetler" className="group">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition duration-300 h-full flex flex-col">
                                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                                    <BookOpen className="text-blue-600" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Təlim Mərkəzi</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Müxtəlif yaş qrupları üçün müasir tədris proqramları və fərdi yanaşma ilə keyfiyyətli təhsil.</p>
                                <div className="flex items-center text-blue-600 font-medium">
                                    <span>Ətraflı</span>
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        {/* Service Card 2 */}
                        <Link href="/xaricde-tehsil" className="group">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition duration-300 h-full flex flex-col">
                                <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                                    <Globe className="text-green-600" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">Xaricdə Təhsil</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Dünyanın aparıcı universitetlərində təhsil almaq üçün məsləhət və hazırlıq xidmətləri.</p>
                                <div className="flex items-center text-green-600 font-medium">
                                    <span>Ətraflı</span>
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        {/* Service Card 3 */}
                        <Link href="/preschool" className="group">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition duration-300 h-full flex flex-col">
                                <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                                    <School className="text-purple-600" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">Preschool</h3>
                                <p className="text-gray-600 mb-4 flex-grow">Uşaqların erkən yaşlardan inkişafı üçün xüsusi hazırlanmış məktəbəqədər təhsil proqramları.</p>
                                <div className="flex items-center text-purple-600 font-medium">
                                    <span>Ətraflı</span>
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/xidmetler" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                            <span>Bütün xidmətlərimizlə tanış olun</span>
                            <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="mb-6">
                                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">Haqqımızda</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">İngla School - Keyfiyyətli təhsil, parlaq gələcək</h2>
                            <p className="text-gray-600 mb-8">
                                İngla School 2012-ci ildən etibarən Azərbaycanda fəaliyyət göstərən aparıcı təhsil mərkəzidir. Bizim məqsədimiz tələbələrimizə yüksək keyfiyyətli təhsil verməklə onların potensialını üzə çıxarmaq və gələcək karyeralarına hazırlamaqdır.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                                        <GraduationCap className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Təcrübəli müəllimlər</h3>
                                        <p className="text-gray-600 text-sm">Sahələrində peşəkar olan müəllim heyəti</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                                        <Users className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Fərdi yanaşma</h3>
                                        <p className="text-gray-600 text-sm">Hər tələbəyə fərdi diqqət və qayğı</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/haqqimizda" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
                                Daha ətraflı <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                                {/* Placeholder for image - in production, replace with an actual image */}
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <span className="text-sm">İngla School Image</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-blue-600 rounded-lg p-6 text-white">
                                <p className="text-2xl font-bold">10+</p>
                                <p className="text-sm">İllik təcrübə</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Study Abroad Section */}
            <section id="study-abroad" className="py-20 px-4 md:px-6 lg:px-8 bg-indigo-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Xaricdə təhsil imkanları</h2>
                            <p className="text-lg opacity-90 mb-8">
                                Dünyanın ən nüfuzlu universitetlərində təhsil almaq üçün sizə dəstək oluruq. İngla School ilə xarici təhsil imkanlarını kəşf edin.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span>Sənədlərin hazırlanması və təqdim olunması</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span>Test hazırlığı (IELTS, TOEFL, SAT, GRE)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span>Təqaüd proqramlarına müraciət məsləhətləri</span>
                                </div>
                            </div>
                            <Link href="/xaricde-tehsil" className="bg-white text-indigo-900 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
                                Ətraflı məlumat <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-indigo-800 rounded-lg overflow-hidden">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                        <span className="text-sm">University Image 1</span>
                                    </div>
                                </div>
                                <div className="aspect-square bg-indigo-800 rounded-lg overflow-hidden mt-8">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                        <span className="text-sm">University Image 2</span>
                                    </div>
                                </div>
                                <div className="aspect-square bg-indigo-800 rounded-lg overflow-hidden">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                        <span className="text-sm">University Image 3</span>
                                    </div>
                                </div>
                                <div className="aspect-square bg-indigo-800 rounded-lg overflow-hidden mt-8">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                        <span className="text-sm">University Image 4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preschool Section */}
            <section id="preschool" className="py-20 px-4 md:px-6 lg:px-8 bg-yellow-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preschool Proqramı</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Uşaqların erkən yaşlardan inkişafı üçün xüsusi hazırlanmış məktəbəqədər təhsil proqramlarımız
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Erkən inkişaf</h3>
                            <p className="text-gray-600">2-4 yaşlı uşaqlar üçün oyun və inkişaf proqramları</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Məktəbəqədər</h3>
                            <p className="text-gray-600">4-6 yaşlı uşaqlar üçün məktəbə hazırlıq proqramları</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Dil inkişafı</h3>
                            <p className="text-gray-600">Uşaqlar üçün xüsusi dil öyrənmə proqramı</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/preschool" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
                            Preschool haqqında ətraflı <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Education Center */}
            <section id="education-center" className="py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-sm">Class Image 1</span>
                                    </div>
                                </div>
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mt-8">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-sm">Class Image 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="mb-6">
                                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Təlim Mərkəzi</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Müasir təlim metodları ilə biliklərinizi artırın
                            </h2>
                            <p className="text-gray-600 mb-8">
                                İngla School təlim mərkəzində müxtəlif fənlər üzrə keyfiyyətli dərslər təşkil edirik. Təcrübəli müəllimlərimiz və fərdi yanaşmamız ilə hər bir tələbənin uğur qazanmasına kömək edirik.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Xarici dil kursları</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Kompüter və rəqəmsal bacarıqlar</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">İmtahanlara hazırlıq</span>
                                </div>
                            </div>
                            <Link href="/telim-merkezi" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
                                Kurslarımızla tanış olun <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-blue-600 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Sizin üçün ən uyğun təhsil proqramını seçək</h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        İngla School-un peşəkar komandası ilə əlaqə saxlayaraq təhsil məqsədlərinizə uyğun proqram seçimində dəstək alın
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium transition-colors">
                            Bizə yazın
                        </Link>
                        <Link href="/about" className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors">
                            Haqqımızda ətraflı
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}