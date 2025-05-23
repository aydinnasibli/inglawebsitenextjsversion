import { type SchemaTypeDefinition } from 'sanity'
import { homepageCarousel } from './homepageCarousel'
import { faq } from './faq'
import { testimonials } from './testimonials'
import { services } from './services'
import { country } from './country'
import { university } from './university'
import { preschool } from './preschoolService'
import training from './training'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepageCarousel,
    faq,
    testimonials,
    services,
    country,
    university,
    preschool,
    training,
  ],
}