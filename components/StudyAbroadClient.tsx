"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Globe, GraduationCap, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { COUNTRIES_QUERY } from "@/sanity/lib/queries";
import { SanityCountry, SanityFair, Country } from "@/types/study-abroad";

interface StudyAbroadClientProps {
    initialCountriesData?: SanityCountry[];
    initialFairsData?: SanityFair[];
}

const FALLBACK_COUNTRIES = [
    { id: "f1", name: "Böyük Britaniya", nameAz: "Böyük Britaniya", slug: "", shortDescription: "Oxford, Cambridge və daha onlarca nüfuzlu universitet.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 12 },
    { id: "f2", name: "Amerika Birləşmiş Ştatları", nameAz: "ABŞ", slug: "", shortDescription: "Harvard, MIT, Stanford — dünya sıralamasının liderleri.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 15 },
    { id: "f3", name: "Kanada", nameAz: "Kanada", slug: "", shortDescription: "Göçmen dostu mühit, beynəlxalq anlaşılan diplomlar.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 8 },
    { id: "f4", name: "Almaniya", nameAz: "Almaniya", slug: "", shortDescription: "Texniki universitetlər, aşağı qiymətlər, yüksək keyfiyyət.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 20 },
    { id: "f5", name: "Hollandiya", nameAz: "Hollandiya", slug: "", shortDescription: "İngilis dilindəki proqramlar, Avropanın mərkəzində.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 7 },
    { id: "f6", name: "Avstriya", nameAz: "Avstriya", slug: "", shortDescription: "Avropa mədəniyyətinin mərkəzi, keyfiyyətli ali təhsil.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 6 },
];

export default function StudyAbroadClient({ initialCountriesData, initialFairsData = [] }: StudyAbroadClientProps) {
    const [countries, setCountries] = useState<Country[]>(
        initialCountriesData?.length
            ? initialCountriesData.map(c => ({
                id: c._id, name: c.name, slug: c.slug.current,
                shortDescription: c.shortDescription || "",
                nameAz: c.nameAz || "",
                flagImage: c.flagImage ? urlFor(c.flagImage).url() : "",
                coverImage: c.coverImage ? urlFor(c.coverImage).url() : "",
                image: c.coverImage ? urlFor(c.coverImage).width(800).height(600).url() : '/assets/bg.webp',
                universitiesCount: c.universitiesCount ?? 5,
            }))
            : []
    );
    const [isLoading, setIsLoading] = useState(!initialCountriesData?.length);

    useEffect(() => {
        if (initialCountriesData?.length) { setIsLoading(false); return; }
        client.fetch<SanityCountry[]>(COUNTRIES_QUERY)
            .then(data => {
                if (data?.length) setCountries(data.map(c => ({
                    id: c._id, name: c.name, slug: c.slug.current,
                    shortDescription: c.shortDescription || "",
                    nameAz: c.nameAz || "",
                    flagImage: c.flagImage ? urlFor(c.flagImage).url() : "",
                    coverImage: c.coverImage ? urlFor(c.coverImage).url() : "",
                    image: c.coverImage ? urlFor(c.coverImage).width(800).height(600).url() : '/assets/bg.webp',
                    universitiesCount: (c as any).universitiesCount || 0,
                })));
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [initialCountriesData]);

    const display = countries.length > 0 ? countries : FALLBACK_COUNTRIES;

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── PAGE HEADER ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-primary">Xaricdə Təhsil</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <Globe className="w-3.5 h-3.5" />
                                Beynəlxalq Təhsil
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Xaricdə Təhsil</h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Dünyanın qabaqcıl universitetlərindən qəbul alın. Sənəd hazırlığından vizaya, yola düşməkdən adaptasiyaya qədər tam müşayiət.
                            </p>
                        </div>
                        <div className="flex gap-6 md:gap-8 shrink-0">
                            {[
                                { value: "50+", label: "Tərəfdaş Uni." },
                                { value: "98%", label: "Viza Uğuru" },
                                { value: "10+", label: "Ölkə" },
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

            {/* ── COUNTRIES + FAIRS PANEL ── */}
            <section className="py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

                        {/* Left: Countries */}
                        <div>
                            <div className="mb-8">
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Ölkələr</p>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Populyar Təhsil Mərkəzləri</h2>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {display.map((country, idx) => (
                                        <Link
                                            href={country.slug ? `/studyabroad/${country.slug}` : "#"}
                                            key={country.id}
                                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <Image
                                                    src={(country as any).image || '/assets/bg.webp'}
                                                    alt={country.name || 'Country'}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    priority={idx === 0}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                                {(country.universitiesCount ?? 0) > 0 && (
                                                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                        {country.universitiesCount}+ Universitet
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 p-5 grow">
                                                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                                    {country.nameAz || country.name}
                                                </h3>
                                                {country.shortDescription && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                        {country.shortDescription}
                                                    </p>
                                                )}
                                                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                        <GraduationCap className="w-3.5 h-3.5 text-primary" />
                                                        {country.universitiesCount}+ tərəfdaş
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                        Universitetlər <ArrowRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Sticky Fairs Panel */}
                        <aside className="lg:sticky lg:top-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                {/* Panel header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-0.5">Tədbirlər</p>
                                        <h3 className="font-black text-slate-900 dark:text-white text-base leading-none">Sərgilər</h3>
                                    </div>
                                    <Link
                                        href="/studyabroad/fairs"
                                        className="flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all shrink-0"
                                    >
                                        Hamısı <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                {/* Fair cards */}
                                <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                                    {initialFairsData.length === 0 ? (
                                        <div className="px-5 py-10 text-center">
                                            <p className="text-sm text-slate-400">Tezliklə yeni sərgilər elan olunacaq.</p>
                                        </div>
                                    ) : (
                                        initialFairsData.map((fair) => {
                                            const statusStyles = {
                                                upcoming:  "bg-primary/10 text-primary border-primary/20",
                                                ongoing:   "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
                                                completed: "bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700",
                                            }[fair.status] ?? "bg-primary/10 text-primary border-primary/20";

                                            const statusLabel = {
                                                upcoming:  "Tezliklə",
                                                ongoing:   "Davam edir",
                                                completed: "Tamamlandı",
                                            }[fair.status] ?? "Tezliklə";

                                            const dateStr = new Date(fair.startDate).toLocaleDateString("az-AZ", {
                                                day: "numeric", month: "long", year: "numeric",
                                            });

                                            const uniCount = fair.participatingUniversities?.length ?? 0;
                                            const thumbUrl = fair.coverImage
                                                ? urlFor(fair.coverImage).width(600).height(240).url()
                                                : null;

                                            return (
                                                <Link
                                                    key={fair._id}
                                                    href={`/studyabroad/fairs/${fair.slug.current}`}
                                                    className="flex flex-col group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className="relative h-28 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                        {thumbUrl ? (
                                                            <Image
                                                                src={thumbUrl}
                                                                alt={fair.name}
                                                                fill
                                                                sizes="300px"
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                                                                <GraduationCap className="w-8 h-8 text-primary/30" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                                        <span className={`absolute top-2.5 left-2.5 inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${statusStyles}`}>
                                                            {statusLabel}
                                                        </span>
                                                        <ArrowRight className="absolute top-2.5 right-2.5 w-3.5 h-3.5 text-white/60 group-hover:text-primary transition-colors" />
                                                    </div>

                                                    {/* Card body */}
                                                    <div className="flex flex-col gap-2 px-4 py-3">
                                                        <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                            {fair.name}
                                                        </p>

                                                        {fair.shortDescription && (
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                                {fair.shortDescription}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-col gap-1 mt-0.5">
                                                            <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                                <Calendar className="w-3 h-3 text-primary shrink-0" />
                                                                {dateStr}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                                <MapPin className="w-3 h-3 text-primary shrink-0" />
                                                                {fair.location}
                                                            </span>
                                                            {uniCount > 0 && (
                                                                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                                    <GraduationCap className="w-3 h-3 text-primary shrink-0" />
                                                                    {uniCount} iştirakçı universitet
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Panel footer */}
                                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800">
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-slate-900 rounded-xl font-bold text-xs hover:bg-primary/90 transition-colors"
                                    >
                                        Pulsuz Məsləhət <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

            {/* ── APPLICATION PROCESS ── */}
            <section className="bg-white dark:bg-slate-900 py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Necə İşləyir</p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">Müraciət Prosesi</h2>
                            <div className="flex flex-col gap-6">
                                {[
                                    { n: "1", title: "Proqramı Seçin", desc: "Maraqlarınıza və məqsədlərinizə uyğun olaraq müxtəlif ölkələrdən proqram seçin." },
                                    { n: "2", title: "Pulsuz Məsləhət", desc: "Uyğunluq, xərclər və təqaüd imkanlarını müzakirə etmək üçün məsləhətçimizlə görüşün." },
                                    { n: "3", title: "Sənəd Hazırlığı", desc: "Komandamız sənədlərin hazırlanmasında və universitetlərə müraciətdə köməklik edir." },
                                    { n: "4", title: "Viza & Yola Hazırlıq", desc: "Viza prosesindən adaptasiyaya qədər tam dəstək alın." },
                                ].map(({ n, title, desc }) => (
                                    <div key={n} className="flex gap-4">
                                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 font-black text-primary text-sm">{n}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-xl">
                                <Image src="/assets/bg.webp" alt="Student" fill sizes="100vw" className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-primary rounded-2xl p-5 shadow-xl">
                                <p className="text-slate-900 font-black text-2xl leading-none">98%</p>
                                <p className="text-slate-800 text-xs font-semibold mt-0.5 uppercase tracking-wide">Viza Uğuru</p>
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
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Xəyalınızdakı Universiteti Tapaq</h2>
                            <p className="text-slate-800 max-w-md">Pulsuz ilkin məsləhət üçün bu gün bizimlə əlaqə saxlayın.</p>
                        </div>
                        <div className="relative z-10 flex gap-3 shrink-0">
                            <Link
                                href="/contact"
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Pulsuz Məsləhət <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
