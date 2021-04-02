import words from '../../Сomponents/Savannah/mockData'
import { WordsType } from './audioSlice';
import {
    sprintSlice, nextWord, setTranslated, setScore, gameOver, makeAnswer, setSprintWords, setSprintDifficult, setHasDifficulty
} from './sprintSlice';

const state = {
    wordsArr: [] as Array<WordsType>,
    word: {} as WordsType,
    translation: '',
    score: 0,
    pointsToAdd: 10,
    isFinished: false,
    correctSeries: 0,
    correctAnswers: [] as Array<WordsType>,
    wrongAnswers: [] as Array<WordsType>,
    hasDifficulty: true,
    difficulty: 0
};

test('receive words for games', () => {
    const newState = sprintSlice(state, setSprintWords({
        '5e9f5ee35eb9e72bc21af4a2':
        { audio: "files/01_0005.mp3",
        audioExample: "files/01_0005_example.mp3",
        audioMeaning: "files/01_0005_meaning.mp3",
        group: 0,
        image: "files/01_0005.jpg",
        page: 0,
        textExample: "There is a small boat on the lake.",
        textExampleTranslate: "На озере есть маленькая лодка",
        textMeaning: "A boat is a vehicle that moves across water.",
        textMeaningTranslate: "Лодка - это транспортное средство, которое движется по воде",
        transcription: "[bout]",
        userWord: {},
        word: "boat",
        wordTranslate: "лодка",
        _id: "5e9f5ee35eb9e72bc21af4a2" }
      }))
  expect(newState.wordsArr[0].word).toBe("boat");
});