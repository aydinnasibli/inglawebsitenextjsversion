"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { UNIVERSITIES_BY_COUNTRY_QUERY } from "@/sanity/lib/queries";
import { SanityCountry, SanityUniversity, Country, University } from "@/types/study-abroad";

interface CountryClientProps {
    initialCountryData: SanityCountry;
    initialUniversitiesData?: SanityUniversity[];
}

const transformCountry = (c: SanityCountry): Country => ({
    id: c._id,
    name: c.name,
    nameAz: c.nameAz,
    slug: c.slug.current,
    shortDescription: c.shortDescription,
    fullDescription: c.fullDescription,
    flagImage: c.flagImage ? urlFor(c.flagImage).width(120).height(90).quality(90).url() : "",
    coverImage: c.coverImage ? urlFor(c.coverImage).width(1400).height(600).quality(85).url() : "",
    gallery: c.gallery?.map(img => urlFor(img).width(800).height(600).quality(85).url()),
    highlights: c.highlights,
    studyInfo: c.studyInfo,
    popularPrograms: c.popularPrograms,
    isFeatured: c.isFeatured,
});

const transformUniversities = (list: SanityUniversity[]): University[] =>
    list
        .filter(u => u && u._id && u.name)
        .map(u => ({
            id: u._id,
            name: u.name,
            slug: u.slug.current,
            country: {
                id: u.country._id,
                name: u.country.name,
                nameAz: u.country.nameAz,
                slug: u.country.slug.current,
            },
            logo: u.logo ? urlFor(u.logo).width(400).height(300).quality(90).url() : "",
        }));

export default function CountryClient({ initialCountryData, initialUniversitiesData }: CountryClientProps) {
    const [country] = useState<Country>(() => transformCountry(initialCountryData));
    const [universities, setUniversities] = useState<University[]>(
        initialUniversitiesData?.length ? transformUniversities(initialUniversitiesData) : []
    );
    const [uniLoading, setUniLoading] = useState(!initialUniversitiesData?.length);

    useEffect(() => {
        if (initialUniversitiesData?.length) { setUniLoading(false); return; }
        client.fetch<SanityUniversity[]>(UNIVERSITIES_BY_COUNTRY_QUERY, { countryId: initialCountryData._id })
            .then(data => { if (data?.length) setUniversities(transformUniversities(data)); })
            .catch(console.error)
            .finally(() => setUniLoading(false));
    }, [initialCountryData, initialUniversitiesData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── PAGE HEADER ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                {/* Cover image as background */}
                {country.coverImage && (
                    <>
                        <div className="absolute inset-0">
                            <Image src={country.coverImage} alt={country.nameAz} fill className="object-cover opacity-40" priority />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
                    </>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link href="/studyabroad" className="hover:text-primary transition-colors">Xaricdə Təhsil</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary">{country.nameAz}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                    <span className="material-symbols-outlined text-[14px]">public</span>
                                    Xaricdə Təhsil
                                </span>
                                {country.isFeatured && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-slate-900 text-xs font-bold uppercase tracking-widest w-fit">
                                        <span className="material-symbols-outlined text-[14px]">star</span>
                                        Tövsiyə Olunur
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                {country.flagImage && (
                                    <div className="w-14 h-10 rounded-lg overflow-hidden border-2 border-white/20 flex-shrink-0 shadow-lg">
                                        <Image src={country.flagImage} alt={`${country.nameAz} bayrağı`} width={56} height={40} className="object-cover w-full h-full" />
                                    </div>
                                )}
                                <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                    {country.nameAz}də Təhsil
                                </h1>
                            </div>

                            {country.shortDescription && (
                                <p className="text-slate-400 text-base md:text-lg leading-relaxed">{country.shortDescription}</p>
                            )}
                        </div>

                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            {[
                                { value: `${universities.length || "10"}+`, label: "Tərəfdaş Uni." },
                                { value: "98%", label: "Viza Uğuru" },
                                { value: "Tam", label: "Müşayiət" },
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

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left: description + highlights */}
                    <div className="lg:col-span-2 flex flex-col gap-12">

                        {country.fullDescription && (
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                                <PortableText value={country.fullDescription} />
                            </div>
                        )}

                        {country.highlights && country.highlights.length > 0 && (
                            <section>
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Niyə {country.nameAz}?</p>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Üstünlüklər</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {country.highlights.map((h, i) => (
                                        <div key={i} className="flex gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
                                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">{h.title}</h4>
                                                {h.description && (
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{h.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Popular Programs */}
                        {country.popularPrograms && country.popularPrograms.length > 0 && (
                            <section>
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Proqramlar</p>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Populyar İxtisaslar</h2>
                                <div className="flex flex-wrap gap-2">
                                    {country.popularPrograms.map((prog, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full">
                                            {prog}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right: study info sidebar */}
                    <div className="flex flex-col gap-6">
                        {country.studyInfo && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-primary font-bold text-xs uppercase tracking-widest">Məlumatlar</p>
                                    <h3 className="font-black text-slate-900 dark:text-white">Təhsil Məlumatları</h3>
                                </div>
                                <div className="px-6 py-5 flex flex-col gap-4">
                                    {[
                                        { icon: "translate", label: "Dil", value: country.studyInfo.language },
                                        { icon: "payments", label: "Valyuta", value: country.studyInfo.currency },
                                        { icon: "school", label: "Orta Təhsil Haqqı", value: country.studyInfo.averageCost },
                                        { icon: "apartment", label: "Yaşayış Xərci", value: country.studyInfo.livingCost },
                                        { icon: "event", label: "Müraciət Tarixi", value: country.studyInfo.applicationDeadline },
                                    ].filter(r => r.value).map(({ icon, label, value }) => (
                                        <div key={label} className="flex gap-3">
                                            <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">{icon}</span>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{label}</p>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {country.studyInfo.visaRequirements && country.studyInfo.visaRequirements.length > 0 && (
                                    <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Viza Tələbləri</p>
                                        <ul className="flex flex-col gap-2">
                                            {country.studyInfo.visaRequirements.map((req, i) => (
                                                <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-primary text-[14px] flex-shrink-0 mt-0.5">fiber_manual_record</span>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CTA card */}
                        <div className="bg-primary rounded-2xl p-6">
                            <h4 className="font-black text-slate-900 text-base mb-1">Pulsuz Məsləhət</h4>
                            <p className="text-slate-800 text-sm mb-4 leading-relaxed">{country.nameAz}də təhsil üçün bizimlə əlaqə saxlayın.</p>
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                            >
                                Əlaqə saxla <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── UNIVERSITIES GRID ── */}
                <section className="mt-20">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Tərəfdaşlar</p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Tərəfdaş Universitetlər</h2>
                        </div>
                    </div>

                    {uniLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                        </div>
                    ) : universities.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-[48px] mb-4 block">school</span>
                            <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Hal-hazırda məlumat yoxdur</h3>
                            <p className="text-sm text-slate-500">Bu ölkədəki universitet imkanları haqqında bizimlə əlaqə saxlayın.</p>
                            <Link href="/contact" className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:brightness-105 transition-all">
                                Əlaqə saxla <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {universities.map(uni => (
                                <div
                                    key={uni.id}
                                    className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm"
                                >
                                    {/* Logo area */}
                                    <div className="relative h-44 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden px-8">
                                        {uni.logo ? (
                                            <Image
                                                src={uni.logo}
                                                alt={uni.name}
                                                width={240}
                                                height={120}
                                                className="object-contain max-h-28"
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[64px]">school</span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-5 border-t border-slate-100 dark:border-slate-800">
                                        <h3 className="font-black text-slate-900 dark:text-white text-sm leading-snug line-clamp-2">
                                            {uni.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* ── CTA BANNER ── */}
            <section className="py-16">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="relative bg-primary rounded-3xl px-8 md:px-16 py-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff20_0%,transparent_60%)] pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{country.nameAz}də Oxumaq İstəyirsiniz?</h2>
                            <p className="text-slate-800 max-w-md">Pulsuz məsləhət üçün bu gün bizimlə əlaqə saxlayın.</p>
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
