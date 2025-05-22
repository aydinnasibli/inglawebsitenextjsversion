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