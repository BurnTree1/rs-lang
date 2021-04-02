import { createSlice } from '@reduxjs/toolkit';
import words from '../../Сomponents/Savannah/mockData'
import { WordsType } from './audioSlice';
import reducer, { nextWord, setTranslated, setScore, gameOver, makeAnswer, setSprintWords, setSprintDifficult, setHasDifficulty
} from './sprintSlice';

const state = {
    wordsArr: [{
        audio: "files/01_0005.mp3",
       audioExample: "files/01_0005_example.mp3",
       audioMeaning: "files/01_0005_meaning.mp3",
       group: 111,
       image: "files/01_0005.jpg",
       page: 0,
       textExample: "There is a small boat on the lake.",
       textExampleTranslate: "На озере есть маленькая лодка",
       textMeaning: "A boat is a vehicle that moves across water.",
       textMeaningTranslate: "Лодка - это транспортное средство, которое движется по воде",
       transcription: "[bout]",
       word: "",
       wordTranslate: "лодка", 
     }] as Array<WordsType>,
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
    const newState = reducer(state, setSprintWords( {
        foo: {
        group: 0 }
      }))
   expect(newState.wordsArr[0].group).toBe(0);
});