import { team1, team2, team3, team4 } from "../assets/image/team";

export type TeamType = {
  link: string,
  image: any,
  role: string,
  dev: Array<string>
}

export const team: Array<TeamType> = [
  {
    link: "https://github.com/BurnTree1",
    image: team1,
    role: "Руководитель команды",
    dev: [
      "Дизайн",
      "Backend",
      "Каркас учебника и словаря",
      "Авторизация",
    ]
  },
  {
    link: "https://github.com/Akrosom21",
    image: team2,
    role: "Бог верстки",
    dev: [
      "Главная страница и меню",
      "Игра 'Аудиовызов'",
      "Игра 'Спринт'",
      "Карточка слова",
      "Jest тесты",
    ]
  },
  {
    link: "https://github.com/kornienko199004",
    image: team3,
    role: "Мастер на все руки",
    dev: [
      "Дизайн мини-игр",
      "Игра 'Memory game'",
      "Статистика",
    ]
  },
  {
    link: "https://github.com/GertValiakhmetov",
    image: team4,
    role: "Ленивая зепа \n" +
      "(тех специалист)",
    dev: [
      "Игра 'Саванна'",
      "Аутентификация",
    ]
  },
];
