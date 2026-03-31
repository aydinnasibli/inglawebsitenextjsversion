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
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 w-full max-w-[1200px] mx-auto px-6 py-8">
            {/* Hero Section */}
            <section className="mb-12 overflow-hidden rounded-xl relative group">
                <div className="bg-cover bg-center min-h-[400px] flex flex-col justify-end p-8 md:p-12 relative" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%), url('/assets/bg.webp')" }}>
                    <div className="max-w-2xl relative z-10 text-white">
                        <span className="inline-block bg-primary text-background-dark px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">Yeni Qəbul Başladı</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Hər Bir Öyrənən Üçün Təhsil</h1>
                        <p className="text-slate-200 text-lg mb-8">Akademik mükəmməlliyi, yaradıcı düşüncəni və ömür boyu davam edən uğuru təşviq etmək üçün hazırlanmış fərdiləşdirilmiş təlim yolları.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary text-background-dark px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">Proqramları Kəşf Et</button>
                            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all">Bizim Hekayəmiz</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <nav className="flex border-b border-slate-200 dark:border-slate-800 mb-10 overflow-x-auto no-scrollbar">
                <a className="flex-none px-6 py-4 border-b-2 border-primary text-slate-900 dark:text-slate-100 font-bold text-sm" href="#programs">Təlim Proqramları</a>
                <a className="flex-none px-6 py-4 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-primary transition-colors" href="#tutoring">Ekspert Xidmətləri</a>
                <a className="flex-none px-6 py-4 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-primary transition-colors" href="#curriculum">Kurikulum Dəstəyi</a>
            </nav>

            {/* Programs Section */}
            <section className="mb-16" id="programs">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Təlim Proqramları</h2>
                        <p className="text-slate-600 dark:text-slate-400">Erkən kəşfdən peşəkar inkişafa qədər hər inkişaf mərhələsi üçün hazırlanmış hərtərəfli təlim modulları.</p>
                    </div>
                    <button className="text-primary font-bold flex items-center gap-1 hover:underline">
                        Bütün proqramlar <span className="material-symbols-outlined">arrow_right_alt</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trainings.length > 0 ? trainings.map((training) => (
                        <div key={training._id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <Image
                                    src={training.featuredImage ? urlFor(training.featuredImage).width(400).height(300).url() : '/assets/bg.webp'}
                                    alt={training.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-primary uppercase line-clamp-1">{training.category || 'Ümumi'}</span>
                                    <span className="text-xs text-slate-400 flex-shrink-0">{training.level || 'Bütün'}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 line-clamp-2">{training.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{training.description || 'Proqram haqqında ətraflı məlumat üçün klikləyin.'}</p>
                                <Link href={`/training-center/${training.slug.current}`} className="text-primary font-semibold text-sm flex items-center gap-1 mt-auto">
                                    Daha ətraflı <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        // Fallback items if CMS is empty
                        <>
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <Image src="/assets/bg.webp" alt="Training" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-primary uppercase">Təməl</span>
                                        <span className="text-xs text-slate-400">Başlanğıc</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Ünsiyyət Bacarıqları</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">İş mühitində effektiv kommunikasiya və təqdimat bacarıqlarının inkişaf etdirilməsi.</p>
                                    <Link href="#" className="text-primary font-semibold text-sm flex items-center gap-1 mt-auto">Daha ətraflı <span className="material-symbols-outlined text-sm">open_in_new</span></Link>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <Image src="/assets/bg.webp" alt="Training" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-primary uppercase">Biznes</span>
                                        <span className="text-xs text-slate-400">Orta</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Layihə İdarəetməsi</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">Agile və Scrum metodologiyaları ilə layihələrin effektiv idarə olunması.</p>
                                    <Link href="#" className="text-primary font-semibold text-sm flex items-center gap-1 mt-auto">Daha ətraflı <span className="material-symbols-outlined text-sm">open_in_new</span></Link>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <Image src="/assets/bg.webp" alt="Training" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-primary uppercase">Liderlik</span>
                                        <span className="text-xs text-slate-400">İrəli</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Strateji Liderlik</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">Böyük komandaları idarə etmək və böhran vəziyyətlərində düzgün qərarlar qəbul etmək.</p>
                                    <Link href="#" className="text-primary font-semibold text-sm flex items-center gap-1 mt-auto">Daha ətraflı <span className="material-symbols-outlined text-sm">open_in_new</span></Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Tutoring Services */}
            <section className="mb-16 bg-primary/10 rounded-2xl p-8 md:p-12" id="tutoring">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-6">Ekspert 1-ə-1 Xidmətlər</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-primary size-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-background-dark">person_search</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Sahə Ekspertləri</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Öz sahələrində ən azı magistr dərəcəsi olan peşəkar təlimçilər.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-primary size-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-background-dark">video_chat</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Çevik Modallıqlar</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Mərkəzimizdə əyani dərslər və ya interaktiv onlayn siniflər arasında seçim edin.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-primary size-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-background-dark">trending_up</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">İnkişafın İzlənməsi</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Həftəlik ətraflı hesabatlar və mütəmadi olaraq fərdi məsləhətləşmələr.</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Pulsuz Qiymətləndirmə Sifariş Et</button>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-primary/20 rounded-full absolute -top-4 -right-4 w-full h-full -z-10"></div>
                        <div className="rounded-2xl shadow-xl w-full aspect-[4/3] relative overflow-hidden">
                            <Image src="/assets/bg.webp" alt="Tutor" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum Support */}
            <section className="mb-16" id="curriculum">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4">Korporativ Dəstək</h2>
                    <p className="text-slate-600 dark:text-slate-400">Tədris metodologiyalarını və resurs imkanlarını artırmaq üçün təhsil və biznes müəssisələri ilə tərəfdaşlıq edirik.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4">menu_book</span>
                        <h4 className="font-bold mb-2">Xüsusi Vəsaitlər</h4>
                        <p className="text-sm text-slate-500">Rəqəmsal və fiziki tədris materialları.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4">psychology</span>
                        <h4 className="font-bold mb-2">Müəllim Təlimləri</h4>
                        <p className="text-sm text-slate-500">Müasir pedaqoji alətlər üzrə seminarlar.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4">quiz</span>
                        <h4 className="font-bold mb-2">Qiymətləndirmə</h4>
                        <p className="text-sm text-slate-500">Geniş test resursları bazası.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4">cloud_done</span>
                        <h4 className="font-bold mb-2">LMS İnteqrasiyası</h4>
                        <p className="text-sm text-slate-500">Rəqəmsal platformalara qüsursuz bağlantı.</p>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-background-dark text-white rounded-2xl p-10 flex flex-col items-center text-center relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Təhsil trendlərindən xəbərdar olun</h3>
                <p className="text-slate-400 max-w-md mb-8 relative z-10">Həftəlik məlumat və resurs bələdçilərimizi alan 10,000+ şəxsə qoşulun.</p>
                <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10">
                    <input className="flex-1 bg-slate-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm outline-none text-white" placeholder="E-poçt ünvanınız" type="email" />
                    <button className="bg-primary text-background-dark font-bold px-6 py-3 rounded-lg hover:brightness-105 transition-all" type="submit">Abunə ol</button>
                </form>
            </section>
        </div>
    );
}
