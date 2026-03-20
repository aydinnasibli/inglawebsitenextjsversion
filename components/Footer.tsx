"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/assets/logoingla.png'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 mt-auto">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center bg-primary rounded p-1">
                            <Image className='w-8 h-auto object-contain' src={Logo} alt='Ingla School Logo' />
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">Ingla School</h2>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri təqdim edirik.
                        Beynəlxalq standartlarda keyfiyyətli təhsil xidmətləri.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-primary transition-colors" href="https://facebook.com"><span className="material-symbols-outlined">public</span></a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="https://instagram.com"><span className="material-symbols-outlined">photo_camera</span></a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="mailto:info@inglaschool.az"><span className="material-symbols-outlined">mail</span></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100">Əsas Səhifələr</h4>
                    <ul className="flex flex-col gap-4 text-sm text-slate-500">
                        <li><Link className="hover:text-primary transition-colors" href="/services">Tədris İstiqamətləri</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/studyabroad">Xaricdə Təhsil</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/preschool">Preschool</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/training-center">Təlim Mərkəzi</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/about">Haqqımızda</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100">Əlaqə Məlumatları</h4>
                    <ul className="flex flex-col gap-4 text-sm text-slate-500">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary mt-0.5 flex-shrink-0">location_on</span>
                            <div>
                                <span className="block">Grand Hayat Yaşayış Kompleksi</span>
                                <span className="block">9-cu bina, 4-cü mərtəbə</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                            <a href="tel:+994103107117" className="hover:text-primary transition-colors">+994 10 310 71 17</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                            <a href="mailto:info@inglaschool.az" className="hover:text-primary transition-colors">info@inglaschool.az</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100">İş Saatları</h4>
                    <ul className="flex flex-col gap-4 text-sm text-slate-500">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                            Əmək vaxtı
                        </li>
                        <li className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900/50">
                            <span>Həftəiçi:</span>
                            <span className="text-primary font-medium">09:00 - 18:00</span>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900/50">
                            <span>Bazar:</span>
                            <span className="text-red-500 font-medium">Bağlıdır</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                <p>© {currentYear} Ingla School. Bütün hüquqlar qorunur.</p>
                <div className="flex gap-6">
                    <Link className="hover:text-primary transition-colors" href="/privacy">Məxfilik</Link>
                    <Link className="hover:text-primary transition-colors" href="/terms">İstifadə şərtləri</Link>
                    <Link className="hover:text-primary transition-colors" href="/cookies">Cookie</Link>
                </div>
            </div>
        </footer>
    );
}
