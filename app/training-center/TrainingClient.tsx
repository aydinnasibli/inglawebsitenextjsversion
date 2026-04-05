"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";
import { client } from "@/sanity/lib/client";
import { trainingQueries } from "@/sanity/lib/queries";

interface TrainingClientProps {
    initialTrainings: Training[];
}

export default function TrainingClient({ initialTrainings }: TrainingClientProps) {
    const [trainings, setTrainings] = useState<Training[]>(initialTrainings);

    useEffect(() => {
        let isMounted = true;
        const fetchTrainings = async () => {
            try {
                if (!initialTrainings || initialTrainings.length === 0) {
                    const data = await client.fetch<Training[]>(trainingQueries.all);
                    if (isMounted && data) {
                        setTrainings(data);
                    }
                }
            } catch (err) {
                console.error("Error fetching trainings directly in client:", err);
            }
        };

        fetchTrainings();

        return () => {
            isMounted = false;
        };
    }, [initialTrainings]);

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
                        <span className="text-primary">Təlim Mərkəzi</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                                Peşəkar Inkişaf
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Təlim Mərkəzi</h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Korporativ müştərilər, peşəkarlar və şirkətlər üçün ixtisaslaşmış sertifikat proqramları. Akademik mükəmməlliyi, yaradıcı düşüncəni və ömür boyu davam edən uğuru dəstəkləyirik.
                            </p>
                        </div>
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            {[
                                { value: "20+", label: "Proqram" },
                                { value: "500+", label: "Məzun" },
                                { value: "95%", label: "Məmnuniyyət" },
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

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">

            {/* Programs Section */}
            <section className="mb-16" id="programs">
                <div className="mb-10">
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Proqramlar</p>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Təlim Proqramları</h2>
                </div>

                {(() => {
                    const FALLBACK = [
                        { _id:"f1", title:"Ünsiyyət Bacarıqları", category:"Təməl", level:"Başlanğıc", description:"İş mühitində effektiv kommunikasiya və təqdimat bacarıqlarının inkişaf etdirilməsi.", slug:{ current:"" }, featuredImage: null },
                        { _id:"f2", title:"Layihə İdarəetməsi",   category:"Biznes", level:"Orta",      description:"Agile və Scrum metodologiyaları ilə layihələrin effektiv idarə olunması.",          slug:{ current:"" }, featuredImage: null },
                        { _id:"f3", title:"Strateji Liderlik",    category:"Liderlik", level:"İrəli",   description:"Böyük komandaları idarə etmək və böhran vəziyyətlərində düzgün qərar vermək.",    slug:{ current:"" }, featuredImage: null },
                    ];
                    const items = trainings.length > 0 ? trainings : FALLBACK;
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {items.map((t) => {
                                const hasSlug = !!t.slug?.current;
                                const cardBody = (
                                    <>
                                        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <Image
                                                src={t.featuredImage ? urlFor(t.featuredImage).width(600).height(400).url() : '/assets/bg.webp'}
                                                alt={t.title}
                                                fill
                                                className={`object-cover transition-transform duration-500${hasSlug ? " group-hover:scale-105" : ""}`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            {t.category && (
                                                <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                    {t.category}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3 p-6 grow">
                                            <h3 className={`text-lg font-black text-slate-900 dark:text-white leading-snug line-clamp-2${hasSlug ? " group-hover:text-primary transition-colors" : ""}`}>
                                                {t.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
                                                {t.description || 'Proqram haqqında ətraflı məlumat.'}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                                                {t.level && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-500">
                                                        <span className="material-symbols-outlined text-[14px] text-primary">bar_chart</span>
                                                        {t.level}
                                                    </span>
                                                )}
                                                {hasSlug && (
                                                    <span className="ml-auto flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                                                        Ətraflı <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                );
                                return hasSlug ? (
                                    <Link key={t._id} href={`/training-center/${t.slug.current}`} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        {cardBody}
                                    </Link>
                                ) : (
                                    <div key={t._id} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                                        {cardBody}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </section>

            {/* Why us strip */}
            <section className="mb-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { icon: "person_search", title: "Sahə Ekspertləri", desc: "Öz sahəsində magistr və ya daha yüksək dərəcəli peşəkar təlimçilər." },
                        { icon: "video_chat",    title: "Əyani & Online",   desc: "Mərkəzdə və ya onlayn — sizin üçün uyğun formatı seçin." },
                        { icon: "trending_up",   title: "İnkişafın İzlənməsi", desc: "Həftəlik hesabatlar və mütəmadi fərdi məsləhətləşmələr." },
                    ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex gap-4">
                            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mt-8 mb-8">
                <div className="relative bg-primary rounded-3xl px-8 md:px-16 py-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff20_0%,transparent_60%)] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Şirkətiniz üçün xüsusi təlim hazırlayaq</h2>
                        <p className="text-slate-800 max-w-md">Korporativ ehtiyaclarınıza uyğun fərdi proqram üçün bizimlə əlaqə saxlayın.</p>
                    </div>
                    <div className="relative z-10 flex gap-3 flex-shrink-0">
                        <Link
                            href="/contact"
                            className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            Əlaqə saxla <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            </div>
        </div>
    );
}
