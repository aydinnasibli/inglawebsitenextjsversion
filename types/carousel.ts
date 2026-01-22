import { SanityImageSource } from "@sanity/image-url"

export interface CarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
    buttonText?: string;
    buttonAction?: () => void;
}
export interface SanityCarouselItem {
    _id: string
    title: string
    description: string
    image: SanityImageSource
    buttonText?: string
    buttonLink?: string
    order: number
    isActive: boolean
}
