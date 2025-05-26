// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { homepageCarousel } from './homepageCarousel'
import { faq } from './faq'
import { testimonials } from './testimonials'
import { services } from './services'
import { country } from './country'
import { university } from './university'
import { preschool } from './preschoolService'
import training from './training'

// Blog related schemas
import { blogPost } from './blogPost'
import { author } from './author'
import { category } from './category'
import { blockContent } from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Existing schemas
    homepageCarousel,
    faq,
    testimonials,
    services,
    country,
    university,
    preschool,
    training,

    // Blog schemas
    blogPost,
    author,
    category,
    blockContent,
  ],
}