"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, GraduationCap } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { SanityFair } from "@/types/study-abroad";

interface FairsSectionProps {
    fairs: SanityFair[];
}

const STATUS_CONFIG = {
    upcoming: { label: "Tezliklə", classes: "bg-primary/10 text-primary border-primary/20" },
    ongoing:  { label: "Davam edir", classes: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800" },
    completed:{ label: "Tamamlandı", classes: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700" },
};

function formatDateRange(startDate: string, endDate?: string) {
    const start = new Date(startDate);
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    if (!endDate) return start.toLocaleDateString("az-AZ", opts);
    const end = new Date(endDate);
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${start.getDate()}–${end.toLocaleDateString("az-AZ", opts)}`;
    }
    return `${start.toLocaleDateString("az-AZ", { day: "numeric", month: "long" })} – ${end.toLocaleDateString("az-AZ", opts)}`;
}

export default function FairsSection({ fairs }: FairsSectionProps) {
    if (!fairs.length) return null;

    return (
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Tədbirlər</p>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                            Universitetlər Sərgiləri
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-lg">
                            Xarici universitetlərin nümayəndələri ilə birbaşa görüşün, suallarınıza cavab alın.
                        </p>
                    </div>
                    <Link
                        href="/studyabroad/fairs"
                        className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                        Hamısına bax <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fairs.map((fair) => {
                        const status = STATUS_CONFIG[fair.status] ?? STATUS_CONFIG.upcoming;
                        const imageUrl = fair.coverImage
                            ? urlFor(fair.coverImage).width(800).height(480).url()
                            : "/assets/bg.webp";
                        const uniCount = fair.participatingUniversities?.length ?? 0;

                        return (
                            <Link
                                key={fair._id}
                                href={`/studyabroad/fairs/${fair.slug.current}`}
                                className="group flex flex-col bg-background-light dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Cover image */}
                                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <Image
                                        src={imageUrl}
                                        alt={fair.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                                    {/* Status badge */}
                                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${status.classes}`}>
                                        {status.label}
                                    </span>

                                    {/* Uni count badge */}
                                    {uniCount > 0 && (
                                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                                            <GraduationCap className="w-3 h-3" />
                                            {uniCount} Universitet
                                        </span>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="flex flex-col gap-3 p-5 grow">
                                    {/* Date pill */}
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit">
                                        <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                                        <span className="text-[11px] font-bold text-primary leading-none">
                                            {formatDateRange(fair.startDate, fair.endDate)}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                        {fair.name}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                        {fair.location}
                                    </div>

                                    {fair.shortDescription && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {fair.shortDescription}
                                        </p>
                                    )}

                                    {/* University logo strip */}
                                    {fair.participatingUniversities && fair.participatingUniversities.length > 0 && (
                                        <div className="flex items-center gap-2 flex-wrap mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                                            {fair.participatingUniversities.slice(0, 4).map((uni, i) =>
                                                uni.logo ? (
                                                    <div key={i} className="w-8 h-8 rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0">
                                                        <Image
                                                            src={urlFor(uni.logo).width(64).height(64).url()}
                                                            alt={uni.universityName}
                                                            width={32}
                                                            height={32}
                                                            className="object-contain w-full h-full p-0.5"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div key={i} className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                        <GraduationCap className="w-4 h-4 text-primary" />
                                                    </div>
                                                )
                                            )}
                                            {fair.participatingUniversities.length > 4 && (
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    +{fair.participatingUniversities.length - 4}
                                                </span>
                                            )}
                                            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                Ətraflı <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    )}

                                    {!fair.participatingUniversities?.length && (
                                        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                            <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                Ətraflı <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
