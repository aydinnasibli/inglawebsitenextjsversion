// sanity/structure.ts
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.documentTypeListItem('homepageCarousel').title('Homepage Carousel'),
      S.documentTypeListItem('services').title('Services (Tədris İstiqamətləri)'),
      S.divider(),

      // Blog Section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.documentTypeListItem('post')
                .title('Blog Posts')
                .child(
                  S.documentTypeList('post')
                    .title('Blog Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),
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
      S.documentTypeListItem('preschoolService').title('Preschool Services (Məktəbəqədər Xidmətlər)'),
      S.documentTypeListItem('training').title('Training Programs'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQ'),
      S.documentTypeListItem('testimonials').title('Testimonials'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'homepageCarousel',
          'faq',
          'testimonials',
          'services',
          'country',
          'university',
          'preschoolService',
          'training',
          'post',
          'author',
          'category',
          'blockContent'
        ].includes(item.getId()!),
      ),
    ])