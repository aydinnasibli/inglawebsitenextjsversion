"use client";

import {
    Award, GraduationCap, Users, Globe,
    Lightbulb, UserCheck, Handshake, Heart, Eye,
    TrendingUp, ThumbsUp, Sparkles, BadgeCheck,
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-slate-800 dark:text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                Haqqımızda
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Gələcəyin İnnovativ <span className="text-primary">Lideri</span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                İllərlə formalaşan təcrübə ilə sizi uğura aparan bilik və metodlarla zənginləşdiririk. Keyfiyyətli təhsil və innovativ yanaşmalarla gələcəyinizə sərmayə edin.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full aspect-[4/3] bg-center bg-cover rounded-2xl shadow-2xl relative z-10 overflow-hidden" style={{ backgroundImage: "url('/assets/bg.webp')" }}></div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-2xl -z-0 opacity-20 rotate-12"></div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Uğur Hekayəmiz</h2>
                    <p className="text-slate-500 dark:text-slate-400">Bizimlə birlikdə irəliləyənlər</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <Award className="w-8 h-8 text-primary mb-2 mx-auto" />
                        <p className="text-3xl font-extrabold text-primary">13+</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">İllik Təcrübə</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <GraduationCap className="w-8 h-8 text-primary mb-2 mx-auto" />
                        <p className="text-3xl font-extrabold text-primary">500+</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">Məzun Tələbə</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <Users className="w-8 h-8 text-primary mb-2 mx-auto" />
                        <p className="text-3xl font-extrabold text-primary">50+</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">Təcrübəli Müəllim</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <Globe className="w-8 h-8 text-primary mb-2 mx-auto" />
                        <p className="text-3xl font-extrabold text-primary">15+</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">Ölkəyə Məzun</p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-20 mt-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-4 mb-12">
                        <h2 className="text-primary font-bold text-sm tracking-widest uppercase">Prinsiplərimiz</h2>
                        <h3 className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                            Dəyərlərimiz
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <Award className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Keyfiyyət</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Təhsil və təqdim etdiyimiz xidmətlərdə yüksək standartları qoruyuruq.
                                </p>
                            </div>
                        </div>
                        {/* Value 2 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">İnnovasiya</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Yenilikçi metodlar və texnologiyalardan istifadə edərək daim inkişaf edirik.
                                </p>
                            </div>
                        </div>
                        {/* Value 3 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <UserCheck className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Fərdi Yanaşma</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Hər insanın və müəssisənin ehtiyaclarına uyğun fərdi həllər hazırlayırıq.
                                </p>
                            </div>
                        </div>
                        {/* Value 4 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <Handshake className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Beynəlxalq Əməkdaşlıq</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Akademik və biznes tərəfdaşlıqlar quraraq qlobal rəqabətə davamlı mütəxəssislər yetişdiririk.
                                </p>
                            </div>
                        </div>
                        {/* Value 5 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <Heart className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Məsuliyyətlilik</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Cəmiyyət və fərdlər qarşısında etik və sosial məsuliyyətimizi qoruyuruq.
                                </p>
                            </div>
                        </div>
                        {/* Value 6 */}
                        <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-all shadow-sm">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                                <Eye className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Şəffaflıq və Dürüstlük</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Müştərilərimizlə açıq və etibarlı əməkdaşlıq qururuq.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Goals Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center gap-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        Hədəflərimiz
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
                        Gələcək üçün müəyyən etdiyimiz əsas istiqamətlər və hədəflər
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Qlobal Mövqe və İnkişaf</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Şirkət olaraq qlobal bazarda daha geniş yer tutmağı və beynəlxalq əməkdaşlıqlar qurmağı hədəfləyirik.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            <ThumbsUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Müştəri Məmnuniyyəti</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Keyfiyyətə verdiyimiz önəm sayəsində, ən effektiv və etibarlı həlləri təqdim etməyə sadiqik.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">İnnovasiya və Fərdi Yanaşma</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Daim yenilənən texnologiyalar vasitəsilə fərdi yanaşmanı əsas götürərək xüsusi həllər hazırlayırıq.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            <BadgeCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">Dəyər Yaratmaq</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Cəmiyyət qarşısında məsuliyyətli yanaşmanı qoruyaraq dayanıqlı inkişafı təmin etməyə çalışırıq.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
