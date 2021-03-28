export const shuffleArray = <T>(a: Array<T>): Array<T> => {
  const words = [...a];
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
};

const getThreeRandomWords = <T>(a: Array<T>): Array<T> => {
  const shuffledArray = shuffleArray(a);
  const randomWords = [];
  for (let i = 0; i < 3; i++) {
    const randomKey = Math.round(Math.random() * (shuffledArray.length - 1));
    randomWords.push(shuffledArray[randomKey]);
    shuffledArray.splice(randomKey, 1);
  }
  return randomWords;
};

export default getThreeRandomWords;
