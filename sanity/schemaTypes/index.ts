import { type SchemaTypeDefinition } from 'sanity'
import { homepageCarousel } from './homepageCarousel'
import { faq } from './faq'
import { testimonials } from './testimonials'
import { services } from './services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageCarousel, faq, testimonials, services],
}