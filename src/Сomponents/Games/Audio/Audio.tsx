import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useShuffle } from '../../../helpers/hooks';
import { word, wordsArr } from '../../../store/reducers/audioSlice';
import { Listening } from './Listening/Listening';
import { NextBtn } from './NextBtn/NextBtn';
import { Variants } from './Variants/Variants';

type PropsType = {
  submitGameOver: ()=> void
}
export const Audio: FC<PropsType> = ({ submitGameOver }) => {
  const learnedWord = useSelector(word);
  const allWords = useSelector(wordsArr);
  const shuffledWords = useShuffle(allWords, learnedWord);
  return (
    <div>
      <Listening />
      <Variants shuffledWords={shuffledWords} />
      <NextBtn submitGameOver={submitGameOver}/>
    </div>
  );
};
