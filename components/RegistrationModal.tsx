"use client";

import { useState } from "react";
import { X, User, Mail, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { submitRegistration } from "@/app/actions/registration";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceTitle: string;
}

interface FormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
    message: string;
    _gotcha: string; // Honeypot field
}

interface FormErrors {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    message?: string;
}

export default function RegistrationModal({ isOpen, onClose, serviceTitle }: RegistrationModalProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        surname: "",
        phone: "",
        email: "",
        message: "",
        _gotcha: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Ad mütləqdir";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Ad ən azı 2 hərf olmalıdır";
        }

        if (!formData.surname.trim()) {
            newErrors.surname = "Soyad mütləqdir";
        } else if (formData.surname.trim().length < 2) {
            newErrors.surname = "Soyad ən azı 2 hərf olmalıdır";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Telefon nömrəsi mütləqdir";
        } else if (formData.phone.trim().length < 10) {
            newErrors.phone = "Telefon nömrəsi ən azı 10 rəqəm olmalıdır";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email mütləqdir";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Email formatı düzgün deyil";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Mesaj mütləqdir";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Mesaj ən azı 10 hərf olmalıdır";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submission started"); // Debug log

        if (!validateForm()) {
            console.log("Validation failed"); // Debug log
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage("");

        try {
            console.log("Submitting data:", { ...formData, serviceTitle, _gotcha: formData._gotcha ? '[Present]' : '[Empty]' });

            const result = await submitRegistration({
                name: formData.name.trim(),
                surname: formData.surname.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                message: formData.message.trim(),
                serviceTitle,
                _gotcha: formData._gotcha,
            });

            console.log("Submission result:", result); // Debug log

            if (result.success) {
                setSubmitStatus('success');
                // Reset form after successful submission
                setTimeout(() => {
                    resetForm();
                    onClose();
                }, 2000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || "Naməlum xəta baş verdi");
                console.error('Submission error:', result.error);
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage("Şəbəkə xətası baş verdi");
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (field !== '_gotcha' && errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        // Clear submit status when user makes changes
        if (submitStatus !== 'idle') {
            setSubmitStatus('idle');
            setErrorMessage("");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            surname: "",
            phone: "",
            email: "",
            message: "",
            _gotcha: "",
        });
        setErrors({});
        setSubmitStatus('idle');
        setErrorMessage("");
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
            // Reset form state when closing
            setTimeout(() => {
                resetForm();
            }, 300);
        }
    };

    // Don't render if not open
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-yellow-500">Qeydiyyat</h2>
                            <p className="text-gray-400 text-sm mt-1">{serviceTitle}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg disabled:opacity-50"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-900/50 border border-green-700 rounded-lg p-4 mb-6"
                        >
                            <p className="text-green-300 text-sm">
                                ✅ Qeydiyyatınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
                            </p>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6"
                        >
                            <p className="text-red-300 text-sm">
                                ❌ {errorMessage || "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."}
                            </p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot Field (Hidden) */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                            <label htmlFor="_gotcha">Do not fill this field</label>
                            <input
                                type="text"
                                id="_gotcha"
                                name="_gotcha"
                                value={formData._gotcha}
                                onChange={(e) => handleInputChange('_gotcha', e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        {/* Name and Surname Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Ad *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                    placeholder="Adınız"
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Soyad *
                                </label>
                                <input
                                    type="text"
                                    value={formData.surname}
                                    onChange={(e) => handleInputChange('surname', e.target.value)}
                                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.surname ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                    placeholder="Soyadınız"
                                    disabled={isSubmitting}
                                />
                                {errors.surname && (
                                    <p className="text-red-400 text-xs mt-1">{errors.surname}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Telefon *
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                placeholder="+994 XX XXX XX XX"
                                disabled={isSubmitting}
                            />
                            {errors.phone && (
                                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                placeholder="email@example.com"
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                Mesaj *
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                rows={4}
                                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                placeholder="Bu xidmətlə bağlı suallarınız və ya əlavə məlumatlar..."
                                disabled={isSubmitting}
                            />
                            {errors.message && (
                                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-0"
                            >
                                Ləğv et
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Göndərilir...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Göndər
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}