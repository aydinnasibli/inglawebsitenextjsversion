"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRESCHOOL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem, PreschoolServiceItem } from "@/types/preschool";

const transformSanityData = (sanityItems: SanityPreschoolServiceItem[]): PreschoolServiceItem[] =>
    sanityItems
        .filter(item => item && item._id)
        .map((item): PreschoolServiceItem | null => {
            try {
                return {
                    id: item._id,
                    title: item.title || '',
                    slug: item.slug?.current || '',
                    shortDescription: item.shortDescription || '',
                    fullDescription: item.fullDescription,
                    featuredImage: item.featuredImage
                        ? urlFor(item.featuredImage).width(640).height(420).quality(85).url()
                        : '/assets/bg.webp',
                    gallery: item.gallery
                        ?.filter(img => img?.asset)
                        .map(img => ({
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
                };
            } catch (e) {
                console.error(`Failed to transform preschool item ${item._id}:`, e);
                return null;
            }
        })
        .filter((item): item is PreschoolServiceItem => item !== null);

const FALLBACK_PROGRAMS: PreschoolServiceItem[] = [
    { id: "f1", title: "Erkən Kəşflər (3–4 yaş)", slug: "", shortDescription: "Mühiti kəşf etmə, ilkin dil bacarıqları və sosial davranışların formalaşdırılmasına fokuslanan xüsusi proqram.", featuredImage: "/assets/bg.webp", order: 1, isFeatured: false, targetAgeGroup: "3–4 yaş", duration: "İllik", keyFeatures: [{ feature: "Motor bacarıqları" }, { feature: "Sensorial oyunlar" }, { feature: "Nağıl vaxtı" }] },
    { id: "f2", title: "Preschool Tədqiqatçıları (4–5 yaş)", slug: "", shortDescription: "Strukturlaşdırılmış oyunlar, komanda işləri və yaradıcı sənət vasitəsilə erkən savadlılığın əsaslarının qoyulması.", featuredImage: "/assets/bg.webp", order: 2, isFeatured: true, targetAgeGroup: "4–5 yaş", duration: "İllik", keyFeatures: [{ feature: "Erkən savadlılıq" }, { feature: "İncəsənət və Musiqi" }, { feature: "Məntiq oyunları" }] },
    { id: "f3", title: "Məktəbəqədər Hazırlıq (5–6 yaş)", slug: "", shortDescription: "Uşaqları ilkin riyazi düşüncə, oxuma vərdişləri və problem həlletmə qabiliyyətləri ilə məktəbə hazırlamaq.", featuredImage: "/assets/bg.webp", order: 3, isFeatured: false, targetAgeGroup: "5–6 yaş", duration: "İllik", keyFeatures: [{ feature: "STEM fəaliyyətləri" }, { feature: "Fonetika proqramı" }, { feature: "Sərbəst düşüncə" }] },
];

interface Props {
    initialData?: SanityPreschoolServiceItem[];
}

export default function PreschoolClient({ initialData }: Props) {
    const [programs, setPrograms] = useState<PreschoolServiceItem[]>(
        initialData?.length ? transformSanityData(initialData) : []
    );
    const [isLoading, setIsLoading] = useState(!initialData?.length);

    useEffect(() => {
        if (initialData?.length) { setIsLoading(false); return; }
        client.fetch<SanityPreschoolServiceItem[]>(PRESCHOOL_SERVICES_QUERY)
            .then(d => { if (d?.length) setPrograms(transformSanityData(d)); })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [initialData]);

    const display = programs.length > 0 ? programs : FALLBACK_PROGRAMS;

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── PAGE HEADER ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary">Preschool</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="material-symbols-outlined text-[14px]">child_care</span>
                                Erkən Uşaqlıq Təhsili
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Preschool</h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                3–6 yaş uşaqlar üçün oyun əsaslı öyrənmə, ingilis dili və yaradıcı fəaliyyət proqramları. Uşağınızın inkişafının hər mərhələsinə uyğun xüsusi yanaşma.
                            </p>
                        </div>
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            {[
                                { value: "1:6", label: "Müəllim Nisbəti" },
                                { value: "3–6", label: "Yaş Qrupu" },
                                { value: "100%", label: "Təhlükəsiz Mühit" },
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

            {/* ── PROGRAMS GRID ── */}
            <section className="py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {display.map((program) => (
                                <Link
                                    key={program.id}
                                    href={program.slug ? `/preschool/${program.slug}` : "#"}
                                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={program.featuredImage || "/assets/bg.webp"}
                                            alt={program.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        {program.targetAgeGroup && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                {program.targetAgeGroup}
                                            </span>
                                        )}
                                        {program.isFeatured && (
                                            <span className="absolute top-3 right-3 px-2 py-1 bg-slate-900/80 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">star</span>
                                                Seçilmiş
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col gap-3 p-6 grow">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                            {program.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {program.shortDescription}
                                        </p>

                                        {program.keyFeatures && program.keyFeatures.length > 0 && (
                                            <ul className="flex flex-col gap-1.5 mt-1">
                                                {program.keyFeatures.slice(0, 3).map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                                        <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                                                        {f.feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                                            {program.duration && (
                                                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                                                    {program.duration}
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

            {/* ── DAILY SCHEDULE ── */}
            <section className="bg-white dark:bg-slate-900 py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Gündəlik Proqram</p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">Günlük Qrafik</h2>
                            <div className="flex flex-col gap-2">
                                {[
                                    { time: "08:30", label: "Qarşılanma və Səhər Dairəsi", highlighted: true },
                                    { time: "09:15", label: "Yaradıcı İncəsənət və Oyunlar", highlighted: false },
                                    { time: "10:30", label: "Açıq Hava Fəaliyyəti", highlighted: false },
                                    { time: "12:00", label: "Sağlam Qidalanma və Nahar", highlighted: true },
                                    { time: "01:30", label: "İstirahət və Sakit Oxuma Vaxtı", highlighted: false },
                                    { time: "03:30", label: "Musiqi və Günorta Qəlyanaltısı", highlighted: false },
                                ].map(({ time, label, highlighted }) => (
                                    <div
                                        key={time}
                                        className={`flex gap-4 items-center px-5 py-3.5 rounded-xl ${highlighted ? "bg-primary/10 border border-primary/20" : "bg-slate-50 dark:bg-slate-800/40"}`}
                                    >
                                        <span className="text-sm font-bold text-primary w-14 flex-shrink-0">{time}</span>
                                        <div className={`size-2 rounded-full flex-shrink-0 ${highlighted ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`} />
                                        <span className={`text-sm font-medium ${highlighted ? "text-slate-900 dark:text-white font-semibold" : "text-slate-600 dark:text-slate-400"}`}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                                <Image src="/assets/bg.webp" alt="Preschool" fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">Açıq Məkan</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Təhlükəsiz Oyun Meydançası</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative rounded-2xl overflow-hidden aspect-square">
                                    <Image src="/assets/bg.webp" alt="Preschool sınıf" fill className="object-cover" />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden aspect-square">
                                    <Image src="/assets/bg.webp" alt="Preschool fəaliyyət" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="relative bg-primary rounded-3xl px-8 md:px-16 py-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff20_0%,transparent_60%)] pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Ailənizi Ingla Preschool-a Dəvət Edirik</h2>
                            <p className="text-slate-800 max-w-md">Növbəti tədris ili üçün qeydiyyatımız açıqdır. Övladınızın gələcəyinə bu gün başlayın.</p>
                        </div>
                        <div className="relative z-10 flex gap-3 flex-shrink-0">
                            <Link
                                href="/contact"
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Müraciət Et <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
