"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem, ServiceItem } from "@/types/services";

interface ServicesPageProps {
    initialServicesData?: SanityServiceItem[];
}

const transformSanityData = (sanityItems: SanityServiceItem[]): ServiceItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.title)
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
            features: (item as any).features,
            order: item.order || 0,
            active: item.isActive !== false, isFeatured: (item as any).isFeatured || false,
            // Fallbacks for missing fields since we don't know the exact schema
            category: (item as any).category || 'General',
            price: (item as any).price || '',
            duration: (item as any).duration || '',
            level: (item as any).level || '',
        }));
};

const FALLBACK_SERVICES: ServiceItem[] = [
    { id: "f1", title: "İngilis Dili Kursları", slug: "", shortDescription: "Başlanğıc səviyyədən C1-ə qədər bütün səviyyələr üçün intensiv dil proqramları.", featuredImage: "/assets/bg.webp", order: 1, isFeatured: true, category: "Dil Kursları", duration: "3–12 ay" },
    { id: "f2", title: "IELTS & SAT Hazırlığı", slug: "", shortDescription: "Beynəlxalq imtahanlara hədəfli hazırlıq — yüksək bal, qısa müddət.", featuredImage: "/assets/bg.webp", order: 2, isFeatured: false, category: "İmtahan Hazırlığı", duration: "2–4 ay" },
    { id: "f3", title: "Xaricdə Təhsil", slug: "/studyabroad", shortDescription: "Dünyanın 50+ aparıcı universitetinə qəbul, viza dəstəyi və tam müşayiət.", featuredImage: "/assets/bg.webp", order: 3, isFeatured: false, category: "Xaricdə Təhsil", duration: "Fərdi" },
    { id: "f4", title: "Preschool", slug: "/preschool", shortDescription: "3–6 yaş uşaqlar üçün erkən inkişaf, ingilis dili və yaradıcı fəaliyyət proqramları.", featuredImage: "/assets/bg.webp", order: 4, isFeatured: false, category: "Preschool", duration: "İllik" },
    { id: "f5", title: "Təlim Mərkəzi", slug: "/training-center", shortDescription: "Korporativ müştərilər və peşəkarlar üçün ixtisaslaşmış sertifikat proqramları.", featuredImage: "/assets/bg.webp", order: 5, isFeatured: false, category: "Biznes Təlimi", duration: "1–3 ay" },
    { id: "f6", title: "Korporativ Həllər", slug: "/training-center", shortDescription: "Şirkətinizin ehtiyaclarına uyğun qrup təlimlər — ofisdə və ya online format.", featuredImage: "/assets/bg.webp", order: 6, isFeatured: false, category: "Korporativ", duration: "Fərdi" },
];

export default function ServicesPage({ initialServicesData }: ServicesPageProps) {
    const [services, setServices] = useState<ServiceItem[]>(initialServicesData ? transformSanityData(initialServicesData) : []);
    const [isLoading, setIsLoading] = useState(!initialServicesData?.length);

    useEffect(() => {
        if (initialServicesData?.length) {
            setServices(transformSanityData(initialServicesData));
            setIsLoading(false);
            return;
        }
        client.fetch<SanityServiceItem[]>(SERVICES_QUERY)
            .then(data => { if (data?.length) setServices(transformSanityData(data)); })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [initialServicesData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Page Header */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary">Tədris İstiqamətləri</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="material-symbols-outlined text-[14px]">school</span>
                                Peşəkar Təhsil
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                Tədris İstiqamətləri
                            </h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Uşaqlardan yetkinlərə qədər hər kəs üçün — dil kurslarından beynəlxalq imtahan hazırlığına, preschooldan korporativ təlimlərə qədər geniş proqram seçimi.
                            </p>
                        </div>

                        {/* Quick stats */}
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            {[
                                { value: "6+", label: "Proqram" },
                                { value: "5000+", label: "Tələbə" },
                                { value: "98%", label: "Məmnuniyyət" },
                            ].map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <p className="text-2xl font-black text-primary leading-none">{value}</p>
                                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(services.length > 0 ? services : FALLBACK_SERVICES).map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={service.featuredImage || "/assets/bg.webp"}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        {service.category && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                {service.category}
                                            </span>
                                        )}
                                        {service.isFeatured && (
                                            <span className="absolute top-3 right-3 px-2 py-1 bg-slate-900/80 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">star</span>
                                                Seçilmiş
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col gap-3 p-6 grow">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {service.shortDescription}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                                            {service.duration && (
                                                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                                                    {service.duration}
                                                </span>
                                            )}
                                            {service.priceRange && (
                                                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">payments</span>
                                                    {service.priceRange}
                                                </span>
                                            )}
                                            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                Ətraflı <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Call to Action */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
                <div className="bg-primary rounded-[2rem] p-8 md:p-16 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-md">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Bu gün təhsil səyahətinizə başlayın</h2>
                        <p className="text-slate-800 font-medium">Bilik və inkişaf dolu icmamıza qoşulun, ən son xəbərlərdən və təhsil fürsətlərindən xəbərdar olun.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input className="px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-slate-900 min-w-[280px] text-slate-900 outline-none" placeholder="E-poçt ünvanınız" type="email" />
                        <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors">Abunə Ol</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
