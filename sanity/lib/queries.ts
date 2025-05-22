import { groq } from 'next-sanity'

export const HOMEPAGE_CAROUSEL_QUERY = groq`
  *[_type == "homepageCarousel" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    image,
    buttonText,
    buttonLink,
    order,
    isActive
  }
`

// Add these queries to your existing sanity/lib/queries.ts file:

export const FAQ_QUERY = groq`
  *[_type == "faq" && isActive == true] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order,
    isActive
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonials" && isActive == true] | order(featured desc, order asc) {
    _id,
    name,
    position,
    company,
    testimonial,
    image,
    rating,
    program,
    order,
    isActive,
    featured
  }
`