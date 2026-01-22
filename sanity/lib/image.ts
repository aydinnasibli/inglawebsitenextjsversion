// lib/sanity/image.ts
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import { SanityImageSource } from '@sanity/image-url'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}