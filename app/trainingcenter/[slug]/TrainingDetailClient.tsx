// app/telim-merkezi/[slug]/TrainingDetailClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Users,
    Star,
    Calendar,
    ChevronLeft,
    BookOpen,
    Award,
    Phone,
    Mail,
    MapPin,
    CheckCircle,
    User,
    GraduationCap
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { SanityTrainingItem } from "@/types/training";
import { registerForTraining } from "@/lib/actions/training-actions";

interface TrainingDetailClientProps {
    training: SanityTrainingItem;
}

const getLevelDisplayName = (level: string) => {
    const levelNames: Record<string, string> = {
        'beginner': 'Başlanğıc',
        'intermediate': 'Orta',
        'advanced': 'İrəliqəl'
    };
    return levelNames[level] || 'Başlanğıc';
};

const getLevelColor = (level: string) => {
    const levelColors: Record<string, string> = {
        'beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
        'intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return levelColors[level] || 'bg-green-500/20 text-green-400 border-green-500/30';
};

export default function TrainingDetailClient({ training }: TrainingDetailClientProps) {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const availableSpots = training.maxStudents ?
        Math.max(0, training.maxStudents - (training.currentStudents || 0)) : 0;

    const handleRegistration = async (formData: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await registerForTraining(formData);
            setSubmitStatus('success');
            setShowRegistrationForm(false);
        } catch (error) {
            console.error('Registration error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="relative py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <Image
                        src={training.image ? urlFor(training.image).width(1920).height(800).quality(85).url() : '/assets/bg.webp'}
                        alt={training.title}
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href="/telim-merkezi"
                            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Təlim Mərkəzi</span>
                        </Link>
                    </div>

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-4 mb-6">
                            {training.level && (
                                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(training.level)}`}>
                                    {getLevelDisplayName(training.level)}
                                </span>
                            )}
                            {training.category && (
                                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700">
                                    {training.category}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {training.title}
                        </h1>

                        {training.shortDescription && (
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                {training.shortDescription}
                            </p>
                        )}

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {training.duration && (
                                <div className="text-center">
                                    <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-400">Müddət</div>
                                    <div className="font-semibold">{training.duration}</div>
                                </div>
                            )}

                            {training.maxStudents && (
                                <div className="text-center">
                                    <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-400">Qalan Yer</div>
                                    <div className="font-semibold">{availableSpots}</div>
                                </div>
                            )}

                            {training.instructor && (
                                <div className="text-center">
                                    <User className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-400">Müəllim</div>
                                    <div className="font-semibold text-sm">{training.instructor}</div>
                                </div>
                            )}

                            {training.price && (
                                <div className="text-center">
                                    <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-400">Qiymət</div>
                                    <div className="font-semibold">{training.price} AZN</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-yellow-500" />
                                Təlim Haqqında
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {training.description}
                                </p>
                            </div>
                        </motion.section>

                        {/* Features */}
                        {training.features && training.features.length > 0 && (
                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={sectionVariants}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <CheckCircle className="w-8 h-8 text-yellow-500" />
                                    Təlimin Xüsusiyyətləri
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {training.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Schedule */}
                        {training.schedule && (
                            <motion.section
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={sectionVariants}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Calendar className="w-8 h-8 text-yellow-500" />
                                    Təqvim
                                </h2>
                                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {training.schedule.startDate && (
                                            <div>
                                                <h4 className="font-semibold text-yellow-500 mb-2">Başlama Tarixi</h4>
                                                <p className="text-gray-300">
                                                    {new Date(training.schedule.startDate).toLocaleDateString('az-AZ')}
                                                </p>
                                            </div>
                                        )}
                                        {training.schedule.endDate && (
                                            <div>
                                                <h4 className="font-semibold text-yellow-500 mb-2">Bitmə Tarixi</h4>
                                                <p className="text-gray-300">
                                                    {new Date(training.schedule.endDate).toLocaleDateString('az-AZ')}
                                                </p>
                                            </div>
                                        )}
                                        {training.schedule.daysOfWeek && training.schedule.daysOfWeek.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-yellow-500 mb-2">Həftənin Günləri</h4>
                                                <p className="text-gray-300">
                                                    {training.schedule.daysOfWeek.join(', ')}
                                                </p>
                                            </div>
                                        )}
                                        {training.schedule.timeSlot && (
                                            <div>
                                                <h4 className="font-semibold text-yellow-500 mb-2">Vaxt</h4>
                                                <p className="text-gray-300">{training.schedule.timeSlot}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Right Column - Registration */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="sticky top-8"
                        >
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-yellow-500" />
                                    Qeydiyyat
                                </h3>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                                        <p className="text-green-400 text-center">
                                            Qeydiyyatınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                                        <p className="text-red-400 text-center">
                                            Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                                        </p>
                                    </div>
                                )}

                                {!showRegistrationForm ? (
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            {training.price && (
                                                <div className="text-3xl font-bold text-yellow-500 mb-2">
                                                    {training.price} AZN
                                                </div>
                                            )}
                                            {availableSpots > 0 ? (
                                                <p className="text-green-400 text-sm">
                                                    {availableSpots} yer qalıb
                                                </p>
                                            ) : (
                                                <p className="text-red-400 text-sm">
                                                    Yer qalmayıb
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            onClick={() => setShowRegistrationForm(true)}
                                            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 transition-colors py-3"
                                            disabled={availableSpots === 0}
                                        >
                                            Qeydiyyat
                                        </Button>

                                        <div className="text-center pt-4 border-t border-gray-800">
                                            <p className="text-gray-400 text-sm mb-3">Suallarınız var?</p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 justify-center">
                                                    <Phone className="w-4 h-4 text-yellow-500" />
                                                    <a href="tel:+994" className="hover:text-yellow-500 transition-colors">
                                                        +994 XX XXX XX XX
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 justify-center">
                                                    <Mail className="w-4 h-4 text-yellow-500" />
                                                    <a href="mailto:info@inglaschool.com" className="hover:text-yellow-500 transition-colors">
                                                        info@inglaschool.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form action={handleRegistration} className="space-y-4">
                                        <input type="hidden" name="trainingId" value={training._id} />
                                        <input type="hidden" name="trainingTitle" value={training.title} />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Ad</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    required
                                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Soyad</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    required
                                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Telefon</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Mesaj (Opsional)</label>
                                            <textarea
                                                name="message"
                                                rows={3}
                                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600 transition-colors"
                                            >
                                                {isSubmitting ? 'Göndərilir...' : 'Qeydiyyat'}
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => setShowRegistrationForm(false)}
                                                className="px-4 bg-gray-700 hover:bg-gray-600 transition-colors"
                                            >
                                                Ləğv et
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}