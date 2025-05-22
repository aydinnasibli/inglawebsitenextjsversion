import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.documentTypeListItem('homepageCarousel').title('Homepage Carousel'),
      S.documentTypeListItem('faq').title('FAQ'),
      S.documentTypeListItem('testimonials').title('Testimonials'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['homepageCarousel', 'faq', 'testimonials'].includes(item.getId()!),
      ),
    ])