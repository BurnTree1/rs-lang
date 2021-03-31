export const bookBuilder = (section: string | number | null = null, page: string | number | null = null) =>
  urlBuilder("/book", section, page);

export const urlBuilder = (initUrl: string,
                           section: string | number | null = null,
                           page: string | number | null = null) =>
  `${initUrl}${(section) ? `/section_${section}` : ""}${(page) ? `/page_${page}` : ""}`;
