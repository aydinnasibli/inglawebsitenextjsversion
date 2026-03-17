"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Training } from "@/types/training";

interface TrainingClientProps {
    initialTrainings: Training[];
}

export default function TrainingClient({ initialTrainings }: TrainingClientProps) {
    const [trainings] = useState<Training[]>(initialTrainings);

    // Helper functions
    const getLevelBadgeColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-500/20 text-green-700 dark:text-green-400';
            case 'intermediate':
                return 'bg-primary/20 text-slate-900 dark:text-primary';
            case 'advanced':
                return 'bg-red-500/20 text-red-700 dark:text-red-400';
            default:
                return 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <div className="layout-container flex h-full grow flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-4">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        Yeni Mövsüm Üçün Qeydiyyat
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                        Biznesin <span className="text-primary">Yeni Erası</span> Üçün Bacarıqlara Yiyələnin.
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                                        Müasir işçi qüvvəsi üçün hazırlanmış sənaye tərəfindən tanınan sertifikatlar və korporativ proqramlar. Ekspertlərin rəhbərlik etdiyi təlimlərlə karyeranızı yüksəldin.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <button className="h-14 px-8 bg-primary text-slate-900 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                                        Proqramlara Bax <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <button className="h-14 px-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                        Satışla Əlaqə
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-full aspect-[4/3] bg-center bg-cover rounded-2xl shadow-2xl relative z-10 overflow-hidden" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6Kmh78hcVoIcMZF2-8DvMmcGeMop0AlWoczBjByzBXw03iiDuqUDdDSCTGi7kK-EeyodnyK7QgyvnmH27eXZwT3BU8o42UakGWDeTvqvi8_zAFPg8LjLIZEq_VxzanXHtyhC9trI8rIurFC1uDiXiE2F5--kclI69nJ4aAXcgKhYRkoH3YhaKh1rJ4Pq6pwtmMrZllrIwx7xfVOL4mX6e_4LnGVrchGATHRPa8nLD0vlNGLkS9tJSg8Ndu3yfk4VANkw0MLcbPjLW")' }}></div>
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
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Aktiv Öyrənənlər</p>
                                <p className="text-3xl font-extrabold">15,000+</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Sertifikat Oranı</p>
                                <p className="text-3xl font-extrabold">98.4%</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="material-symbols-outlined text-primary text-3xl">corporate_fare</span>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Tərəfdaşlar</p>
                                <p className="text-3xl font-extrabold">250+</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="material-symbols-outlined text-primary text-3xl">star</span>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Ortalama Reytinq</p>
                                <p className="text-3xl font-extrabold">4.9/5</p>
                            </div>
                        </div>
                    </div>

                    {/* Categories / Trainings */}
                    <section className="max-w-7xl mx-auto px-6 py-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-2">Təlim Kateqoriyalarını Kəşf Edin</h2>
                                <p className="text-slate-500 dark:text-slate-400">Hər bir peşəkar mərhələ üçün xüsusi öyrənmə yolları.</p>
                            </div>
                            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 overflow-x-auto pb-0">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-primary text-slate-900 dark:text-white gap-2 pb-3 pt-2 group" href="#">
                                    <span className="material-symbols-outlined text-primary">grid_view</span>
                                    <p className="text-sm font-bold whitespace-nowrap">Bütün Proqramlar</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white gap-2 pb-3 pt-2 transition-all" href="#">
                                    <span className="material-symbols-outlined">workspace_premium</span>
                                    <p className="text-sm font-bold whitespace-nowrap">Sertifikatlar</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white gap-2 pb-3 pt-2 transition-all" href="#">
                                    <span className="material-symbols-outlined">business_center</span>
                                    <p className="text-sm font-bold whitespace-nowrap">Korporativ</p>
                                </a>
                            </div>
                        </div>

                        {trainings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {trainings.map((training) => (
                                    <Link key={training._id} href={`/training-center/${training.slug.current}`} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${training.featuredImage ? urlFor(training.featuredImage).width(600).height(400).url() : 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6vg-OJRv0BUSM4BNynx2OW_4ZZtLpkpe6ZFp3gUyI9sx6iXsWFFDm-hYz5oPtspC6tmMSXNaSROmGyz6982ntgEWbgnTpi1az4epFq_PHAhekOCnDb75eYyUsUZyiJ9Ay42T0Th5kwC-IgEGl7UQPjo38oKSXE_fJbiz0bquxDGoKY4mp4A1ZuAVFcuqOJbYeaSYJw8bNPUzYAzsDmTuQLH96Rc4oy_Pcq0j3Rl7IStefKcDE5P0_bzT9d7ffzLP9OX1uNV5pQhD3'})` }}></div>
                                            {training.category && (
                                                <div className="absolute top-4 left-4 bg-primary text-slate-900 text-[10px] font-black px-2 py-1 rounded uppercase">
                                                    {training.category}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col gap-4 grow">
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold text-slate-500 uppercase">{training.instructor || 'Təlimçi'}</span>
                                                {training.price && (
                                                    <span className="text-primary font-bold">${training.price}</span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{training.title}</h3>
                                            <p className="text-sm text-slate-500 line-clamp-2 grow">{training.description}</p>

                                            <div className="flex items-center gap-4 py-2 mt-auto border-t border-slate-100 dark:border-slate-800">
                                                {training.duration && (
                                                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                                        <span className="material-symbols-outlined text-sm">schedule</span> {training.duration}
                                                    </div>
                                                )}
                                                {training.level && (
                                                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${getLevelBadgeColor(training.level)}`}>
                                                        <span className="material-symbols-outlined text-sm">bar_chart</span> {training.level}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">school</span>
                                <h3 className="text-xl font-bold mb-2">Hazırda təlim yoxdur</h3>
                                <p className="text-slate-500">Yeni təlim imkanları üçün tezliklə yoxlayın!</p>
                            </div>
                        )}
                    </section>

                    {/* Corporate CTA */}
                    <section className="bg-slate-900 dark:bg-black text-white py-20">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl font-bold mb-6">Bütün Komandanızı Öyrədin</h2>
                                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                        Təşkilatınız daxilində bacarıq boşluqlarını bağlamaq və innovasiyanı idarə etmək üçün hazırlanmış fərdiləşdirilmiş korporativ təlim paketləri. Əyani və uzaqdan hibrid seçimlər təklif edirik.
                                    </p>
                                    <ul className="flex flex-col gap-4 mb-10">
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">check_circle</span>
                                            <span>Fərdiləşdirilmiş Kurikulum Uyğunlaşdırılması</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">check_circle</span>
                                            <span>Kütləvi Qeydiyyat Endirimləri</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">check_circle</span>
                                            <span>Müəssisə İrəliləyiş İdarəetmə Paneli</span>
                                        </li>
                                    </ul>
                                    <button className="px-10 py-4 bg-primary text-slate-900 rounded-lg font-bold text-lg hover:brightness-105 transition-all">
                                        Demo Tələb Et
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                                        <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAOV188Kg84ZGiftQiXfvlnv7u9jXc7A9nZDAiauNzN_lwgA0KyW03o5JqjbSrlSW0L8oUfk_HbvIM_xY2bkgTg9H5wZ_ovLZrxqKfHaJQBRjg3LDVpAo5T0MF5YLVJ0Bj4BS7p-IReJ3OONcC426eU5EkbfceDHw340bRFZiZWPH8TLJzMk6z5zoUlVzzcbCT4aWqYZe9WfPbSFiKRg_ansqoXLytw8DB7MeRh-67rQMy-X8DMhT63q0I1QpDxBbQDUtp7Jm4RMoG" alt="Corporate training" />
                                    </div>
                                    <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 translate-y-8">
                                        <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6x1MxgPKL8V0uv-_ADriTUL2GzXNNhI9CrM1910ih0fYUPNFY3Ema7YshsexhcEVyXjI8l7sNN9VPDmAD_obCDFQzo7RIZuuScV9OeNtaJW0xDarUEsvguD0Xn-FKv7_dbu_CKbT2eK1qozgPz8kdUds9WMmZGYVWxK8czwHsozyManKs6mi5w2CncjghUA8Wx5fMzhpCP9K4lRNNcDLheDSBU59J8x7coQ9QeaScp59Evv3mzdQUffwQ2N2d0F3vH14mslhYb-8m" alt="Executive team" />
                                    </div>
                                    <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                                        <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpPr6G27w__jG2-aCTEpumvpX-pBPo3feYOzIFphuLk2RkbNz_A8Iv8EMBULwmn9IiYJO-YskS7kWrtltgaVx4QyC3KudrK9w1OoPhTrfrI0X-05lhX-troWmWYekN3RWgNO6vJo-ehpU96u6v2iKUrhgETuTBPoJvdJeIxM_ugxHCtmp-VgaDvdk6JQeRP2FFgogu7gPGiFzd7b7XYVZ_v9yZU7mP0nI22gu0OY5IZXSlF6DShimsVro3iDZDJGAbq9cV1bnEiJ68" alt="Colleagues discussing" />
                                    </div>
                                    <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 translate-y-8">
                                        <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFWhVldhNnxwlF0N4MQACdmFF6W4-qjobhbBM8Ktl_V94oOkFRe80ABIJWDZDu9gaPbJx-QFY_pUNv-nLxj7VJ-lEx9CyEPD7yNsk5T4BED9HXlZe6c_df64RbjKoNQLhTyTL9XfLjEGJmUxwnTW-7SbI-itald3sruEgvTFoj9JFmCXkH9J18F8uHYXq7_ZXC5DcX0kfkr17N7W9aXTM2DlDGX_kk5y1C1ElbRWVJvJ3l13B_VXZ7kyEkfgakuwXVec5UoLReQlrz" alt="Modern workspace" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
