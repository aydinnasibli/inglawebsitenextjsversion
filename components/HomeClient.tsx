"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FAQ_QUERY, TESTIMONIALS_QUERY, HOMEPAGE_BENTO_QUERY } from "@/sanity/lib/queries";
import { SanityFAQItem, SanityTestimonialItem, FAQItem, TestimonialItem } from "@/types/faq-testimonials";
import BentoBox, { BentoItem } from "@/components/BentoBox";

interface HomeClientProps {
    initialBentoData?: BentoItem[];
    initialFaqData?: SanityFAQItem[];
    initialTestimonialsData?: SanityTestimonialItem[];
}

const transformFaqData = (sanityItems: SanityFAQItem[]): FAQItem[] =>
    sanityItems
        .filter(i => i?._id && i.question && i.answer)
        .map(i => ({ id: i._id, question: i.question, answer: i.answer, category: i.category || "general" }));

const transformTestimonialsData = (sanityItems: SanityTestimonialItem[]): TestimonialItem[] =>
    sanityItems
        .filter(i => i?._id && i.name && i.testimonial)
        .map(i => ({
            id: i._id, name: i.name, position: i.position, company: i.company,
            testimonial: i.testimonial,
            image: i.image ? urlFor(i.image).width(96).height(96).quality(85).url() : undefined,
            rating: i.rating || 5, program: i.program || "general", featured: i.featured || false,
        }));

const STATS = [
    { icon: "groups",         label: "Aktiv Tələbələr", value: "5,000+" },
    { icon: "verified",       label: "Qəbul Faizi",     value: "98%"    },
    { icon: "corporate_fare", label: "Tərəfdaşlar",     value: "50+"    },
    { icon: "star",           label: "Məmnuniyyət",     value: "4.9/5"  },
];

export default function HomeClient({ initialBentoData, initialFaqData, initialTestimonialsData }: HomeClientProps) {
    const [bentoItems, setBentoItems] = useState<BentoItem[]>(initialBentoData || []);
    const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
    const [activeFaq, setActiveFaq] = useState<string | null>(null);
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!initialBentoData?.length) {
            client.fetch<BentoItem[]>(HOMEPAGE_BENTO_QUERY).then(d => { if (d?.length) setBentoItems(d); }).catch(console.error);
        }
    }, [initialBentoData]);

    useEffect(() => {
        if (initialFaqData?.length) setFaqItems(transformFaqData(initialFaqData));
        else client.fetch<SanityFAQItem[]>(FAQ_QUERY).then(d => { if (d) setFaqItems(transformFaqData(d)); }).catch(console.error);

        if (initialTestimonialsData?.length) setTestimonials(transformTestimonialsData(initialTestimonialsData));
        else client.fetch<SanityTestimonialItem[]>(TESTIMONIALS_QUERY).then(d => { if (d) setTestimonials(transformTestimonialsData(d)); }).catch(console.error);
    }, [initialFaqData, initialTestimonialsData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-background-light dark:bg-background-dark">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90009_1px,transparent_1px),linear-gradient(to_bottom,#ffd90009_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />
                {/* Top-right glow */}
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 xl:gap-16 items-center">

                        {/* ── LEFT ── */}
                        <div className="flex flex-col gap-6">

                            {/* Live badge */}
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-slate-800 dark:text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                Yeni Qəbul Davam Edir
                            </span>

                            {/* Headline */}
                            <div className="flex flex-col gap-3">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.06] tracking-tight text-slate-900 dark:text-white">
                                    Bakıda{" "}
                                    <span className="relative whitespace-nowrap">
                                        <span className="text-primary">Beynəlxalq</span>
                                        <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" height="6">
                                            <path d="M0 6 Q100 0 200 6" stroke="#ffd900" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                                        </svg>
                                    </span>{" "}
                                    Standartlarda Təhsil
                                </h1>
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                    Dil kurslarından xaricdə təhsilə, preschooldan peşəkar sertifikat proqramlarına qədər — hər ehtiyacınız üçün doğru proqram burada.
                                </p>
                            </div>

                            {/* Key advantages */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { icon: "school",     text: "Sertifikatlı Müəllimlər" },
                                    { icon: "public",     text: "Beynəlxalq Proqramlar"   },
                                    { icon: "person",     text: "Fərdi Yanaşma"            },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-center gap-2.5 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3">
                                        <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">{icon}</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Main program links */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Əsas İstiqamətlər</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { icon: "school",            label: "Tədris İstiqamətləri", sub: "Dil, IELTS, SAT",      href: "/services"        },
                                        { icon: "child_care",        label: "Preschool",             sub: "3–6 yaş proqramları", href: "/preschool"       },
                                        { icon: "workspace_premium", label: "Təlim Mərkəzi",         sub: "Korporativ & sertifikat", href: "/training-center" },
                                    ].map(({ icon, label, sub, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="group flex items-center gap-3 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 hover:border-primary hover:shadow-md transition-all"
                                        >
                                            <span className="material-symbols-outlined text-primary text-[22px] flex-shrink-0">{icon}</span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate">{label}</p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{sub}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[16px] ml-auto flex-shrink-0 group-hover:text-primary transition-colors">chevron_right</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3 pt-1">
                                <Link
                                    href="/studyabroad"
                                    className="px-8 py-3.5 bg-primary text-slate-900 rounded-xl font-bold text-base hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                    Xaricdə Təhsil <span className="material-symbols-outlined text-[20px]">public</span>
                                </Link>
                                <button
                                    onClick={() => router.push("/about")}
                                    className="px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-base hover:border-primary hover:text-primary transition-all"
                                >
                                    Haqqımızda
                                </button>
                            </div>

                        </div>

                        {/* ── RIGHT ── */}
                        <div className="relative hidden lg:flex flex-col gap-3">
                            {/* Main image */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                <Image src="/assets/bg.webp" alt="Ingla School" fill className="object-cover" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                {/* Overlay chip inside image */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Zahid Xəlilov 59, Bakı</span>
                                </div>
                            </div>

                            {/* Bottom info cards row */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Achievement card */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 shadow-md flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-slate-900 text-[20px]">emoji_events</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">98%</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">IELTS məzunları<br/>hədəf bala çatır</p>
                                    </div>
                                </div>
                                {/* Next intake card */}
                                <div className="bg-slate-900 dark:bg-slate-800 border border-slate-800 rounded-2xl px-5 py-4 shadow-md flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 mb-0.5 leading-tight">Növbəti Başlanğıc</p>
                                        <p className="text-sm font-black text-white leading-none">Hər Ay</p>
                                        <p className="text-[10px] text-primary font-semibold mt-0.5">Yer sayı məhduddur</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
                        </div>

                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ──────────────────────────────────────────── */}
            <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map(({ icon, label, value }) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">{value}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide font-medium">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BENTO BOX ────────────────────────────────────────────── */}
            {bentoItems.length > 0 && (
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Proqramlarımız</p>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Hər ehtiyac üçün <span className="text-primary">doğru proqram</span>
                            </h2>
                        </div>
                        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                            Bütün proqramlara bax <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                    <BentoBox items={bentoItems} />
                </div>
            </section>
            )}

            {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Tələbə Rəyləri</p>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Uğur Hekayələri</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">Ingla School məzunları öz təcrübələrini paylaşır.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.slice(0, 3).map((t) => (
                                <div key={t.id} className="bg-background-light dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col gap-5">
                                    <div className="flex text-primary gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[18px]">
                                                {i < t.rating ? "star" : "star_border"}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed line-clamp-4 flex-1">
                                        &ldquo;{t.testimonial}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <div className="size-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                                            {t.image ? (
                                                <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">person</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                                {t.name}
                                                {t.featured && <span className="material-symbols-outlined text-primary text-[14px]">verified</span>}
                                            </p>
                                            <p className="text-xs text-slate-500">{t.position}{t.company && ` · ${t.company}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── TRAINING CTA ─────────────────────────────────────────── */}
            <section className="py-20 bg-slate-900 dark:bg-black text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Korporativ Həllər</p>
                            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Təlim Mərkəzimiz</h2>
                            <p className="text-slate-400 text-base mb-8 leading-relaxed">
                                Şirkətiniz və işçiləriniz üçün xüsusi hazırlanmış korporativ təlimlər. Biznesinizin inkişafı üçün peşəkar kadrların yetişdirilməsi.
                            </p>
                            <ul className="flex flex-col gap-3 mb-10">
                                {["İxtisaslaşmış biznes təlimləri", "Kommunikasiya və liderlik üzrə kurslar", "Beynəlxalq sertifikat proqramları"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-300">
                                        <span className="size-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => router.push("/training-center")}
                                className="px-8 py-4 bg-primary text-slate-900 rounded-xl font-bold text-base hover:brightness-105 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
                            >
                                Daha Ətraflı <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl overflow-hidden relative">
                                <Image src="/assets/bg.webp" alt="Təlim Mərkəzi" fill className="object-cover opacity-60 hover:opacity-90 transition-opacity" />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden relative translate-y-8">
                                <Image src="/assets/bg.webp" alt="Təlim Mərkəzi" fill className="object-cover opacity-60 hover:opacity-90 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            {(() => {
                const STATIC_FAQ: FAQItem[] = [
                    {
                        id: "s1",
                        question: "Ingla School-da hansı yaş qrupları üçün proqramlar var?",
                        answer: "3 yaşdan yetkinlərə qədər hər kəs üçün proqramımız mövcuddur. Preschool (3–6 yaş), uşaq dil kursları (7–14 yaş), yeniyetmə qrupları (15–17 yaş) və yetkin tələbələr üçün ayrıca proqramlar keçirilir.",
                        category: "general",
                    },
                    {
                        id: "s2",
                        question: "IELTS hazırlıq kursunun müddəti nə qədərdir?",
                        answer: "Başlanğıc səviyyənizə görə dəyişir — adətən 2 aydan 4 aya qədər sürür. İntensiv proqramla daha qısa müddətdə hədəf bala çatmaq mümkündür. Pulsuz ilkin qiymətləndirmə üçün bizimlə əlaqə saxlayın.",
                        category: "ielts",
                    },
                    {
                        id: "s3",
                        question: "Dərslər qrup şəklindədir, yoxsa fərdi?",
                        answer: "Hər iki formatı təklif edirik. Qrup dərsləri (8–12 nəfər) daha əlverişli qiymətə daha çox sosial öyrənmə mühiti yaradır. Fərdi dərslər isə şəxsi cədvəlinizə və sürətinizə tam uyğunlaşır.",
                        category: "general",
                    },
                    {
                        id: "s4",
                        question: "Xaricdə təhsil üçün nə vaxt müraciət etmək lazımdır?",
                        answer: "Əksər universitetlər üçün qəbul müddəti sona 12–18 ay qalmış başlamaq tövsiyə olunur. Sənəd hazırlığı, dil imtahanları və viza prosesi nəzərə alınmaqla erkən müraciət üstünlük verir. İlk məsləhət üçün bu gün bizimlə əlaqə saxlaya bilərsiniz.",
                        category: "studyabroad",
                    },
                    {
                        id: "s5",
                        question: "Sertifikatlar beynəlxalq səviyyədə tanınırmı?",
                        answer: "IELTS, SAT və digər beynəlxalq imtahanlara hazırlıq proqramlarımız dünya standartlarına uyğundur. Buraxılış sertifikatlarımız isə Azərbaycanda tanınan bir sıra tərəfdaş qurumlar tərəfindən qəbul edilir.",
                        category: "general",
                    },
                    {
                        id: "s6",
                        question: "Qeydiyyat üçün nə etmək lazımdır?",
                        answer: "Bizimlə telefon, WhatsApp və ya e-poçt vasitəsilə əlaqə saxlaya bilərsiniz. Pulsuz ilkin məsləhət və yerləşdirmə testi keçirdikdən sonra sizə ən uyğun proqram tövsiyə ediləcək.",
                        category: "general",
                    },
                ];
                const displayFaqs = faqItems.length > 0 ? faqItems.slice(0, 6) : STATIC_FAQ;
                return (
                    <section className="py-20 bg-white dark:bg-slate-900">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Suallar</p>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Tez-tez Verilən Suallar</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-3 text-base">Ən çox soruşulan suallara burada cavab tapacaqsınız.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                {displayFaqs.map(faq => (
                                    <div key={faq.id} className="bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
                                        <button
                                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors gap-4"
                                            onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                                        >
                                            <span className="font-semibold text-slate-900 dark:text-white text-sm">{faq.question}</span>
                                            <span
                                                className="material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-300"
                                                style={{ transform: activeFaq === faq.id ? "rotate(180deg)" : "rotate(0deg)" }}
                                            >
                                                expand_more
                                            </span>
                                        </button>
                                        {activeFaq === faq.id && (
                                            <div className="px-6 pb-5 pt-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* ── BOTTOM CTA BANNER ────────────────────────────────────── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative bg-primary rounded-3xl px-8 md:px-16 py-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffd90040_0%,transparent_60%)] pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Bu gün başlayın</h2>
                            <p className="text-slate-800 max-w-md">Peşəkar müəllimlər, beynəlxalq proqramlar və sizin uğurunuza həsr olunmuş bir komanda sizi gözləyir.</p>
                        </div>
                        <div className="relative z-10 flex gap-3 flex-shrink-0">
                            <Link
                                href="/services"
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Proqramlara Bax <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
