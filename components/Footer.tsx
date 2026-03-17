import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/assets/logoingla.png'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-16 pb-8 mt-auto relative z-10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Logo and Description */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100 mb-6">
                            <div className="size-10 bg-primary rounded flex items-center justify-center overflow-hidden">
                                <Image src={Logo} alt="Ingla School Logo" className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-lg font-bold">Ingla School</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri təqdim edirik. Beynəlxalq standartlarda keyfiyyətli təhsil xidmətləri.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">public</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">share</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Əsas Səhifələr</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/services" className="hover:text-primary transition-colors">Tədris İstiqamətləri</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">Haqqımızda</Link></li>
                            <li><Link href="/studyabroad" className="hover:text-primary transition-colors">Xaricdə Təhsil</Link></li>
                            <li><Link href="/preschool" className="hover:text-primary transition-colors">Preschool</Link></li>
                            <li><Link href="/training-center" className="hover:text-primary transition-colors">Təlim Mərkəzi</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Əlaqə</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[18px] mt-0.5">location_on</span>
                                <span>Grand Hayat Yaşayış Kompleksi<br/>9-cu bina, 4-cü mərtəbə</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                                <a href="tel:+994103107117" className="hover:text-primary transition-colors">+994 10 310 71 17</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                <a href="mailto:info@inglaschool.az" className="hover:text-primary transition-colors">info@inglaschool.az</a>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">İş Saatları</h4>
                        <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                                <span>Həftəiçi:</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">09:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <span>Bazar:</span>
                                <span className="font-medium text-red-500">Bağlıdır</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">© {currentYear} Ingla School. Bütün hüquqlar qorunur.</p>
                    <div className="flex gap-6 text-xs text-slate-400">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Məxfilik</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">İstifadə şərtləri</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookie</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
