"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";
import RegistrationModal from "@/components/RegistrationModal";

interface TrainingDetailClientProps {
    training: Training;
}

const levelLabel: Record<string, string> = {
    beginner: "Başlanğıc",
    intermediate: "Orta",
    advanced: "İrəli",
};

export default function TrainingDetailClient({ training }: TrainingDetailClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const coverUrl = training.featuredImage
        ? urlFor(training.featuredImage).width(1400).height(500).quality(85).url()
        : null;

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString("az-AZ", { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── PAGE HEADER ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                {coverUrl && (
                    <>
                        <div className="absolute inset-0">
                            <Image src={coverUrl} alt={training.title} fill className="object-cover opacity-20" priority />
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
                        <Link href="/training-center" className="hover:text-primary transition-colors">Təlim Mərkəzi</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary line-clamp-1">{training.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                    <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                                    Təlim Mərkəzi
                                </span>
                                {training.category && (
                                    <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-bold rounded-full">{training.category}</span>
                                )}
                                {training.level && (
                                    <span className="px-3 py-1.5 bg-white/10 text-white text-xs font-bold rounded-full">
                                        {levelLabel[training.level] ?? training.level}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">{training.title}</h1>
                            {training.description && (
                                <p className="text-slate-400 text-base md:text-lg leading-relaxed">{training.description}</p>
                            )}
                        </div>

                        {training.price && (
                            <div className="flex-shrink-0 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Qiymət</p>
                                <p className="text-3xl font-black text-primary leading-none">{training.price} ₼</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── MAIN ── */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left: content */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        {training.content && training.content.length > 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
                                    </div>
                                    <h2 className="font-black text-slate-900 dark:text-white text-xl">Təlim Məzmunu</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                                    <PortableText value={training.content} />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-12 text-center">
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-[48px] mb-4 block">menu_book</span>
                                <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Məzmun tezliklə əlavə ediləcək</h3>
                                <p className="text-sm text-slate-500">Bu təlim haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın.</p>
                            </div>
                        )}
                    </div>

                    {/* Right: details + CTA */}
                    <div className="flex flex-col gap-6">
                        {/* Details card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-primary font-bold text-xs uppercase tracking-widest">Məlumatlar</p>
                                <h3 className="font-black text-slate-900 dark:text-white">Təlim Detalları</h3>
                            </div>
                            <div className="px-6 py-5 flex flex-col gap-4">
                                {[
                                    training.instructor  && { icon: "person",    label: "İnstruktor",       value: training.instructor },
                                    training.duration    && { icon: "schedule",  label: "Müddət",           value: training.duration },
                                    training.level       && { icon: "bar_chart", label: "Səviyyə",          value: levelLabel[training.level] ?? training.level },
                                    training.category    && { icon: "category",  label: "Kateqoriya",       value: training.category },
                                    training.startDate   && { icon: "event",     label: "Başlama Tarixi",   value: formatDate(training.startDate) },
                                    training.endDate     && { icon: "event_busy",label: "Bitmə Tarixi",     value: formatDate(training.endDate) },
                                ].filter(Boolean).map((row: any) => (
                                    <div key={row.label} className="flex gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">{row.icon}</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{row.label}</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{row.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enroll CTA */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-4 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:brightness-105 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            İndi Qeydiyyatdan Keç
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>

                        {/* Contact fallback */}
                        <Link
                            href="/contact"
                            className="w-full py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                            Sual vermək istəyirəm
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── CTA BANNER ── */}
            <section className="py-16">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="relative bg-primary rounded-3xl px-8 md:px-16 py-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff20_0%,transparent_60%)] pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Bu təlimə qeydiyyatdan keçin</h2>
                            <p className="text-slate-800 max-w-md">Suallarınız varsa pulsuz məsləhət üçün bizimlə əlaqə saxlayın.</p>
                        </div>
                        <div className="relative z-10 flex gap-3 flex-shrink-0">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Qeydiyyat <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={training.title}
            />
        </div>
    );
}
