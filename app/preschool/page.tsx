"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRESCHOOL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem, PreschoolServiceItem } from "@/types/preschool";

const transformSanityData = (sanityItems: SanityPreschoolServiceItem[]): PreschoolServiceItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.title && item.shortDescription)
        .map((item) => ({
            id: item._id,
            title: item.title,
            slug: item.slug?.current || '',
            shortDescription: item.shortDescription,
            fullDescription: item.fullDescription,
            featuredImage: item.featuredImage ? urlFor(item.featuredImage).width(600).height(400).quality(85).url() : '/assets/bg.webp',
            gallery: item.gallery?.map(img => ({
                url: urlFor(img.asset).width(800).height(600).quality(85).url(),
                alt: img.alt,
                caption: img.caption,
            })),
            keyFeatures: item.keyFeatures,
            targetAgeGroup: item.targetAgeGroup,
            duration: item.duration,
            priceRange: item.priceRange,
            contactInfo: item.contactInfo,
            scheduleInfo: item.scheduleInfo,
            requirements: item.requirements,
            activities: item.activities,
            learningOutcomes: item.learningOutcomes,
            order: item.order,
            isFeatured: item.isFeatured,
            seoTitle: item.seoTitle,
        }));
};

export default function PreschoolPage() {
    const [services, setServices] = useState<PreschoolServiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadServices = async () => {
            try {
                const data = await client.fetch<SanityPreschoolServiceItem[]>(PRESCHOOL_SERVICES_QUERY);

                if (isMounted) {
                    if (data && data.length > 0) {
                        setServices(transformSanityData(data));
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching preschool services data:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        loadServices();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Hero Section */}
            <section className="px-6 md:px-20 lg:px-40 py-10">
                <div className="relative overflow-hidden rounded-3xl bg-primary/10 border-4 border-primary/20">
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="p-8 md:p-16 flex flex-col gap-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/30 text-background-dark text-xs font-bold uppercase tracking-wider w-fit">
                                Yeni Qəbul Davam Edir
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                                Öyrənmə və <span className="text-primary underline decoration-background-dark/20">Kəşf Etmə</span> Yeri
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md">
                                Uşağınızın sosial, emosional və idrak inkişafını təmin edən, oyun əsaslı təlim mühiti. Ingla School Preschool ilə gələcəyə inamlı addımlar atın.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <button className="bg-background-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
                                    Qeydiyyat <span className="material-symbols-outlined">calendar_today</span>
                                </button>
                                <button className="bg-white border-2 border-primary text-background-dark px-8 py-4 rounded-2xl font-bold hover:bg-primary/10 transition-colors">
                                    Tədris Proqramımız
                                </button>
                            </div>
                        </div>
                        <div className="h-80 lg:h-full relative min-h-[400px]">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="px-6 md:px-20 lg:px-40 -mt-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-primary/10 text-center transform hover:-translate-y-1 transition-transform">
                        <p className="text-primary font-black text-3xl">1:6</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Müəllim Nisbəti</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-primary/10 text-center transform hover:-translate-y-1 transition-transform">
                        <p className="text-primary font-black text-3xl">100%</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Təhlükəsiz Mühit</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-primary/10 text-center transform hover:-translate-y-1 transition-transform">
                        <p className="text-primary font-black text-3xl">15+</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">İllik Təcrübə</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-primary/10 text-center transform hover:-translate-y-1 transition-transform">
                        <p className="text-primary font-black text-3xl">8</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Geniş Otaq</p>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="px-6 md:px-20 lg:px-40 py-20" id="programs">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h3 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Bizim Proqramlar</h3>
                        <h2 className="text-3xl md:text-4xl font-extrabold">Hər Yaş Üçün Xüsusi Yanaşma</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xs italic text-sm">
                        "Erkən uşaqlıq təhsilinin məqsədi uşağın öz təbii öyrənmə istəyini aktivləşdirmək olmalıdır."
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.length > 0 ? services.map((service) => (
                            <div key={service.id} className={`group rounded-3xl p-8 border transition-all shadow-sm hover:shadow-xl ${service.isFeatured ? 'bg-background-dark text-white border-background-dark shadow-primary/10' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary text-slate-900 dark:text-white'}`}>
                                <div className={`${service.isFeatured ? 'bg-primary text-background-dark' : 'bg-primary/20 text-primary'} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                                    <span className="material-symbols-outlined text-4xl">{service.isFeatured ? 'brush' : 'child_care'}</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                                <p className={`${service.isFeatured ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'} text-sm leading-relaxed mb-6 line-clamp-3`}>{service.shortDescription}</p>

                                {service.keyFeatures && service.keyFeatures.length > 0 && (
                                    <ul className="space-y-3 mb-8">
                                        {service.keyFeatures.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm font-medium">
                                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                                {feature.feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Link href={`/preschool/${service.slug}`} className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                                    Ətraflı Məlumat <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        )) : (
                            // Fallback dummy items
                            <>
                                <div className="group bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm hover:shadow-xl">
                                    <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-4xl">child_care</span>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">Erkən Kəşflər</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">Mühiti kəşf etmə, ilkin dil bacarıqları və sosial davranışların formalaşdırılmasına fokuslanan xüsusi proqram.</p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Motor bacarıqları</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Sensorial oyunlar</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Nağıl vaxtı</li>
                                    </ul>
                                </div>
                                <div className="group bg-background-dark text-white rounded-3xl p-8 border border-background-dark hover:shadow-2xl hover:shadow-primary/10 transition-all">
                                    <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-background-dark group-hover:rotate-12 transition-transform">
                                        <span className="material-symbols-outlined text-4xl">brush</span>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">Preschool Tədqiqatçıları</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">Strukturlaşdırılmış oyunlar, komanda işləri və yaradıcı sənət vasitəsilə erkən savadlılığın əsaslarının qoyulması.</p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Erkən savadlılıq</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> İncəsənət və Musiqi</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Məntiq oyunları</li>
                                    </ul>
                                </div>
                                <div className="group bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm hover:shadow-xl">
                                    <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">Məktəbəqədər Hazırlıq</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">Uşaqları ilkin riyazi düşüncə, oxuma vərdişləri və problem həlletmə qabiliyyətləri ilə məktəbə hazırlamaq.</p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> STEM fəaliyyətləri</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Fonetika proqramı</li>
                                        <li className="flex items-center gap-2 text-sm font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Sərbəst düşüncə</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </section>

            {/* Schedule & Facilities */}
            <section className="bg-white dark:bg-background-dark/30 py-20 px-6 md:px-20 lg:px-40" id="schedule">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Daily Schedule */}
                    <div>
                        <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">schedule</span> Gündəlik Qrafik
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center bg-background-light dark:bg-slate-800 p-4 rounded-2xl border-l-4 border-primary">
                                <span className="text-sm font-bold w-24 text-slate-500">08:30 AM</span>
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="font-bold">Qarşılanma və Səhər Dairəsi</span>
                            </div>
                            <div className="flex gap-4 items-center p-4">
                                <span className="text-sm font-bold w-24 text-slate-500">09:15 AM</span>
                                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                <span className="font-medium">Yaradıcı İncəsənət və Oyunlar</span>
                            </div>
                            <div className="flex gap-4 items-center p-4">
                                <span className="text-sm font-bold w-24 text-slate-500">10:30 AM</span>
                                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                <span className="font-medium">Həyətdə Açıq Hava Fəaliyyəti</span>
                            </div>
                            <div className="flex gap-4 items-center bg-background-light dark:bg-slate-800 p-4 rounded-2xl border-l-4 border-primary">
                                <span className="text-sm font-bold w-24 text-slate-500">12:00 PM</span>
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="font-bold">Sağlam Qidalanma və Nahar</span>
                            </div>
                            <div className="flex gap-4 items-center p-4">
                                <span className="text-sm font-bold w-24 text-slate-500">01:30 PM</span>
                                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                <span className="font-medium">İstirahət və Sakit Oxuma Vaxtı</span>
                            </div>
                            <div className="flex gap-4 items-center p-4">
                                <span className="text-sm font-bold w-24 text-slate-500">03:30 PM</span>
                                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                <span className="font-medium">Musiqi və Günorta Qəlyanaltısı</span>
                            </div>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="space-y-10" id="facilities">
                        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-primary/20">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary">Açıq Məkan</p>
                                <p className="text-lg font-bold">Təhlükəsiz və Təbii Oyun Meydançası</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative rounded-2xl overflow-hidden aspect-square">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden aspect-square">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-20 lg:px-40 py-20">
                <div className="bg-primary rounded-3xl p-10 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full"></div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-background-dark max-w-2xl leading-tight">
                        Ingla School Preschool Ailəsinə Qoşulmağa Hazırsınız?
                    </h2>
                    <p className="text-background-dark/80 font-medium max-w-xl text-lg">
                        Növbəti tədris ili üçün qeydiyyatımız artıq başlayıb. Övladınızın təhsil məkanlarını şəxsən görmək üçün bu gün ekskursiya planlaşdırın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <button className="bg-background-dark text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform">
                            Müraciət Et
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
