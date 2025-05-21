'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types for our section data
interface SectionData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    // Ref for parallax sections
    const sectionsRef = useRef<HTMLDivElement>(null);

    // Handle parallax effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Main sections data
    const sections: SectionData[] = [
        {
            id: 'xidmetler',
            title: 'Xidmətlər',
            description: 'İngla School-da təqdim etdiyimiz müxtəlif təhsil xidmətləri ilə tanış olun.',
            imageUrl: '/images/services.jpg',
            link: '/xidmetler',
        },
        {
            id: 'haqqimizda',
            title: 'Haqqımızda',
            description: 'İngla School-un tarixi, missiyası və vizyonu haqqında ətraflı məlumat əldə edin.',
            imageUrl: '/images/about.jpg',
            link: '/haqqimizda',
        },
        {
            id: 'xaricde-tehsil',
            title: 'Xaricdə Təhsil',
            description: 'Xaricdə təhsil imkanları və proqramlarımız haqqında məlumat alın.',
            imageUrl: '/images/abroad.jpg',
            link: '/xaricde-tehsil',
        },
        {
            id: 'preschool',
            title: 'Preschool',
            description: 'Uşaqlar üçün erkən yaş təhsil proqramlarımız ilə tanış olun.',
            imageUrl: '/images/preschool.jpg',
            link: '/preschool',
        },
        {
            id: 'telim-merkezi',
            title: 'Təlim Mərkəzi',
            description: 'Peşəkar təlim və inkişaf proqramlarımız haqqında məlumat əldə edin.',
            imageUrl: '/images/training.jpg',
            link: '/telim-merkezi',
        },
    ];

    return (
        <>
            {/* Hero Section with Parallax Effect */}
            <section className="relative h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            İngla School
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8">
                            Azərbaycanda keyfiyyətli təhsil
                        </p>
                        <Link
                            href="#xidmetler"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
                        >
                            Daha Ətraflı
                        </Link>
                    </div>
                </div>
                <div
                    className="absolute inset-0 -z-10"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/hero-bg.jpg"
                            alt="İngla School"
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">İngla School-a Xoş Gəlmisiniz</h2>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 mb-8">
                            İngla School olaraq, biz tələbələrimizin potensialını üzə çıxarmaq və onların uğurlu gələcəyini təmin etmək üçün keyfiyyətli təhsil xidmətləri təqdim edirik. Müasir tədris metodlarımız və təcrübəli müəllim heyətimizlə tələbələrimizin akademik və şəxsi inkişafına dəstək oluruq.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Sections */}
            <div ref={sectionsRef}>
                {sections.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <div className="container mx-auto px-4">
                            <div
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                                style={{
                                    transform: sectionsRef.current
                                        ? `translateY(${Math.max(0, (scrollY - sectionsRef.current.offsetTop + 300) * 0.05)}px)`
                                        : 'none'
                                }}
                            >
                                <div className="w-full md:w-1/2">
                                    <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl">
                                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={section.imageUrl}
                                                alt={section.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                                    <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                                    <p className="text-lg text-gray-700 mb-6">
                                        {section.description}
                                    </p>
                                    <Link
                                        href={section.link}
                                        className="inline-flex items-center px-6 py-3 bg-black text-yellow-500 rounded-lg font-medium hover:bg-gray-900 transition duration-300"
                                    >
                                        Daha Ətraflı
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Call To Action Section */}
            <section className="relative py-20 overflow-hidden">
                <div
                    className="absolute inset-0 -z-10"
                    style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/cta-bg.jpg"
                            alt="Call to action background"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-black/70"></div>
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Təhsil gələcəyinizi bizimlə qurun
                        </h2>
                        <p className="text-lg text-gray-200 mb-8">
                            İngla School-un təqdim etdiyi imkanlardan yararlanmaq üçün bizimlə əlaqə saxlayın.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-medium transition duration-300"
                        >
                            Bizimlə Əlaqə
                        </Link>
                    </div>
                </div>
            </section>

            {/* Numbers/Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-yellow-500 mb-2">500+</div>
                            <p className="text-lg font-medium text-gray-800">Tələbə</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-yellow-500 mb-2">25+</div>
                            <p className="text-lg font-medium text-gray-800">Müəllim</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-yellow-500 mb-2">10+</div>
                            <p className="text-lg font-medium text-gray-800">İl Təcrübə</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-yellow-500 mb-2">15+</div>
                            <p className="text-lg font-medium text-gray-800">Proqram</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}