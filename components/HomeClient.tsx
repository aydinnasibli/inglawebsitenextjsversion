"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOMEPAGE_BENTO_QUERY, FAQ_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { SanityFAQItem, SanityTestimonialItem, FAQItem, TestimonialItem } from "@/types/faq-testimonials";
import BentoBox, { BentoItem } from "./BentoBox";

interface HomeClientProps {
    initialBentoData?: BentoItem[];
    initialFaqData?: SanityFAQItem[];
    initialTestimonialsData?: SanityTestimonialItem[];
}

const transformFaqData = (sanityItems: SanityFAQItem[]): FAQItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.question && item.answer)
        .map((item) => ({
            id: item._id,
            question: item.question,
            answer: item.answer,
            category: item.category || 'general',
        }));
};

const transformTestimonialsData = (sanityItems: SanityTestimonialItem[]): TestimonialItem[] => {
    return sanityItems
        .filter(item => item && item._id && item.name && item.testimonial)
        .map((item) => ({
            id: item._id,
            name: item.name,
            position: item.position,
            company: item.company,
            testimonial: item.testimonial,
            image: item.image ? urlFor(item.image).width(96).height(96).quality(85).url() : undefined,
            rating: item.rating || 5,
            program: item.program || 'general',
            featured: item.featured || false,
        }));
};

export default function HomeClient({ initialBentoData, initialFaqData, initialTestimonialsData }: HomeClientProps) {
    const [bentoItems, setBentoItems] = useState<BentoItem[]>(initialBentoData || []);
    const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
    const [activeFaq, setActiveFaq] = useState<string | null>(null);
    const [testimonialItems, setTestimonialItems] = useState<TestimonialItem[]>([]);

    const router = useRouter();

    useEffect(() => {
        if (!initialBentoData || initialBentoData.length === 0) {
            client.fetch<BentoItem[]>(HOMEPAGE_BENTO_QUERY).then(data => {
                if (data && data.length > 0) setBentoItems(data);
            }).catch(console.error);
        }
    }, [initialBentoData]);

    useEffect(() => {
        if (initialFaqData && initialFaqData.length > 0) {
            setFaqItems(transformFaqData(initialFaqData));
        } else {
            client.fetch<SanityFAQItem[]>(FAQ_QUERY).then(data => {
                if (data) setFaqItems(transformFaqData(data));
            }).catch(console.error);
        }

        if (initialTestimonialsData && initialTestimonialsData.length > 0) {
            setTestimonialItems(transformTestimonialsData(initialTestimonialsData));
        } else {
            client.fetch<SanityTestimonialItem[]>(TESTIMONIALS_QUERY).then(data => {
                if (data) setTestimonialItems(transformTestimonialsData(data));
            }).catch(console.error);
        }
    }, [initialFaqData, initialTestimonialsData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-800 dark:text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Yeni Qəbul Davam Edir
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                Gələcəyiniz üçün <span className="text-primary">Ən Yaxşı</span> Başlanğıc.
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                Beynəlxalq standartlara uyğun təhsil proqramları və müasir tədris metodları ilə gələcəyinizi formalaşdırın.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => router.push('/services')} className="h-14 px-8 bg-primary text-slate-900 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                                Bizim Proqramlar <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button onClick={() => router.push('/about')} className="h-14 px-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                Haqqımızda
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full aspect-[4/3] bg-center bg-cover rounded-2xl shadow-2xl relative z-10 overflow-hidden" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-2xl -z-0 opacity-20 rotate-12"></div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Aktiv Tələbələr</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">5,000+</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Qəbul Faiz</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">98%</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-3xl">corporate_fare</span>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Tərəfdaşlar</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">50+</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-3xl">star</span>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Məmnuniyyət</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">4.9/5</p>
                    </div>
                </div>
            </div>

            {/* Bento Box Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                            Bizim <span className="text-primary">Təkliflərimiz</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Ingla School-da təhsil təcrübənizi daha da zənginləşdirən proqramları kəşf edin
                        </p>
                    </div>

                    {bentoItems.length > 0 ? (
                        <BentoBox items={bentoItems} />
                    ) : (
                        /* Fallback static bento when CMS is empty */
                        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
                            {/* Large card */}
                            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group bg-slate-900 text-white cursor-pointer" onClick={() => router.push('/services')}>
                                <Image src="/assets/bg.webp" alt="Tədris İstiqamətləri" fill className="object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="relative z-10 p-8 h-full flex flex-col">
                                    <span className="material-symbols-outlined text-primary text-4xl mb-auto">school</span>
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">Tədris İstiqamətləri</h3>
                                        <p className="text-slate-300 text-sm mb-4 line-clamp-2">İngilis dili, IELTS hazırlığı, SAT və digər peşəkar kurslar.</p>
                                        <span className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all">Ətraflı Bax <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Wide card */}
                            <div className="col-span-2 row-span-1 rounded-2xl bg-primary text-slate-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => router.push('/studyabroad')}>
                                <span className="material-symbols-outlined text-4xl text-slate-900/70">public</span>
                                <div>
                                    <h3 className="text-2xl font-bold">Xaricdə Təhsil</h3>
                                    <p className="text-slate-800 text-sm">Dünyanın qabaqcıl universitetlərinde oxu.</p>
                                </div>
                            </div>

                            {/* Small card */}
                            <div className="col-span-1 row-span-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => router.push('/preschool')}>
                                <span className="material-symbols-outlined text-primary text-4xl">child_care</span>
                                <h3 className="text-lg font-bold">Preschool</h3>
                            </div>

                            {/* Small card */}
                            <div className="col-span-1 row-span-1 rounded-2xl bg-slate-900 dark:bg-black text-white p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => router.push('/training-center')}>
                                <span className="material-symbols-outlined text-primary text-4xl">workspace_premium</span>
                                <h3 className="text-lg font-bold">Təlim Mərkəzi</h3>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            {testimonialItems.length > 0 && (
                <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                        <div className="text-center mb-16">
                            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">Tələbə Rəyləri</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Ingla School məzunları və tələbələrinin uğur hekayələri və təcrübələri.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonialItems.slice(0, 3).map((testimonial) => (
                                <div key={testimonial.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <div className="flex text-primary mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[18px]">
                                                {i < testimonial.rating ? 'star' : 'star_border'}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 italic mb-6 line-clamp-4">
                                        &ldquo;{testimonial.testimonial}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 bg-slate-200">
                                            {testimonial.image ? (
                                                <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full flex justify-center items-center text-slate-400">
                                                    <span className="material-symbols-outlined">person</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h5 className="text-slate-900 dark:text-white font-bold text-sm flex items-center gap-1">
                                                {testimonial.name} {testimonial.featured && <span className="material-symbols-outlined text-primary text-[14px]">verified</span>}
                                            </h5>
                                            <p className="text-slate-500 text-xs">
                                                {testimonial.position} {testimonial.company && `at ${testimonial.company}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Corporate CTA */}
            <section className="bg-slate-900 dark:bg-black text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Təlim Mərkəzimiz</h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Şirkətiniz və işçiləriniz üçün xüsusi hazırlanmış korporativ təlimlər. Biznesinizin inkişafı üçün peşəkar kadrların hazırlanması.
                            </p>
                            <ul className="flex flex-col gap-4 mb-10">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span>İxtisaslaşmış biznes təlimləri</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span>Kommunikasiya və liderlik üzrə kurslar</span>
                                </li>
                            </ul>
                            <button onClick={() => router.push('/training-center')} className="px-10 py-4 bg-primary text-slate-900 rounded-lg font-bold text-lg hover:brightness-105 transition-all">
                                Daha Ətraflı
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                                <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="/assets/bg.webp" alt="Training center" />
                            </div>
                            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 translate-y-8">
                                <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="/assets/bg.webp" alt="Training center" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {faqItems.length > 0 && (
                <section className="max-w-3xl mx-auto px-6 py-20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Tez-tez Verilən Suallar</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        {faqItems.slice(0, 5).map(faq => (
                            <div key={faq.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all shadow-sm">
                                <button
                                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                                >
                                    <span className="font-bold text-slate-900 dark:text-white">{faq.question}</span>
                                    <span className="material-symbols-outlined text-primary transition-transform duration-300" style={{ transform: activeFaq === faq.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                </button>
                                {activeFaq === faq.id && (
                                    <div className="px-6 pb-4 pt-2 text-slate-600 dark:text-slate-400">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
