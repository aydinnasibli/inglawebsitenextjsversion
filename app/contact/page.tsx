"use client";

import { useState } from "react";
import Link from "next/link";
import { submitRegistration } from "@/app/actions/registration";

interface FormData { name: string; surname: string; phone: string; email: string; message: string; }
interface FormErrors { name?: string; surname?: string; phone?: string; email?: string; message?: string; }

const OFFICES = [
    {
        name: "Zahid Xəlilov 59 (Əsas Ofis)",
        address: "Zahid Xəlilov küç. 59, Bakı, Azərbaycan",
        phones: ["010 310 71 17", "010 310 61 16", "010 310 41 14"],
        email: "inglabaku@gmail.com",
        hours: "09:00 – 21:00",
        mapQuery: "Zahid+Xelilov+59+Baku",
        badge: "Əsas Ofis",
        icon: "location_on",
    },
    {
        name: "Grand Hayat (İkinci Ofis)",
        address: "Neftçilər pr. 153, Bakı (Grand Hayat yanı), Azərbaycan",
        phones: ["010 310 71 17"],
        email: "inglabaku@gmail.com",
        hours: "09:00 – 18:00",
        mapQuery: "Grand+Hayat+Baku",
        badge: "İkinci Ofis",
        icon: "apartment",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({ name: "", surname: "", phone: "", email: "", message: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!formData.name.trim() || formData.name.trim().length < 2) e.name = "Ad tələb olunur (min 2 hərf)";
        if (!formData.surname.trim() || formData.surname.trim().length < 2) e.surname = "Soyad tələb olunur (min 2 hərf)";
        if (!formData.phone.trim() || formData.phone.trim().length < 10) e.phone = "Düzgün telefon nömrəsi daxil edin";
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Düzgün e-poçt ünvanı daxil edin";
        if (!formData.message.trim() || formData.message.trim().length < 10) e.message = "Mesaj ən azı 10 hərf olmalıdır";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("submitting");
        try {
            const result = await submitRegistration({ ...formData, serviceTitle: "Əlaqə Formu" });
            setStatus(result.success ? "success" : "error");
            if (result.success) setFormData({ name: "", surname: "", phone: "", email: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
        if (status !== "idle") setStatus("idle");
    };

    const inputBase = "w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors text-sm";
    const inputOk = "border-slate-200 dark:border-slate-700";
    const inputErr = "border-red-400 dark:border-red-500";

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

            {/* ── PAGE HEADER ── */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary">Əlaqə</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                                <span className="material-symbols-outlined text-[14px]">contact_support</span>
                                Bizimlə Əlaqə
                            </span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Əlaqə</h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Suallarınız üçün bizimlə əlaqə saxlayın — telefon, e-poçt və ya aşağıdakı form vasitəsilə.
                            </p>
                        </div>
                        <div className="flex gap-6 md:gap-8 flex-shrink-0">
                            {[
                                { value: "09:00–21:00", label: "İş Saatı" },
                                { value: "3", label: "Nömrə" },
                                { value: "2", label: "Ofis" },
                            ].map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <p className="text-2xl font-black text-primary leading-none">{value}</p>
                                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* ── LEFT: Offices + contact info ── */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Ofislərimiz</p>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Ünvanlarımız</h2>
                        </div>

                        {OFFICES.map((office) => (
                            <div key={office.name} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                                {/* Office header */}
                                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary text-[20px]">{office.icon}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{office.badge}</span>
                                        <p className="font-black text-slate-900 dark:text-white text-sm leading-tight">{office.name}</p>
                                    </div>
                                </div>

                                {/* Office details */}
                                <div className="px-6 py-5 flex flex-col gap-4">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">location_on</span>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-0.5">Ünvan</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{office.address}</p>
                                            <a
                                                href={`https://maps.google.com/?q=${office.mapQuery}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs text-primary font-bold mt-1 inline-flex items-center gap-1 hover:underline"
                                            >
                                                Xəritədə bax <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">call</span>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Telefon</p>
                                            <div className="flex flex-col gap-1">
                                                {office.phones.map(p => (
                                                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">{p}</a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">mail</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-0.5">E-poçt</p>
                                                <a href={`mailto:${office.email}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-primary transition-colors break-all">{office.email}</a>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5">schedule</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-0.5">İş Saatı</p>
                                                <p className="text-sm font-bold text-primary">{office.hours}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* WhatsApp quick link */}
                        <a
                            href="https://wa.me/994103107117"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl px-6 py-4 hover:bg-[#25D366]/20 transition-colors group"
                        >
                            <div className="size-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5C10 9.5 9.4 8 9.3 7.8c-.2-.2-.4-.2-.6-.2h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1 1.3.8 2.5 1.6 3.4 1 1.1 2.2 2 3.5 2.7 1.3.7 2.8 1.2 4.2 1.2.9.1 1.9-.2 2.6-.8.4-.3.7-.7.9-1.2.1-.2.1-.4.1-.6 0-.1-.1-.1-.3-.2M12 20.3c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.2-1.2-2.7-1.2-4.2 0-4.6 3.7-8.3 8.3-8.3 4.6 0 8.3 3.7 8.3 8.3S16.6 20.3 12 20.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">WhatsApp ilə yazın</p>
                                <p className="text-xs text-slate-500">010 310 71 17</p>
                            </div>
                            <span className="material-symbols-outlined text-[#25D366] ml-auto group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>

                    {/* ── RIGHT: Contact form ── */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
                        <div className="mb-8">
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Yazın</p>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Müraciət Formu</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Formu doldurun, ən qısa müddətdə cavab verəcəyik.</p>
                        </div>

                        {status === "success" && (
                            <div className="mb-6 px-5 py-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500 text-[20px] flex-shrink-0 mt-0.5">check_circle</span>
                                <p className="text-sm text-green-700 dark:text-green-300 font-medium">Müraciətiniz göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mb-6 px-5 py-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                                <span className="material-symbols-outlined text-red-500 text-[20px] flex-shrink-0 mt-0.5">error</span>
                                <p className="text-sm text-red-700 dark:text-red-300 font-medium">Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">Ad *</label>
                                    <input type="text" value={formData.name} onChange={set("name")} placeholder="Adınız" disabled={status === "submitting"} className={`${inputBase} ${errors.name ? inputErr : inputOk}`} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">Soyad *</label>
                                    <input type="text" value={formData.surname} onChange={set("surname")} placeholder="Soyadınız" disabled={status === "submitting"} className={`${inputBase} ${errors.surname ? inputErr : inputOk}`} />
                                    {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">Telefon *</label>
                                <input type="tel" value={formData.phone} onChange={set("phone")} placeholder="010 XXX XX XX" disabled={status === "submitting"} className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">E-poçt *</label>
                                <input type="email" value={formData.email} onChange={set("email")} placeholder="email@example.com" disabled={status === "submitting"} className={`${inputBase} ${errors.email ? inputErr : inputOk}`} />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">Mesaj *</label>
                                <textarea value={formData.message} onChange={set("message")} rows={4} placeholder="Sualınız, maraq duyduğunuz proqram və ya əlavə məlumat..." disabled={status === "submitting"} className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`} />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full py-4 bg-primary text-slate-900 rounded-xl font-bold text-sm hover:brightness-105 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                                        Göndərilir...
                                    </>
                                ) : (
                                    <>
                                        Göndər
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
