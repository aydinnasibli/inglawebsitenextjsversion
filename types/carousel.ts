import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface CarouselItem {
    id: string
    title: string
    description: string
    image: string | SanityImageSource
    buttonText?: string
    buttonAction?: () => void
    buttonLink?: string
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