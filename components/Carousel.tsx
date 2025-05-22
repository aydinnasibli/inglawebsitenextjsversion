"use client";

import { useState, useEffect, useCallback } from "react";
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
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPlaying, nextSlide, autoPlayInterval]);

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
        <div className={`relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg ${className}`}>
            {/* Main carousel container */}
            <div className="relative w-full h-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
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
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="max-w-2xl text-white"
                                >
                                    <h3 className="text-3xl md:text-5xl font-bold mb-4">
                                        {items[currentIndex].title}
                                    </h3>
                                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                                        {items[currentIndex].description}
                                    </p>
                                    {items[currentIndex].buttonText && (
                                        <Button
                                            onClick={items[currentIndex].buttonAction}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-900/20"
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </>
            )}

            {/* Play/Pause Control */}
            {autoPlay && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleAutoPlay}
                    className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm"
                    aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
            )}

            {/* Slide Indicators */}
            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex space-x-2">
                        {items.map((_, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full p-0 transition-all duration-300 ${index === currentIndex
                                        ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                                        : "bg-white/30 hover:bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            {autoPlay && isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                        className="h-full bg-yellow-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: autoPlayInterval / 1000,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                </div>
            )}
        </div>
    );
}