"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export interface BentoItem {
    _id: string;
    title: string;
    description?: string;
    image?: any;
    icon?: string;
    link?: string;
    linkLabel?: string;
    size: "large" | "wide" | "tall" | "small";
    variant?: "primary" | "dark" | "light" | "image";
    order: number;
}

interface BentoBoxProps {
    items: BentoItem[];
}

function sizeClass(size: BentoItem["size"]): string {
    switch (size) {
        case "large": return "col-span-2 row-span-2";
        case "wide":  return "col-span-2 row-span-1";
        case "tall":  return "col-span-1 row-span-2";
        default:      return "col-span-1 row-span-1";
    }
}

// Base background when no image (or image overlay colour)
function baseBg(variant: BentoItem["variant"], hasImage: boolean): string {
    if (hasImage) return "bg-slate-900"; // image cards always dark base
    switch (variant) {
        case "primary": return "bg-primary";
        case "dark":    return "bg-slate-900 dark:bg-black";
        default:        return "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700";
    }
}

function textColor(variant: BentoItem["variant"], hasImage: boolean): string {
    if (hasImage) return "text-white";
    switch (variant) {
        case "primary": return "text-slate-900";
        case "dark":    return "text-white";
        default:        return "text-slate-900 dark:text-white";
    }
}

function descColor(variant: BentoItem["variant"], hasImage: boolean): string {
    if (hasImage) return "text-slate-300";
    switch (variant) {
        case "primary": return "text-slate-800";
        case "dark":    return "text-slate-300";
        default:        return "text-slate-600 dark:text-slate-400";
    }
}

function iconColor(variant: BentoItem["variant"], hasImage: boolean): string {
    if (hasImage || variant === "dark") return "text-primary";
    if (variant === "primary") return "text-slate-900/60";
    return "text-primary";
}

function ctaColor(variant: BentoItem["variant"], hasImage: boolean): string {
    if (hasImage || variant === "dark") return "text-primary";
    if (variant === "primary") return "text-slate-900";
    return "text-primary";
}

interface CardProps {
    item: BentoItem;
    imageUrl: string | null;
}

function CardContent({ item, imageUrl }: CardProps) {
    const hasImage = !!imageUrl;

    return (
        <div
            className={`relative w-full h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group p-6 flex flex-col justify-between ${baseBg(item.variant, hasImage)}`}
        >
            {/* Background image — shown for ALL cards that have an image */}
            {hasImage && (
                <>
                    <Image
                        src={imageUrl!}
                        alt={item.title}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                </>
            )}

            <div className={`relative z-10 flex flex-col h-full ${textColor(item.variant, hasImage)}`}>
                {/* Icon at top */}
                {item.icon && (
                    <span className={`material-symbols-outlined text-4xl mb-auto ${iconColor(item.variant, hasImage)}`}>
                        {item.icon}
                    </span>
                )}

                {/* Content at bottom */}
                <div className="flex flex-col gap-2 mt-auto">
                    <h3
                        className={`font-bold leading-tight ${
                            item.size === "large" ? "text-2xl md:text-3xl"
                            : item.size === "wide" ? "text-xl md:text-2xl"
                            : "text-lg"
                        }`}
                    >
                        {item.title}
                    </h3>

                    {item.description && (
                        <p
                            className={`text-sm leading-relaxed ${
                                item.size === "small" ? "line-clamp-2" : "line-clamp-3"
                            } ${descColor(item.variant, hasImage)}`}
                        >
                            {item.description}
                        </p>
                    )}

                    {item.link && item.linkLabel && (
                        <span
                            className={`mt-1 inline-flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all ${ctaColor(item.variant, hasImage)}`}
                        >
                            {item.linkLabel}
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BentoBox({ items }: BentoBoxProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[260px] gap-4">
            {items.map((item) => {
                const imageUrl = item.image
                    ? (typeof item.image === "string"
                        ? item.image
                        : urlFor(item.image).width(900).height(900).quality(85).url())
                    : null;

                return item.link ? (
                    <Link key={item._id} href={item.link} className={`${sizeClass(item.size)} block h-full`}>
                        <CardContent item={item} imageUrl={imageUrl} />
                    </Link>
                ) : (
                    <div key={item._id} className={`${sizeClass(item.size)} h-full`}>
                        <CardContent item={item} imageUrl={imageUrl} />
                    </div>
                );
            })}
        </div>
    );
}
