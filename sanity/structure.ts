import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.documentTypeListItem('homepageCarousel').title('Homepage Carousel'),
      S.documentTypeListItem('services').title('Services (Tədris İstiqamətləri)'),
      S.divider(),
      S.listItem()
        .title('Study Abroad (Xaricdə Təhsil)')
        .child(
          S.list()
            .title('Study Abroad Content')
            .items([
              S.documentTypeListItem('country').title('Countries'),
              S.documentTypeListItem('university').title('Universities'),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQ'),
      S.documentTypeListItem('testimonials').title('Testimonials'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['homepageCarousel', 'faq', 'testimonials', 'services', 'country', 'university', 'educationExhibitions'].includes(item.getId()!),
      ),
    ])