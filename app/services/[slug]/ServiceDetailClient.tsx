"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem, ServiceItem } from "@/types/services";
import RegistrationModal from "@/components/RegistrationModal";

interface ServiceDetailClientProps {
    slug: string;
    initialServiceData?: SanityServiceItem;
}

// Portable text components configuration
const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            return (
                <div className="relative w-full h-[400px] my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Service Image'}
                        fill
                        className="object-cover"
                    />
                    {value.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm">
                            <p className="text-sm text-white text-center">
                                {value.caption}
                            </p>
                        </div>
                    )}
                </div>
            );
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900 dark:text-white leading-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-slate-900 dark:text-white leading-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white leading-tight">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white leading-tight">{children}</h4>,
        normal: ({ children }) => <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-slate-700 dark:text-slate-300 bg-primary/5 py-4 pr-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg marker:text-primary">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg marker:text-primary font-bold">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary hover:underline font-medium transition-colors">
                    {children}
                </a>
            );
        },
    },
};

// Transform Sanity data to our app's interface
const transformSanityData = (sanityItem: SanityServiceItem): ServiceItem => {
    return {
        id: sanityItem._id,
        title: sanityItem.title,
        slug: sanityItem.slug?.current || '',
        shortDescription: sanityItem.shortDescription,
        fullDescription: sanityItem.fullDescription,
        featuredImage: sanityItem.featuredImage ? urlFor(sanityItem.featuredImage).width(1200).height(800).quality(90).url() : '/assets/bg.webp',
        gallery: sanityItem.gallery?.map(img => ({
            url: urlFor(img.asset).width(800).height(600).quality(85).url(),
            alt: img.alt,
            caption: img.caption,
        })),
        order: sanityItem.order || 0,
        isFeatured: sanityItem.isFeatured || false,
        duration: sanityItem.duration || 'Göstərilməyib',
        priceRange: sanityItem.priceRange || 'Müraciət edin',
        scheduleInfo: sanityItem.scheduleInfo || 'Müraciət edin',
    };
};

export default function ServiceDetailClient({ slug, initialServiceData }: ServiceDetailClientProps) {
    const [service, setService] = useState<ServiceItem | null>(null);
    const [isLoading, setIsLoading] = useState(!initialServiceData);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadService = async () => {
            try {
                if (initialServiceData && initialServiceData.title) {
                    if (isMounted) {
                        setService(transformSanityData(initialServiceData));
                        setIsLoading(false);
                    }
                    return;
                }

                const data = await client.fetch<SanityServiceItem>(SERVICE_BY_SLUG_QUERY, { slug });

                if (isMounted) {
                    if (data && data.title) {
                        setService(transformSanityData(data));
                    } else {
                        setError("Xidmət tapılmadı");
                    }
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Error fetching service data:", err);
                if (isMounted) {
                    setError("Məlumatları yükləyərkən xəta baş verdi");
                    setIsLoading(false);
                }
            }
        };

        loadService();

        return () => {
            isMounted = false;
        };
    }, [initialServiceData, slug]);

    if (isLoading) {
        return (
            <div className="flex-1 min-h-screen bg-background-light dark:bg-background-dark flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="flex-1 min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center text-center px-4">
                <span className="material-symbols-outlined text-6xl text-slate-400 mb-6">error_outline</span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {error || "Səhifə Tapılmadı"}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Axtardığınız xidmət mövcud deyil və ya silinib.
                </p>
                <Link href="/services" className="bg-primary text-background-dark px-8 py-3 rounded-lg font-bold hover:brightness-105 transition-all">
                    Xidmətlərə Qayıt
                </Link>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-900">
                <Image
                    src={service.featuredImage}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>

                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 pb-16">
                        <Link
                            href="/services"
                            className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-primary transition-colors mb-6 group"
                        >
                            <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Bütün Xidmətlər
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            {service.isFeatured && (
                                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">star</span> Populyar
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
                            {service.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-sm mb-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">info</span>
                            Xidmət Haqqında
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                            {service.shortDescription}
                        </p>

                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-8"></div>

                        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-yellow-600 prose-img:rounded-xl">
                            {service.fullDescription ? (
                                <PortableText
                                    value={service.fullDescription}
                                    components={portableTextComponents}
                                />
                            ) : (
                                <p>Bu xidmət barədə ətraflı məlumat tezliklə əlavə olunacaq.</p>
                            )}
                        </div>
                    </div>

                    {/* Gallery if exists */}
                    {service.gallery && service.gallery.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-6">Qalereya</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.gallery.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-800">
                                        <Image
                                            src={img.url}
                                            alt={img.alt || `Gallery image ${idx}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Xidmət Detalları</h3>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Müddət</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{service.duration}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Qiymət</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{service.priceRange}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Qrafik</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{service.scheduleInfo}</p>
                                </div>
                            </li>
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-primary text-background-dark py-4 rounded-xl font-bold text-lg hover:brightness-105 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 cursor-pointer"
                        >
                            Qeydiyyatdan Keç
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold mb-2 relative z-10">Sualınız var?</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">
                            Proqramlarımızla bağlı hər hansı sualınız varsa, mütəxəssislərimiz sizə kömək etməyə hazırdır.
                        </p>
                        <div className="flex flex-col gap-3 relative z-10">
                            <a href="tel:+994103107117" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-primary">call</span>
                                +994 10 310 71 17
                            </a>
                            <a href="https://wa.me/994103107117" className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] p-3 rounded-lg transition-colors text-sm font-medium">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5C10 9.5 9.4 8 9.3 7.8c-.2-.2-.4-.2-.6-.2h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1 1.3.8 2.5 1.6 3.4 1 1.1 2.2 2 3.5 2.7 1.3.7 2.8 1.2 4.2 1.2.9.1 1.9-.2 2.6-.8.4-.3.7-.7.9-1.2.1-.2.1-.4.1-.6 0-.1-.1-.1-.3-.2M12 20.3c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.2-1.2-2.7-1.2-4.2 0-4.6 3.7-8.3 8.3-8.3 4.6 0 8.3 3.7 8.3 8.3S16.6 20.3 12 20.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                                WhatsApp ilə yaz
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={service.title}

            />
        </div>
    );
}
