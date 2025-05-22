"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    buttonText?: string;
    buttonAction?: () => void;
}

interface CarouselProps {
    items: CarouselItem[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    className?: string;
}

export default function Carousel({
    items,
    autoPlay = true,
    autoPlayInterval = 5000,
    showControls = true,
    showIndicators = true,
    className = "",
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    }, [items.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    }, [items.length]);

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const toggleAutoPlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
        }
    };

    // Auto-play functionality with smoother handling
    // Auto-play functionality with better cleanup
    useEffect(() => {
        if (!isPlaying || items.length <= 1) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        // Clear existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Set new interval
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPlaying, nextSlide, autoPlayInterval, items.length]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                prevSlide();
            } else if (event.key === "ArrowRight") {
                nextSlide();
            } else if (event.key === " ") {
                event.preventDefault();
                toggleAutoPlay();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    if (items.length === 0) return null;

    return (
        <div className={`relative w-full max-w-7xl mx-auto h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl ${className}`}>
            {/* Main carousel container */}
            <div className="relative w-full h-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 400, damping: 40 },
                            opacity: { duration: 0.3 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                nextSlide();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevSlide();
                            }
                        }}
                        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                    >
                        {/* Background Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={items[currentIndex].image}
                                alt={items[currentIndex].title}
                                fill
                                className="object-cover"
                                priority={currentIndex === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-6 md:px-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="max-w-3xl text-white"
                                >
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                        {items[currentIndex].title}
                                    </h3>
                                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl">
                                        {items[currentIndex].description}
                                    </p>
                                    {items[currentIndex].buttonText && (
                                        <Button
                                            onClick={items[currentIndex].buttonAction}
                                            size="lg"
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                                        >
                                            {items[currentIndex].buttonText}
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {showControls && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevSlide}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextSlide}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm w-12 h-12 md:w-14 md:h-14 transition-all duration-300 hover:scale-110"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                    </Button>
                </>
            )}

            {/* Play/Pause Control */}
            {autoPlay && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleAutoPlay}
                    className="absolute top-4 md:top-6 right-4 md:right-6 z-10 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 transition-all duration-300 hover:scale-110"
                    aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                    {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
                </Button>
            )}

            {/* Slide Indicators */}
            {showIndicators && (
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex space-x-3">
                        {items.map((_, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 md:w-4 md:h-4 rounded-full p-0 transition-all duration-300 ${index === currentIndex
                                    ? "bg-yellow-500 shadow-lg shadow-yellow-500/50 scale-125"
                                    : "bg-white/40 hover:bg-white/60 hover:scale-110"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}