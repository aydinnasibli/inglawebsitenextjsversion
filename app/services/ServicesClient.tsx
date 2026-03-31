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

export default function ServicesPage({ initialServicesData }: ServicesPageProps) {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(!initialServicesData);

    useEffect(() => {
        let isMounted = true;

        const loadServices = async () => {
            try {
                if (initialServicesData && initialServicesData.length > 0) {
                    if (isMounted) {
                        setServices(transformSanityData(initialServicesData));
                        setIsLoading(false);
                    }
                    return;
                }

                const data = await client.fetch<SanityServiceItem[]>(SERVICES_QUERY);

                if (isMounted) {
                    if (data && data.length > 0) {
                        setServices(transformSanityData(data));
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching services data:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        loadServices();

        return () => {
            isMounted = false;
        };
    }, [initialServicesData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Hero Section */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <div className="flex flex-col gap-4">
                            <span className="inline-block px-3 py-1 bg-primary/20 text-slate-900 dark:text-primary text-xs font-bold uppercase tracking-widest rounded-full w-fit">
                                Peşəkar Təhsil
                            </span>
                            <h1 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                                Gələcəyiniz üçün <span className="text-primary bg-slate-900 px-2 dark:bg-transparent">Doğru Seçim</span>
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
                                Ingla School olaraq uşaqlardan yetkinlərə qədər hər kəs üçün fərdiləşdirilmiş və beynəlxalq standartlara uyğun təhsil proqramları təklif edirik.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-slate-900 text-base font-bold hover:shadow-lg transition-all">
                                İndi Müraciət Et
                            </button>
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Bütün Proqramlar
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
                            <Image
                                src="/assets/bg.webp"
                                alt="Students learning"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl -z-0"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-primary rounded-full -z-0"></div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="bg-white dark:bg-slate-900/50 py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="flex flex-col gap-4 mb-12">
                        <h2 className="text-primary font-bold text-sm tracking-widest uppercase">Təkliflərimiz</h2>
                        <h3 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                            Hər Yaş və Səviyyə üçün Kompleks Təhsil Həlləri
                        </h3>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.length > 0 ? services.map((service, index) => {
                                // Default icon logic based on category/title
                                let iconName = "workspace_premium";
                                const title = service.title.toLowerCase();
                                if (title.includes('dil') || title.includes('language')) iconName = "language";
                                else if (title.includes('xaric')) iconName = "public";
                                else if (title.includes('preschool') || title.includes('uşaq')) iconName = "child_care";
                                else if (title.includes('təlim') || title.includes('biznes')) iconName = "business_center";
                                else if (title.includes('imtahan')) iconName = "history_edu";

                                return (
                                    <div key={service.id} className="group flex flex-col gap-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm hover:shadow-md">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">{iconName}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-slate-900 dark:text-white text-xl font-bold">{service.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                                {service.shortDescription}
                                            </p>
                                        </div>
                                        <Link href={`/services/${service.slug}`} className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Ətraflı Bax <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                );
                            }) : (
                                // Fallback services if CMS is empty
                                <>
                                    <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm hover:shadow-md">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">public</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-slate-900 dark:text-white text-xl font-bold">Xaricdə Təhsil</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                Dünyanın nüfuzlu universitetlərinə qəbul prosesində, viza dəstəyində və mədəniyyətə uyğunlaşmaqda mütəxəssis dəstəyi.
                                            </p>
                                        </div>
                                        <Link href="/studyabroad" className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Ətraflı Bax <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                    <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm hover:shadow-md">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">child_care</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-slate-900 dark:text-white text-xl font-bold">Preschool (Məktəbəqədər)</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                Uşaqların erkən yaşdan idrak, sosial bacarıqlarını və dünyagörüşünü inkişaf etdirən təhlükəsiz və əyləncəli mühit.
                                            </p>
                                        </div>
                                        <Link href="/preschool" className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Ətraflı Bax <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                    <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm hover:shadow-md">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                            <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-slate-900 dark:text-white text-xl font-bold">Təlim Mərkəzi</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                Müasir iş dünyasının tələblərinə uyğunlaşdırılmış, karyera inkişafı üçün nəzərdə tutulan peşəkar sertifikatlı təlimlər.
                                            </p>
                                        </div>
                                        <Link href="/training-center" className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Ətraflı Bax <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                </>
                            )}
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
