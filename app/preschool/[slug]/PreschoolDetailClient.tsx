"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { SanityPreschoolServiceItem, PreschoolServiceItem } from "@/types/preschool";
import RegistrationModal from "@/components/RegistrationModal";

interface Props {
    slug: string;
    initialData: SanityPreschoolServiceItem;
}

const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            return (
                <div className="relative w-full h-[400px] my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                    <Image src={urlFor(value).url()} alt={value.alt || ""} fill className="object-cover" />
                </div>
            );
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900 dark:text-white leading-tight">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-slate-900 dark:text-white leading-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white leading-tight">{children}</h3>,
        normal: ({ children }) => <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-slate-700 dark:text-slate-300 bg-primary/5 py-4 pr-4 rounded-r-lg">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg marker:text-primary">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 dark:text-slate-400 text-lg">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => (
            <a href={value?.href} rel="noreferrer noopener" className="text-primary hover:underline font-medium">{children}</a>
        ),
    },
};

function transform(s: SanityPreschoolServiceItem): PreschoolServiceItem {
    return {
        id: s._id,
        title: s.title,
        slug: s.slug?.current || "",
        shortDescription: s.shortDescription,
        fullDescription: s.fullDescription,
        featuredImage: s.featuredImage ? urlFor(s.featuredImage).width(1200).height(800).quality(90).url() : "/assets/bg.webp",
        gallery: s.gallery?.map(img => ({
            url: urlFor(img.asset).width(800).height(600).quality(85).url(),
            alt: img.alt,
            caption: img.caption,
        })),
        keyFeatures: s.keyFeatures,
        targetAgeGroup: s.targetAgeGroup,
        duration: s.duration,
        priceRange: s.priceRange,
        contactInfo: s.contactInfo,
        scheduleInfo: s.scheduleInfo,
        requirements: s.requirements,
        activities: s.activities,
        learningOutcomes: s.learningOutcomes,
        order: s.order,
        isFeatured: s.isFeatured,
        seoTitle: s.seoTitle,
        seoDescription: s.seoDescription,
    };
}

export default function PreschoolDetailClient({ initialData }: Props) {
    const service = transform(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-20">

            {/* ── PAGE HEADER ── */}
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-900">
                <Image
                    src={service.featuredImage}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 pb-16">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-5">
                            <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link href="/preschool" className="hover:text-primary transition-colors">Preschool</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary line-clamp-1">{service.title}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                                <span className="material-symbols-outlined text-[14px]">child_care</span>
                                Preschool
                            </span>
                            {service.targetAgeGroup && (
                                <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-bold rounded-full">{service.targetAgeGroup}</span>
                            )}
                            {service.isFeatured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-slate-900 text-xs font-bold uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">star</span>Populyar
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
                            {service.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                {/* ── LEFT: main content ── */}
                <div className="lg:col-span-2 flex flex-col gap-10">

                    {/* About */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">info</span>
                            Xidmət Haqqında
                        </h2>
                        {service.shortDescription && (
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                                {service.shortDescription}
                            </p>
                        )}
                        {service.fullDescription && (
                            <>
                                <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-8" />
                                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-primary">
                                    <PortableText value={service.fullDescription} components={portableTextComponents} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Key Features */}
                    {service.keyFeatures && service.keyFeatures.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                                Əsas Xüsusiyyətlər
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.keyFeatures.map((f, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                        <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">star</span>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm">{f.feature}</p>
                                            {f.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Activities */}
                    {service.activities && service.activities.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">sports_esports</span>
                                Fəaliyyətlər
                            </h2>
                            <div className="flex flex-col gap-3">
                                {service.activities.map((a, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-xl border-l-4 border-primary bg-slate-50 dark:bg-slate-800/50">
                                        <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">play_circle</span>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm">{a.activity}</p>
                                            {a.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{a.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Learning Outcomes */}
                    {service.learningOutcomes && service.learningOutcomes.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">emoji_events</span>
                                Öyrənmə Nəticələri
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {service.learningOutcomes.map((o, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">check</span>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">{o}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {service.gallery && service.gallery.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Qalereya</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setLightboxIdx(idx)}
                                        className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-800 cursor-zoom-in"
                                    >
                                        <Image src={img.url} alt={img.alt || `Gallery ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">zoom_in</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lightbox */}
                    {lightboxIdx !== null && service.gallery && (
                        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxIdx(null)}>
                            <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" onClick={() => setLightboxIdx(null)}>
                                <span className="material-symbols-outlined text-[28px]">close</span>
                            </button>
                            {lightboxIdx > 0 && (
                                <button className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}>
                                    <span className="material-symbols-outlined text-[28px]">chevron_left</span>
                                </button>
                            )}
                            <div className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                <Image src={service.gallery[lightboxIdx].url} alt={service.gallery[lightboxIdx].alt || `Image ${lightboxIdx + 1}`} width={1200} height={800} className="object-contain w-full h-full max-h-[85vh]" />
                                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{lightboxIdx + 1} / {service.gallery.length}</div>
                            </div>
                            {lightboxIdx < service.gallery.length - 1 && (
                                <button className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}>
                                    <span className="material-symbols-outlined text-[28px]">chevron_right</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* ── RIGHT: sidebar ── */}
                <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">

                    {/* Details card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Xidmət Detalları</h3>
                        <ul className="space-y-4 mb-8">
                            {[
                                service.duration      && { icon: "schedule",       label: "Müddət",       value: service.duration },
                                service.targetAgeGroup && { icon: "child_care",    label: "Yaş Qrupu",    value: service.targetAgeGroup },
                                service.priceRange    && { icon: "payments",       label: "Qiymət",       value: service.priceRange },
                                service.scheduleInfo  && { icon: "calendar_month", label: "Qrafik",       value: service.scheduleInfo },
                            ].filter(Boolean).map((item: any) => (
                                <li key={item.label} className="flex items-start gap-4">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{item.label}</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{item.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-primary text-slate-900 py-4 rounded-xl font-bold text-lg hover:brightness-105 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2"
                        >
                            Qeydiyyatdan Keç
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    {/* Requirements */}
                    {service.requirements && service.requirements.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">checklist</span>
                                Tələblər
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {service.requirements.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-primary text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact card */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                        <h3 className="text-lg font-bold mb-2 relative z-10">Sualınız var?</h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10">Proqramlarımızla bağlı hər hansı sualınız varsa, mütəxəssislərimiz hazırdır.</p>
                        <div className="flex flex-col gap-3 relative z-10">
                            <a href="tel:+994103107117" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-primary">call</span>
                                +994 10 310 71 17
                            </a>
                            <a href="https://wa.me/994103107117" className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] p-3 rounded-lg transition-colors text-sm font-medium">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5C10 9.5 9.4 8 9.3 7.8c-.2-.2-.4-.2-.6-.2h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1 1.3.8 2.5 1.6 3.4 1 1.1 2.2 2 3.5 2.7 1.3.7 2.8 1.2 4.2 1.2.9.1 1.9-.2 2.6-.8.4-.3.7-.7.9-1.2.1-.2.1-.4.1-.6 0-.1-.1-.1-.3-.2M12 20.3c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.2-1.2-2.7-1.2-4.2 0-4.6 3.7-8.3 8.3-8.3 4.6 0 8.3 3.7 8.3 8.3S16.6 20.3 12 20.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                                WhatsApp ilə yaz
                            </a>
                            <Link href="/contact" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                Əlaqə Formu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceTitle={service.title} />
        </div>
    );
}
