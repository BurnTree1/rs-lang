import useSound from "use-sound";
import { WordsType } from "../store/reducers/audioSlice";

export const useRandom = (length: number) => {
    const random = Math.random();
    const randomIndex = Math.round(0 - 0.5 + Math.random() * (length - 1));
    return { random, randomIndex }
}

export const useAudio = (sound: string) => {
    const [play] = useSound(sound)
    return play
}

export const useShuffle = (array: Array<WordsType>, word: string) => {
const shuffledArr = array.filter((w: WordsType)=> w.ru !== word).sort(()=>Math.random() - 0.5)
return [shuffledArr[0].ru,
shuffledArr[1].ru,
shuffledArr[2].ru,
word
].sort(()=> Math.random() - 0.5)
}