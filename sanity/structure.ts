import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.documentTypeListItem('homepageCarousel').title('Homepage Carousel'),
      S.divider(),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['homepageCarousel',].includes(item.getId()!),
      ),
    ])