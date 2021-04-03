import reducer, { audioSlice, WordsType ,
  nextWord,
  gameOver,
  makeAnswer,
} from './audioSlice';


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
  next: {} as WordsType,
  isFinished: false,
  correctAnswers: [] as Array<WordsType>,
  wrongAnswers: [] as Array<WordsType>,
  isAnswered: false,
  hasDifficulty: true
};

test('is question is answered', () => {
  const newState = audioSlice.reducer(
    state,
    audioSlice.actions.setAnswered(true)
  );
  expect(newState.isAnswered).toBe(true);
});

test('is game over', () => {
  const newState = audioSlice.reducer(
    state,
    audioSlice.actions.gameOver()
  );
  expect(newState.isFinished).toBe(true);
});

test('set correct or incorrect answer', () => {
  const newState = audioSlice.reducer(
    state,
    audioSlice.actions.makeAnswer('привет')
  );
  expect(newState.correctAnswers[0].wordTranslate).toBe('привет');
});

test('set next word for audio game', () => {
  const newState = audioSlice.reducer(
    state,
    audioSlice.actions.nextWord({
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
    })
  );
  expect(newState.word.word).toBe('hello');
});