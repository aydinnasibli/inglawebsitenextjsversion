"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { COUNTRIES_QUERY } from "@/sanity/lib/queries";
import { SanityCountry, Country } from "@/types/study-abroad";

interface StudyAbroadClientProps {
    initialCountriesData?: SanityCountry[];
}

export default function StudyAbroadClient({ initialCountriesData }: StudyAbroadClientProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(!initialCountriesData);

    useEffect(() => {
        let isMounted = true;

        const loadCountries = async () => {
            try {
                if (initialCountriesData && initialCountriesData.length > 0) {
                    if (isMounted) {
                        setCountries(initialCountriesData.map(c => ({
                             id: c._id, name: c.name, slug: c.slug.current, shortDescription: c.shortDescription || "", nameAz: c.nameAz || "", flagImage: c.flagImage ? urlFor(c.flagImage).url() : "", coverImage: c.coverImage ? urlFor(c.coverImage).url() : "",
                            image: c.coverImage ? urlFor(c.coverImage).width(800).height(600).url() : '/assets/bg.webp',
                            universitiesCount: c.universitiesCount ?? 5
                        })));
                        setIsLoading(false);
                    }
                    return;
                }

                const data = await client.fetch<SanityCountry[]>(COUNTRIES_QUERY);

                if (isMounted) {
                    if (data && data.length > 0) {
                        setCountries(data.map(c => ({
                             id: c._id, name: c.name, slug: c.slug.current, shortDescription: c.shortDescription || "", nameAz: c.nameAz || "", flagImage: c.flagImage ? urlFor(c.flagImage).url() : "", coverImage: c.coverImage ? urlFor(c.coverImage).url() : "",

                            image: (c as any).image ? urlFor((c as any).image).width(800).height(600).url() : '/assets/bg.webp',
                            universitiesCount: (c as any).universitiesCount || 0
                        })));
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching countries data:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        loadCountries();

        return () => {
            isMounted = false;
        };
    }, [initialCountriesData]);

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Hero Section */}
            <div className="px-6 md:px-20 py-8">
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('/assets/bg.webp')" }}>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <h1 className="text-white text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
                            Dünyanı Kəşf Et: <span className="text-primary">Xaricdə Təhsil</span>
                        </h1>
                        <p className="text-slate-200 mt-4 max-w-xl text-lg">
                            Qlobal imkanları kəşf edin, yeni mədəniyyətlərlə tanış olun və dünyanın qabaqcıl universitetlərində karyeranızı inkişaf etdirin.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <button className="bg-primary text-background-dark px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">Başla</button>
                            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-all">Proqramlara Bax</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Destinations */}
            <div className="px-6 md:px-20 pb-12 pt-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Populyar Ölkələr</h2>
                        <p className="text-slate-500 dark:text-slate-400">Tələbələrimizin ən çox seçdiyi təhsil mərkəzləri</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {countries.length > 0 ? countries.map(country => (
                            <Link href={`/studyabroad/${country.slug || ''}`} key={country.id} className="group cursor-pointer">
                                <div className="h-64 rounded-xl overflow-hidden mb-3 relative">
                                    <Image
                                        src={(country as any).image || '/assets/bg.webp'}
                                        alt={country.name || 'Country'}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                                        {(country as any).code || 'INT'}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{country.name}</h3>
                                <p className="text-slate-500 text-sm">{country.universitiesCount ?? 5}+ Tərəfdaş Universitet</p>
                            </Link>
                        )) : (
                            // Fallback items if CMS is empty
                            <>
                                <div className="group cursor-pointer">
                                    <div className="h-64 rounded-xl overflow-hidden mb-3 relative">
                                        <Image src="/assets/bg.webp" alt="UK" fill className="object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">UK</div>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Böyük Britaniya</h3>
                                    <p className="text-slate-500 text-sm">12 Tərəfdaş Universitet</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="h-64 rounded-xl overflow-hidden mb-3 relative">
                                        <Image src="/assets/bg.webp" alt="USA" fill className="object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">USA</div>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Amerika Birləşmiş Ştatları</h3>
                                    <p className="text-slate-500 text-sm">15 Tərəfdaş Universitet</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="h-64 rounded-xl overflow-hidden mb-3 relative">
                                        <Image src="/assets/bg.webp" alt="Canada" fill className="object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">CA</div>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Kanada</h3>
                                    <p className="text-slate-500 text-sm">8 Tərəfdaş Universitet</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="h-64 rounded-xl overflow-hidden mb-3 relative">
                                        <Image src="/assets/bg.webp" alt="Germany" fill className="object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">DE</div>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Almaniya</h3>
                                    <p className="text-slate-500 text-sm">20 Tərəfdaş Universitet</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Application Process */}
            <div className="px-6 md:px-20 py-20 bg-slate-50 dark:bg-slate-900/30">
                <div className="grid md:grid-cols-2 gap-16 items-center max-w-[1200px] mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Səyahətiniz Buradan Başlayır</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">Beynəlxalq qəbul prosesini anlamaq çətin olmamalıdır. Bizim 4 mərhələli asanlaşdırılmış prosesimiz sizi hər addımda dəstəkləyir.</p>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="size-10 flex-shrink-0 bg-primary/20 dark:bg-primary/10 text-primary flex items-center justify-center rounded-lg font-bold">1</div>
                                <div>
                                    <h4 className="font-bold mb-1">Proqramı Seçin</h4>
                                    <p className="text-sm text-slate-500">Maraqlarınıza və məqsədlərinizə uyğun olaraq müxtəlif ölkələrdən yüzlərlə proqram arasından seçim edin.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-10 flex-shrink-0 bg-primary/20 dark:bg-primary/10 text-primary flex items-center justify-center rounded-lg font-bold">2</div>
                                <div>
                                    <h4 className="font-bold mb-1">Məsləhətçimizlə Əlaqə</h4>
                                    <p className="text-sm text-slate-500">Uyğunluq, xərclər və təqaüd imkanlarını müzakirə etmək üçün pulsuz seans sifariş edin.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-10 flex-shrink-0 bg-primary/20 dark:bg-primary/10 text-primary flex items-center justify-center rounded-lg font-bold">3</div>
                                <div>
                                    <h4 className="font-bold mb-1">Müraciətin Göndərilməsi</h4>
                                    <p className="text-sm text-slate-500">Komandamız sənədlərin hazırlanmasında və eyni anda bir neçə universitetə müraciət göndərilməsində kömək edəcək.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-10 flex-shrink-0 bg-primary/20 dark:bg-primary/10 text-primary flex items-center justify-center rounded-lg font-bold">4</div>
                                <div>
                                    <h4 className="font-bold mb-1">Viza və Səyahət Hazırlığı</h4>
                                    <p className="text-sm text-slate-500">Viza prosesində tam dəstək alın və uçuşdan əvvəl təşkil etdiyimiz oriyentasiya sessiyalarına qoşulun.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[500px] w-full">
                        <Image
                            src="/assets/bg.webp"
                            alt="Student applying"
                            fill
                            className="rounded-2xl shadow-2xl object-cover"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-xl shadow-lg hidden lg:block z-10">
                            <p className="text-background-dark font-bold text-2xl">98%</p>
                            <p className="text-background-dark/80 text-xs font-medium uppercase">Viza Təsdiq Faizi</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map / Quick Selection */}
            <div className="px-6 md:px-20 pb-20 pt-20">
                <div className="bg-background-dark text-white rounded-3xl p-8 md:p-12 overflow-hidden relative max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="max-w-md">
                            <h2 className="text-3xl font-bold mb-4">Məqsədinizə Doğru Addım Atın</h2>
                            <p className="text-slate-400 mb-6">Beynəlxalq təhsillə həyatını dəyişdirən tələbələrimizin arasına qoşulun.</p>
                            <button className="bg-primary text-background-dark px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                                Xəyalınızdakı Kursu Tapın
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <span className="material-symbols-outlined text-[180px] text-white/10 select-none">public</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
                </div>
            </div>
        </div>
    );
}
