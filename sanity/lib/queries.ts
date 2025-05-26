import { groq } from 'next-sanity'

// Get all active services for the services listing page
export const SERVICES_QUERY = groq`
  *[_type == "services" && isActive == true] | order(isFeatured desc, order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    category,
    duration,
    priceRange,
    targetAudience,
    keyFeatures,
    order,
    isFeatured,
    isActive
  }
`

// Get a single service by slug for the detailed service page
export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "services" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    featuredImage,
    gallery,
    keyFeatures,
    targetAudience,
    duration,
    priceRange,
    contactInfo,
    scheduleInfo,
    requirements,
    category,
    seoTitle,
    seoDescription,
    isActive
  }
`

// Get services by category
export const SERVICES_BY_CATEGORY_QUERY = groq`
  *[_type == "services" && category == $category && isActive == true] | order(isFeatured desc, order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    duration,
    priceRange,
    keyFeatures,
    isFeatured
  }
`

// Get featured services for homepage or other pages
export const FEATURED_SERVICES_QUERY = groq`
  *[_type == "services" && isFeatured == true && isActive == true] | order(order asc) [0..3] {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    category,
    duration,
    priceRange
  }
`

// Get all service categories
export const SERVICE_CATEGORIES_QUERY = groq`
  *[_type == "services" && isActive == true] {
    category
  } | {
    "categories": category
  }
`

// Get service slugs for static generation
export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "services" && isActive == true] {
    "slug": slug.current
  }
`


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












// sanity/lib/queries.ts

// Countries Queries
export const COUNTRIES_QUERY = `*[_type == "country" && isActive == true] | order(isFeatured desc, order asc) {
  _id,
  name,
  nameAz,
  slug,
  shortDescription,
  fullDescription,
  flagImage,
  coverImage,
  gallery,
  highlights,
  studyInfo,
  popularPrograms,
  order,
  isActive,
  isFeatured,
  seoTitle,
  seoDescription
}`;

export const COUNTRY_BY_SLUG_QUERY = `*[_type == "country" && slug.current == $slug && isActive == true][0] {
  _id,
  name,
  nameAz,
  slug,
  shortDescription,
  fullDescription,
  flagImage,
  coverImage,
  gallery,
  highlights,
  studyInfo,
  popularPrograms,
  order,
  isActive,
  isFeatured,
  seoTitle,
  seoDescription
}`;

export const COUNTRY_SLUGS_QUERY = `*[_type == "country" && isActive == true] {
  "slug": slug.current
}`;

// Universities Queries
export const UNIVERSITIES_BY_COUNTRY_QUERY = `*[_type == "university" && country._ref == $countryId && isActive == true] | order(isFeatured desc, order asc) {
  _id,
  name,
  slug,
  country-> {
    _id,
    name,
    nameAz,
    slug
  },
  shortDescription,
  fullDescription,
  logo,
  coverImage,
  gallery,
  ranking,
  established,
  studentCount,
  location,
  programs,
  facilities,
  admissionInfo,
  scholarships,
  contactInfo,
  order,
  isActive,
  isFeatured,
  seoTitle,
  seoDescription
}`;


export const FEATURED_UNIVERSITIES_QUERY = `*[_type == "university" && isFeatured == true && isActive == true] | order(order asc) [0...6] {
  _id,
  name,
  slug,
  country-> {
    _id,
    name,
    nameAz,
    slug
  },
  shortDescription,
  logo,
  coverImage,
  ranking,
  location,
  programs[0...3],
  isFeatured
}`;

export const ALL_UNIVERSITIES_QUERY = `*[_type == "university" && isActive == true] | order(isFeatured desc, order asc) {
  _id,
  name,
  slug,
  country-> {
    _id,
    name,
    nameAz,
    slug
  },
  shortDescription,
  logo,
  coverImage,
  ranking,
  location,
  programs[0...3],
  isFeatured
}`;

export const UNIVERSITY_SLUGS_QUERY = `*[_type == "university" && isActive == true] {
  "slug": slug.current
}`;




export const UNIVERSITY_BY_SLUG_QUERY = `*[_type == "university" && slug.current == $slug && country->slug.current == $countrySlug && isActive == true][0] {
    _id,
    name,
    slug,
    country-> {
        _id,
        name,
        nameAz,
        slug
    },
    shortDescription,
    fullDescription,
    logo,
    coverImage,
    gallery,
    ranking,
    established,
    studentCount,
    location,
    programs,
    facilities,
    admissionInfo,
    scholarships,
    contactInfo,
    isFeatured,
    seoTitle,
    seoDescription
}`;

export const UNIVERSITY_SLUGS_BY_COUNTRY_QUERY = `*[_type == "university" && country._ref == $countryId && isActive == true] {
    "slug": slug.current
}`;

export const ALL_UNIVERSITY_SLUGS_QUERY = `*[_type == "university" && isActive == true] {
    "slug": slug.current,
    "countrySlug": country->slug.current
}`;





// Add these queries to your existing sanity/lib/queries.ts file

export const PRESCHOOL_SERVICES_QUERY = `*[_type == "preschoolService"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  gallery[] {
    asset,
    alt,
    caption
  },
  keyFeatures[] {
    feature,
    description
  },
  targetAgeGroup,
  duration,
  priceRange,
  contactInfo {
    phone,
    email,
    whatsapp
  },
  scheduleInfo,
  requirements,
  activities[] {
    activity,
    description
  },
  learningOutcomes,
  order,
  isFeatured,
  seoTitle,
  seoDescription
}`;

export const PRESCHOOL_SERVICE_BY_SLUG_QUERY = `*[_type == "preschoolService" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  gallery[] {
    asset,
    alt,
    caption
  },
  keyFeatures[] {
    feature,
    description
  },
  targetAgeGroup,
  duration,
  priceRange,
  contactInfo {
    phone,
    email,
    whatsapp
  },
  scheduleInfo,
  requirements,
  activities[] {
    activity,
    description
  },
  learningOutcomes,
  order,
  isFeatured,
  seoTitle,
  seoDescription
}`;






export const trainingQueries = {
  all: `*[_type == "training" && isActive == true] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    featuredImage,
    duration,
    level,
    price,
    category,
    instructor,
    startDate,
    endDate
  }`,

  bySlug: `*[_type == "training" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    featuredImage,
    duration,
    level,
    price,
    category,
    instructor,
    startDate,
    endDate,
    isActive
  }`,

  slugs: `*[_type == "training" && isActive == true] {
    "slug": slug.current
  }`
}



// Author queries
export const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    email,
    socialLinks
  }
`

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }
`

// Category queries
export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Blog post queries
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt,
    body,
    featured,
    seo
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt,
    featured
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt
  }
`

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt
  }
`

export const postsByAuthorQuery = groq`
  *[_type == "post" && author._ref == $authorId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $postId && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    excerpt
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

export const authorSlugsQuery = groq`
  *[_type == "author" && defined(slug.current)][].slug.current
`

export const categorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`