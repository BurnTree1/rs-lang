import { WordsType } from './audioSlice';
import reducer, {
  nextWord,
  setTranslated,
  setScore,
  gameOver,
  makeAnswer,
  setSprintWords,
  setSprintDifficult,
  setHasDifficulty,
  sprintSlice,
} from './sprintSlice';

const state = {
  wordsArr: [
    {
      audio: 'files/01_0005.mp3',
      audioExample: 'files/01_0005_example.mp3',
      audioMeaning: 'files/01_0005_meaning.mp3',
      group: 111,
      image: 'files/01_0005.jpg',
      page: 0,
      textExample: 'There is a small boat on the lake.',
      textExampleTranslate: 'На озере есть маленькая лодка',
      textMeaning: 'A boat is a vehicle that moves across water.',
      textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
      transcription: '[bout]',
      word: 'boat',
      wordTranslate: 'лодка',
    },
    {
      audio: 'files/01_0005.mp3',
      audioExample: 'files/01_0005_example.mp3',
      audioMeaning: 'files/01_0005_meaning.mp3',
      group: 111,
      image: 'files/01_0005.jpg',
      page: 0,
      textExample: 'There is a small boat on the lake.',
      textExampleTranslate: 'На озере есть маленькая лодка',
      textMeaning: 'A boat is a vehicle that moves across water.',
      textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
      transcription: '[bout]',
      word: 'hello',
      wordTranslate: 'привет',
    },
  ] as Array<WordsType>,
  word:{
    audio: 'files/01_0005.mp3',
    audioExample: 'files/01_0005_example.mp3',
    audioMeaning: 'files/01_0005_meaning.mp3',
    group: 111,
    image: 'files/01_0005.jpg',
    page: 0,
    textExample: 'There is a small boat on the lake.',
    textExampleTranslate: 'На озере есть маленькая лодка',
    textMeaning: 'A boat is a vehicle that moves across water.',
    textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
    transcription: '[bout]',
    word: 'hello',
    wordTranslate: 'привет',
  } as WordsType,
  translation: 'привет',
  score: 0,
  pointsToAdd: 10,
  isFinished: false,
  correctSeries: 0,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
  hasDifficulty: false,
  difficulty: 0,
};

test('set translation for word', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.setTranslated('лодка')
  );
  expect(newState.translation).toBe('лодка');
});

test('set next word', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.nextWord('boat')
  );
  expect(newState.word.word).toBe('hello');
});

test('set score for game', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.setScore(true)
  );
  expect(newState.correctSeries).toEqual(1);
});

test('set game is over', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.gameOver(true)
  );
  expect(newState.isFinished).toBe(true);
});

test('set difficulty field for game settings', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.setHasDifficulty(true)
  );
  expect(newState.hasDifficulty).toBe(true);
});

test('set difficulty for sprint game', () => {
  const newState = sprintSlice.reducer(
    state,
    sprintSlice.actions.setSprintDifficult(7000)
  );
  expect(newState.difficulty).toEqual(70);
});


