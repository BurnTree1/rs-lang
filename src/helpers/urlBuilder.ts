export const bookBuilder = (section: string|number|null = null, page: string|number|null = null) =>
    `/book${(section)? `/section_${section}`: ''}${(page)? `/page_${page}`: ''}`
