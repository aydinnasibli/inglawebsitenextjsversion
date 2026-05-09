import { groq } from 'next-sanity'

// ─── Homepage ────────────────────────────────────────────────────────────────

export const BENTO_CATEGORY_IMAGES_QUERY = groq`{
    "services":    *[_type == "services"        && isActive == true && defined(featuredImage)] | order(isFeatured desc) [0] { "img": featuredImage },
    "studyabroad": *[_type == "country"          && defined(coverImage)]                        | order(isFeatured desc) [0] { "img": coverImage    },
    "preschool":   *[_type == "preschoolService" && defined(featuredImage)]                     | order(order asc)       [0] { "img": featuredImage },
    "training":    *[_type == "training"         && isActive == true && defined(featuredImage)] | order(startDate desc)  [0] { "img": featuredImage }
}`

export const HOMEPAGE_BENTO_QUERY = groq`
  *[_type == "homepageBento" && isActive == true] | order(order asc) {
    _id, title, description, image, icon, link, linkLabel, size, variant, order, isActive
  }
`

export const FAQ_QUERY = groq`
  *[_type == "faq" && isActive == true] | order(order asc) {
    _id, question, answer, category, order, isActive
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonials" && isActive == true] | order(featured desc, order asc) {
    _id, name, position, company, testimonial, image, rating, program, order, isActive, featured
  }
`

// ─── Services ────────────────────────────────────────────────────────────────

export const SERVICES_QUERY = groq`
  *[_type == "services" && isActive == true] | order(isFeatured desc, order asc) {
    _id, title, slug, shortDescription, featuredImage, category, duration,
    priceRange, targetAudience, keyFeatures, order, isFeatured, isActive
  }
`

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "services" && isActive == true] { "slug": slug.current }
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "services" && slug.current == $slug && isActive == true][0] {
    _id, title, slug, shortDescription, fullDescription, featuredImage, gallery,
    keyFeatures, targetAudience, duration, priceRange, contactInfo, scheduleInfo,
    requirements, category, seoTitle, seoDescription, isActive
  }
`

// ─── Preschool ───────────────────────────────────────────────────────────────

export const PRESCHOOL_SLUGS_QUERY = groq`
  *[_type == "preschoolService"] { "slug": slug.current }
`

export const PRESCHOOL_SERVICES_QUERY = groq`
  *[_type == "preschoolService"] | order(order asc) {
    _id, title, slug, shortDescription, fullDescription, featuredImage,
    gallery[] { asset, alt, caption },
    keyFeatures[] { feature, description },
    targetAgeGroup, duration, priceRange,
    contactInfo { phone, email, whatsapp },
    scheduleInfo, requirements,
    activities[] { activity, description },
    learningOutcomes, order, isFeatured, seoTitle, seoDescription
  }
`

export const PRESCHOOL_SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "preschoolService" && slug.current == $slug][0] {
    _id, title, slug, shortDescription, fullDescription, featuredImage,
    gallery[] { asset, alt, caption },
    keyFeatures[] { feature, description },
    targetAgeGroup, duration, priceRange,
    contactInfo { phone, email, whatsapp },
    scheduleInfo, requirements,
    activities[] { activity, description },
    learningOutcomes, order, isFeatured, seoTitle, seoDescription
  }
`

// ─── Fairs (Sərgilər) ─────────────────────────────────────────────────────────

export const FAIRS_QUERY = groq`
  *[_type == "fair" && isActive == true] | order(startDate desc) {
    _id, name, slug, startDate, endDate, location, shortDescription,
    coverImage, status, registrationLink, order,
    participatingUniversities[] { universityName, country, logo }
  }
`

export const FAIR_BY_SLUG_QUERY = groq`
  *[_type == "fair" && slug.current == $slug && isActive == true][0] {
    _id, name, slug, startDate, endDate, location, shortDescription, fullDescription,
    coverImage, status, registrationLink, order,
    participatingUniversities[] { universityName, country, logo },
    seoTitle, seoDescription
  }
`

export const FAIR_SLUGS_QUERY = groq`
  *[_type == "fair" && isActive == true] { "slug": slug.current }
`

// ─── Study Abroad ─────────────────────────────────────────────────────────────

export const COUNTRIES_QUERY = groq`
  *[_type == "country" && isActive == true] | order(isFeatured desc, order asc) {
    _id, name, nameAz, slug, shortDescription, fullDescription, flagImage, coverImage,
    gallery, highlights, studyInfo, popularPrograms, universitiesCount,
    order, isActive, isFeatured, seoTitle, seoDescription
  }
`

export const COUNTRY_BY_SLUG_QUERY = groq`
  *[_type == "country" && slug.current == $slug && isActive == true][0] {
    _id, name, nameAz, slug, shortDescription, fullDescription, flagImage, coverImage,
    gallery, highlights, studyInfo, popularPrograms, order, isActive, isFeatured,
    seoTitle, seoDescription
  }
`

export const COUNTRY_SLUGS_QUERY = groq`
  *[_type == "country" && isActive == true] { "slug": slug.current }
`

export const UNIVERSITIES_BY_COUNTRY_QUERY = groq`
  *[_type == "university" && country._ref == $countryId && isActive == true] | order(isFeatured desc, order asc) {
    _id, name, slug,
    country-> { _id, name, nameAz, slug },
    shortDescription, fullDescription, logo, coverImage, gallery, ranking,
    established, studentCount, location, programs, facilities, admissionInfo,
    scholarships, contactInfo, order, isActive, isFeatured, seoTitle, seoDescription
  }
`

// ─── Training ─────────────────────────────────────────────────────────────────

export const trainingQueries = {
  all: groq`*[_type == "training" && isActive == true] | order(startDate desc) {
    _id, title, slug, description, featuredImage, duration, level, price,
    category, instructor, startDate, endDate
  }`,
  bySlug: groq`*[_type == "training" && slug.current == $slug][0] {
    _id, title, slug, description, content, featuredImage, duration, level, price,
    category, instructor, startDate, endDate, isActive
  }`,
  slugs: groq`*[_type == "training" && isActive == true] { "slug": slug.current }`,
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug,
    author->{ _id, name, slug, image },
    mainImage,
    categories[]->{ _id, title, slug, color },
    publishedAt, excerpt, featured
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id, title, slug, description, color
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug,
    author->{ _id, name, slug, image, bio },
    mainImage,
    categories[]->{ _id, title, slug, color },
    publishedAt, excerpt, body, featured, seo
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// ─── News ─────────────────────────────────────────────────────────────────────

export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id, title, slug, mainImage,
    categories[]->{ _id, title, slug, color },
    publishedAt, excerpt, featured
  }
`

export const newsCategoriesQuery = groq`
  *[_type == "newsCategory"] | order(title asc) {
    _id, title, slug, description, color
  }
`

export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id, title, slug, mainImage,
    categories[]->{ _id, title, slug, color },
    publishedAt, excerpt, body, featured, seo
  }
`

export const newsSlugsQuery = groq`
  *[_type == "news" && defined(slug.current)][].slug.current
`

export const HOMEPAGE_NEWS_QUERY = groq`
  {
    "featured": *[_type == "news" && featured == true] | order(publishedAt desc) [0] {
      _id, title, slug, mainImage,
      categories[]->{ _id, title, slug, color },
      publishedAt, excerpt
    },
    "latest": *[_type == "news"] | order(publishedAt desc) [0...4] {
      _id, title, slug, mainImage,
      categories[]->{ _id, title, slug, color },
      publishedAt, excerpt
    }
  }
`
