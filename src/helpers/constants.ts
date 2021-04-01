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

export const settingsMap = {
  translate: {
    id: "isNeedTranslate",
    text: "Отображать перевод слова"
  },
  meaningTranslate: {
    id: "isNeedMeaningTranslate",
    text: "Отображать перевод пояснения"
  },
  hardButton: {
    id: "isNeedHardButton",
    text: "Отображать кнопку “Добавить в сложное”"
  },
  deleteButton: {
    id: "isNeedDeleteButton",
    text: "Отображать кнопку “Удалить слово”"
  },
};

export const URL_API = "https://rs-lang2021.herokuapp.com";
export const COUNT_SECTION_PAGES = 30;
export const WORD_PER_PAGE = 20;
export const MAX_WORDS_IN_GROUP = 600;

export const token = "";
export const userId = "";

export const urlPrefix = {
  studied: "/dictionary/studied",
  difficult: "/dictionary/difficult",
  deleted: "/dictionary/deleted",
  book: "/book"
}

export const urlParams = {
  section: ":sectionId",
  page: ":pageId",
}
