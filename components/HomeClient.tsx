"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Users, BadgeCheck, Building2, Star,
    GraduationCap, Globe, User, Baby, Award,
    ChevronRight, Trophy, Calendar, MapPin,
    ArrowRight, ChevronDown,
} from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FAQ_QUERY, TESTIMONIALS_QUERY, HOMEPAGE_BENTO_QUERY } from "@/sanity/lib/queries";
import { SanityFAQItem, SanityTestimonialItem, FAQItem, TestimonialItem } from "@/types/faq-testimonials";
import BentoBox, { BentoItem } from "@/components/BentoBox";
import FeaturedNewsHero from "@/components/FeaturedNewsHero";
import { HomepageNewsData } from "@/types/news";

interface HomeClientProps {
    initialBentoData?: BentoItem[];
    initialFaqData?: SanityFAQItem[];
    initialTestimonialsData?: SanityTestimonialItem[];
    initialNewsData?: HomepageNewsData;
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
    { Icon: Users, label: "Aktiv Tələbələr", value: "750+" },
    { Icon: BadgeCheck, label: "Qəbul Faizi", value: "98%" },
    { Icon: Building2, label: "Tərəfdaşlar", value: "50+" },
    { Icon: Star, label: "Məmnuniyyət", value: "4.9/5" },
];

export default function HomeClient({ initialBentoData, initialFaqData, initialTestimonialsData, initialNewsData }: HomeClientProps) {
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

    const hasNews = initialNewsData && (initialNewsData.featured || initialNewsData.latest.length > 0);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── FEATURED NEWS HERO ───────────────────────────────────── */}
            {hasNews && <FeaturedNewsHero data={initialNewsData!} />}

            {/* ── ABOUT / WHY INGLA ────────────────────────────────────── */}
            <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-center">

                        {/* ── LEFT ── */}
                        <div className="flex flex-col gap-6">

                            {/* Section label */}
                            <div>
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Niyə Ingla School?</p>
                                <h2 className="text-3xl md:text-4xl xl:text-5xl font-black leading-[1.08] tracking-tight text-slate-900 dark:text-white">
                                    Bakıda{" "}
                                    <span className="relative whitespace-nowrap">
                                        <span className="text-primary">Beynəlxalq</span>
                                        <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" height="5">
                                            <path d="M0 6 Q100 0 200 6" stroke="#ffd900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </span>{" "}
                                    Standartlarda Təhsil
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mt-4">
                                    Dil kurslarından xaricdə təhsilə, preschooldan peşəkar sertifikat proqramlarına qədər — hər ehtiyacınız üçün doğru proqram burada.
                                </p>
                            </div>

                            {/* Key advantages */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { Icon: GraduationCap, text: "Sertifikatlı Müəllimlər" },
                                    { Icon: Globe, text: "Beynəlxalq Proqramlar" },
                                    { Icon: User, text: "Fərdi Yanaşma" },
                                ].map(({ Icon, text }) => (
                                    <div key={text} className="flex items-center gap-2.5 bg-background-light dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3">
                                        <Icon className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Program links */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Əsas İstiqamətlər</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { Icon: GraduationCap, label: "Tədris İstiqamətləri", sub: "Dil, IELTS, SAT", href: "/services" },
                                        { Icon: Baby, label: "Preschool", sub: "3–6 yaş proqramları", href: "/preschool" },
                                        { Icon: Award, label: "Təlim Mərkəzi", sub: "Korporativ & sertifikat", href: "/training-center" },
                                    ].map(({ Icon, label, sub, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="group flex items-center gap-3 bg-background-light dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 hover:border-primary hover:shadow-md transition-all"
                                        >
                                            <Icon className="w-5 h-5 text-primary shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate">{label}</p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{sub}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/studyabroad"
                                    className="px-7 py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                    Xaricdə Təhsil <Globe className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => router.push("/about")}
                                    className="px-7 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all"
                                >
                                    Haqqımızda
                                </button>
                            </div>
                        </div>

                        {/* ── RIGHT ── */}
                        <div className="relative hidden lg:flex flex-col gap-3">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                <Image src="/assets/bg.webp" alt="Ingla School" fill sizes="(max-width: 1024px) 0vw, 50vw" className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Zahid Xəlilov 59, Bakı</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                                        <Trophy className="w-5 h-5 text-slate-900" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900 dark:text-white leading-none">98%</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">IELTS məzunları<br />hədəf bala çatır</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900 dark:bg-slate-800 border border-slate-800 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 mb-0.5 leading-tight">Növbəti Başlanğıc</p>
                                        <p className="text-sm font-black text-white leading-none">Hər Ay</p>
                                        <p className="text-[10px] text-primary font-semibold mt-0.5">Yer sayı məhduddur</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ──────────────────────────────────────────── */}
            <section className="bg-background-light dark:bg-background-dark border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map(({ Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-primary" />
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
            {(() => {
                const STATIC_BENTO: BentoItem[] = [
                    { _id: "b1", title: "Dil Kursları & IELTS", description: "Başlanğıcdan C1-ə qədər intensiv dil proqramları və sınaq hazırlığı.", icon: "language", link: "/services", linkLabel: "Proqramlara bax", size: "large", variant: "dark", order: 1 },
                    { _id: "b2", title: "Xaricdə Təhsil", description: "50+ aparıcı universitetə qəbul, viza dəstəyi və tam müşayiət.", icon: "public", link: "/studyabroad", linkLabel: "Ölkələrə bax", size: "tall", variant: "dark", order: 2 },
                    { _id: "b3", title: "Preschool", description: "3–6 yaş uşaqlar üçün oyun əsaslı erkən inkişaf proqramları.", icon: "child_care", link: "/preschool", linkLabel: "Ətraflı", size: "small", variant: "primary", order: 3 },
                    { _id: "b4", title: "Təlim Mərkəzi", description: "Peşəkar sertifikat proqramları.", icon: "workspace_premium", link: "/training-center", linkLabel: "Bax", size: "small", variant: "dark", order: 4 },
                ];
                const displayItems = bentoItems.length > 0 ? bentoItems : STATIC_BENTO;
                return (
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
                                    Bütün proqramlara bax <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <BentoBox items={displayItems} />
                        </div>
                    </section>
                );
            })()}

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
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-primary text-primary" : "text-slate-300 dark:text-slate-600"}`} />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed line-clamp-4 flex-1">
                                        &ldquo;{t.testimonial}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <div className="size-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                                            {t.image ? (
                                                <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                                {t.name}
                                                {t.featured && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
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

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            {(() => {
                const STATIC_FAQ: FAQItem[] = [
                    { id: "s1", question: "Ingla School-da hansı yaş qrupları üçün proqramlar var?", answer: "3 yaşdan yetkinlərə qədər hər kəs üçün proqramımız mövcuddur. Preschool (3–6 yaş), uşaq dil kursları (7–14 yaş), yeniyetmə qrupları (15–17 yaş) və yetkin tələbələr üçün ayrıca proqramlar keçirilir.", category: "general" },
                    { id: "s2", question: "IELTS hazırlıq kursunun müddəti nə qədərdir?", answer: "Başlanğıc səviyyənizə görə dəyişir — adətən 2 aydan 4 aya qədər sürür. İntensiv proqramla daha qısa müddətdə hədəf bala çatmaq mümkündür. Pulsuz ilkin qiymətləndirmə üçün bizimlə əlaqə saxlayın.", category: "ielts" },
                    { id: "s3", question: "Dərslər qrup şəklindədir, yoxsa fərdi?", answer: "Hər iki formatı təklif edirik. Qrup dərsləri (8–12 nəfər) daha əlverişli qiymətə daha çox sosial öyrənmə mühiti yaradır. Fərdi dərslər isə şəxsi cədvəlinizə və sürətinizə tam uyğunlaşır.", category: "general" },
                    { id: "s4", question: "Xaricdə təhsil üçün nə vaxt müraciət etmək lazımdır?", answer: "Əksər universitetlər üçün qəbul müddəti sona 12–18 ay qalmış başlamaq tövsiyə olunur. Sənəd hazırlığı, dil imtahanları və viza prosesi nəzərə alınmaqla erkən müraciət üstünlük verir.", category: "studyabroad" },
                    { id: "s5", question: "Sertifikatlar beynəlxalq səviyyədə tanınırmı?", answer: "IELTS, SAT və digər beynəlxalq imtahanlara hazırlıq proqramlarımız dünya standartlarına uyğundur. Buraxılış sertifikatlarımız isə Azərbaycanda tanınan bir sıra tərəfdaş qurumlar tərəfindən qəbul edilir.", category: "general" },
                    { id: "s6", question: "Qeydiyyat üçün nə etmək lazımdır?", answer: "Bizimlə telefon, WhatsApp və ya e-poçt vasitəsilə əlaqə saxlaya bilərsiniz. Pulsuz ilkin məsləhət və yerləşdirmə testi keçirdikdən sonra sizə ən uyğun proqram tövsiyə ediləcək.", category: "general" },
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
                                            <ChevronDown
                                                className="w-5 h-5 text-primary shrink-0 transition-transform duration-300"
                                                style={{ transform: activeFaq === faq.id ? "rotate(180deg)" : "rotate(0deg)" }}
                                            />
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
                        <div className="relative z-10 flex gap-3 shrink-0">
                            <Link
                                href="/services"
                                className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                Proqramlara Bax <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
