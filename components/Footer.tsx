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
                        <div>
                            <Image className='h-16 w-auto object-contain' src={Logo} alt='Ingla School Logo' />
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">Ingla School</h2>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Uğurlu gələcəyiniz üçün peşəkar təhsil həlləri təqdim edirik.
                        Beynəlxalq standartlarda keyfiyyətli təhsil xidmətləri.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-primary transition-colors group flex items-center justify-center p-2 rounded-full hover:bg-primary/10" href="https://facebook.com" aria-label="Facebook"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
                        <a className="text-slate-400 hover:text-primary transition-colors group flex items-center justify-center p-2 rounded-full hover:bg-primary/10" href="https://instagram.com" aria-label="Instagram"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg></a>
                        <a className="text-slate-400 hover:text-primary transition-colors group flex items-center justify-center p-2 rounded-full hover:bg-primary/10" href="https://wa.me/994103107117" aria-label="WhatsApp"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5C10 9.5 9.4 8 9.3 7.8c-.2-.2-.4-.2-.6-.2h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1 1.3.8 2.5 1.6 3.4 1 1.1 2.2 2 3.5 2.7 1.3.7 2.8 1.2 4.2 1.2.9.1 1.9-.2 2.6-.8.4-.3.7-.7.9-1.2.1-.2.1-.4.1-.6 0-.1-.1-.1-.3-.2M12 20.3c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.2-1.2-2.7-1.2-4.2 0-4.6 3.7-8.3 8.3-8.3 4.6 0 8.3 3.7 8.3 8.3S16.6 20.3 12 20.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>
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
                                <span className="block">Zahid Xəlilov 59</span>
                                <span className="block">Baku, Azerbaijan</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                            <div className="flex flex-col gap-1">
                                <a href="tel:+994103107117" className="hover:text-primary transition-colors">+994 10 310 71 17</a>
                                <a href="tel:0103106116" className="hover:text-primary transition-colors">010 310 61 16</a>
                                <a href="tel:0103104114" className="hover:text-primary transition-colors">010 310 41 14</a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                            <a href="mailto:inglabaku@gmail.com" className="hover:text-primary transition-colors">inglabaku@gmail.com</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100">İş Saatları</h4>
                    <ul className="flex flex-col gap-4 text-sm text-slate-500">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                            İş saatı
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
