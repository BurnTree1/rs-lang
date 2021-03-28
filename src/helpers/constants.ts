type SectionType = {
  id: number,
  name: string
}

export const bookSections: Array<SectionType> = [
  {
    id: 1,
    name: "Начальный"
  },
  {
    id: 2,
    name: "Легкий"
  },
  {
    id: 3,
    name: "Средний"
  },
  {
    id: 4,
    name: "Сложный"
  },
  {
    id: 5,
    name: "Великий"
  },
  {
    id: 6,
    name: "Нереальный"
  }
];

export const URL_API = "https://rs-lang2021.herokuapp.com"
export const COUNT_SECTION_PAGES = 30;
export const WORD_PER_PAGE = 20;
