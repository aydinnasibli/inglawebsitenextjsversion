"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { COUNTRIES_QUERY } from "@/sanity/lib/queries";
import { SanityCountry, Country } from "@/types/study-abroad";

interface StudyAbroadClientProps {
    initialCountriesData?: SanityCountry[];
}

const FALLBACK_COUNTRIES = [
    { id: "f1", name: "Böyük Britaniya", nameAz: "Böyük Britaniya", slug: "", shortDescription: "Oxford, Cambridge və daha onlarca nüfuzlu universitet.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 12 },
    { id: "f2", name: "Amerika Birləşmiş Ştatları", nameAz: "ABŞ", slug: "", shortDescription: "Harvard, MIT, Stanford — dünya sıralamasının liderleri.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 15 },
    { id: "f3", name: "Kanada", nameAz: "Kanada", slug: "", shortDescription: "Göçmen dostu mühit, beynəlxalq anlaşılan diplomlar.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 8 },
    { id: "f4", name: "Almaniya", nameAz: "Almaniya", slug: "", shortDescription: "Texniki universitetlər, aşağı qiymətlər, yüksək keyfiyyət.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 20 },
    { id: "f5", name: "Hollandiya", nameAz: "Hollandiya", slug: "", shortDescription: "İngilis dilindəki proqramlar, Avropanın mərkəzində.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 7 },
    { id: "f6", name: "Avstriya", nameAz: "Avstriya", slug: "", shortDescription: "Avropa mədəniyyətinin mərkəzi, keyfiyyətli ali təhsil.", image: "/assets/bg.webp", flagImage: "", coverImage: "", universitiesCount: 6 },
];

export default function StudyAbroadClient({ initialCountriesData }: StudyAbroadClientProps) {
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
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary">Xaricdə Təhsil</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="material-symbols-outlined text-[14px]">public</span>
                                Beynəlxalq Təhsil
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Xaricdə Təhsil</h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Dünyanın qabaqcıl universitetlərindən qəbul alın. Sənəd hazırlığından vizaya, yola düşməkdən adaptasiyaya qədər tam müşayiət.
                            </p>
                        </div>
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
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

            {/* ── COUNTRIES GRID ── */}
            <section className="py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Ölkələr</p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Populyar Təhsil Mərkəzləri</h2>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {display.map((country) => (
                                <Link
                                    href={country.slug ? `/studyabroad/${country.slug}` : "#"}
                                    key={country.id}
                                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={(country as any).image || '/assets/bg.webp'}
                                            alt={country.name || 'Country'}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        {(country.universitiesCount ?? 0) > 0 && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                {country.universitiesCount}+ Universitet
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-col gap-2 p-6 grow">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                            {country.nameAz || country.name}
                                        </h3>
                                        {country.shortDescription && (
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                {country.shortDescription}
                                            </p>
                                        )}
                                        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-[14px] text-primary">school</span>
                                                {country.universitiesCount}+ tərəfdaş
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                Universitetlər <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
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
                                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 font-black text-primary text-sm">{n}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                                <Image src="/assets/bg.webp" alt="Student" fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
                        <div className="relative z-10 flex gap-3 flex-shrink-0">
                            <Link
                                href="/contact"
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Pulsuz Məsləhət <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
