"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, GraduationCap, ChevronRight, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { SanityFair } from "@/types/study-abroad";

interface FairClientProps {
    fair: SanityFair;
}

const STATUS_CONFIG = {
    upcoming:  { label: "Tezliklə",   classes: "bg-primary/10 text-primary border-primary/20" },
    ongoing:   { label: "Davam edir", classes: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800" },
    completed: { label: "Tamamlandı", classes: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700" },
};

function formatDateRange(startDate: string, endDate?: string) {
    const start = new Date(startDate);
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    if (!endDate) return start.toLocaleDateString("az-AZ", opts);
    const end = new Date(endDate);
    if (
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
    ) {
        return `${start.getDate()}–${end.toLocaleDateString("az-AZ", opts)}`;
    }
    return `${start.toLocaleDateString("az-AZ", { day: "numeric", month: "long" })} – ${end.toLocaleDateString("az-AZ", opts)}`;
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{children}</p>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-8 mb-3">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">{children}</h3>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>
        ),
        em: ({ children }: any) => <em className="italic">{children}</em>,
    },
};

export default function FairClient({ fair }: FairClientProps) {
    const status = STATUS_CONFIG[fair.status] ?? STATUS_CONFIG.upcoming;
    const coverUrl = fair.coverImage
        ? urlFor(fair.coverImage).width(1400).height(600).url()
        : "/assets/bg.webp";

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── HERO ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                <div className="absolute inset-0">
                    <Image
                        src={coverUrl}
                        alt={fair.name}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/70 to-slate-900/40" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-8 flex-wrap">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/studyabroad" className="hover:text-primary transition-colors">Xaricdə Təhsil</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/studyabroad/fairs" className="hover:text-primary transition-colors">Sərgilər</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-primary">{fair.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
                        {/* Left: title + meta */}
                        <div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 ${status.classes}`}>
                                {status.label}
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                                {fair.name}
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                                    {formatDateRange(fair.startDate, fair.endDate)}
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                                    {fair.location}
                                </div>
                                {(fair.participatingUniversities?.length ?? 0) > 0 && (
                                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                                        <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                                        {fair.participatingUniversities!.length} Universitet
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: action card */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-slate-300 text-sm leading-relaxed">{fair.shortDescription}</p>
                            {fair.registrationLink && fair.status !== "completed" && (
                                <a
                                    href={fair.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
                                >
                                    Qeydiyyatdan Keç <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
                            >
                                Məsləhət Al <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20 grid lg:grid-cols-[1fr_320px] gap-14">

                {/* Left: description + universities */}
                <div>
                    {fair.fullDescription && fair.fullDescription.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Sərgi Haqqında</h2>
                            <PortableText value={fair.fullDescription} components={portableTextComponents} />
                        </div>
                    )}

                    {fair.participatingUniversities && fair.participatingUniversities.length > 0 && (
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">
                                İştirak Edən Universitetlər
                                <span className="ml-2 text-sm font-normal text-slate-400">
                                    ({fair.participatingUniversities.length})
                                </span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {fair.participatingUniversities.map((uni, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center"
                                    >
                                        {uni.logo ? (
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                                                <Image
                                                    src={urlFor(uni.logo).width(112).height(112).url()}
                                                    alt={uni.universityName}
                                                    width={56}
                                                    height={56}
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <GraduationCap className="w-7 h-7 text-primary" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                                {uni.universityName}
                                            </p>
                                            {uni.country && (
                                                <p className="text-xs text-slate-400 mt-0.5">{uni.country}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4">
                        <h3 className="font-black text-slate-900 dark:text-white text-base">Sərgi Məlumatları</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Tarix</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {formatDateRange(fair.startDate, fair.endDate)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Məkan</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{fair.location}</p>
                                </div>
                            </div>
                            {(fair.participatingUniversities?.length ?? 0) > 0 && (
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Universitetlər</p>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {fair.participatingUniversities!.length} iştirakçı
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {fair.registrationLink && fair.status !== "completed" && (
                            <a
                                href={fair.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
                            >
                                Qeydiyyatdan Keç <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    <div className="bg-slate-900 dark:bg-black rounded-2xl p-6 flex flex-col gap-3">
                        <p className="text-white font-black text-base leading-snug">Sualınız var?</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Mütəxəssislərimiz sizi xaricdə təhsil prosesinin hər addımında müşayiət edir.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
                        >
                            Pulsuz Məsləhət <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <Link
                        href="/studyabroad"
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Xaricdə Təhsilə qayıt
                    </Link>
                </aside>
            </div>
        </div>
    );
}
