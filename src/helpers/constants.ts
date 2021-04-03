import image1 from '../assets/image/categories-1.svg'
import image2 from '../assets/image/categories-2.svg'
import image3 from '../assets/image/categories-3.svg'
import image4 from '../assets/image/categories-4.svg'
import image5 from '../assets/image/categories-5.svg'
import image6 from '../assets/image/categories-6.svg'

type SectionType = {
  id: number,
  name: string,
  image: string
}

export const bookSections: Array<SectionType> = [
  {
    id: 1,
    name: "Начальный",
    image: image1
  },
  {
    id: 2,
    name: "Легкий",
    image: image2
  },
  {
    id: 3,
    name: "Средний",
    image: image3
  },
  {
    id: 4,
    name: "Сложный",
    image: image4
  },
  {
    id: 5,
    name: "Великий",
    image: image5
  },
  {
    id: 6,
    name: "Нереальный",
    image: image6
  }
];

export const settingsMap = [
   {
    id: "isNeedTranslate",
    text: "Отображать перевод слова"
  },
  {
    id: "isNeedMeaningTranslate",
    text: "Отображать перевод пояснения"
  },
  {
    id: "isNeedHardButton",
    text: "Отображать кнопку “Добавить в сложное”"
  },
  {
    id: "isNeedDeleteButton",
    text: "Отображать кнопку “Удалить слово”"
  },
]

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
