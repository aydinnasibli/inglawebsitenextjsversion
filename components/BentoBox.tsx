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

function bgClass(variant: BentoItem["variant"]): string {
    switch (variant) {
        case "primary": return "bg-primary text-slate-900";
        case "dark":    return "bg-slate-900 dark:bg-black text-white";
        case "image":   return "bg-slate-900 text-white";
        default:        return "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700";
    }
}

interface CardProps {
    item: BentoItem;
    imageUrl: string | null;
}

function CardContent({ item, imageUrl }: CardProps) {
    return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group p-6 flex flex-col justify-between ${bgClass(item.variant)}`}>
            {/* Background image for image variant */}
            {item.variant === "image" && imageUrl && (
                <>
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon at top */}
                {item.icon && (
                    <span
                        className={`material-symbols-outlined text-4xl mb-auto ${
                            item.variant === "primary" ? "text-slate-900/70" : "text-primary"
                        }`}
                    >
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
                            } ${
                                item.variant === "primary" ? "text-slate-800"
                                : item.variant === "dark" || item.variant === "image" ? "text-slate-300"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                        >
                            {item.description}
                        </p>
                    )}

                    {item.link && item.linkLabel && (
                        <span
                            className={`mt-1 inline-flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all ${
                                item.variant === "primary" ? "text-slate-900" : "text-primary"
                            }`}
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
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
            {items.map((item) => {
                const imageUrl = item.image
                    ? urlFor(item.image).width(800).height(800).quality(85).url()
                    : null;

                return item.link ? (
                    <Link
                        href={item.link}
                        key={item._id}
                        className={sizeClass(item.size)}
                    >
                        <CardContent item={item} imageUrl={imageUrl} />
                    </Link>
                ) : (
                    <div key={item._id} className={sizeClass(item.size)}>
                        <CardContent item={item} imageUrl={imageUrl} />
                    </div>
                );
            })}
        </div>
    );
}
