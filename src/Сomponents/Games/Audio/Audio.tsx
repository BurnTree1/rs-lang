import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useShuffle } from '../../../helpers/hooks';
import { word, wordsArr } from '../../../store/reducers/audioSlice';
import { Listening } from './Listening/Listening';
import { NextBtn } from './NextBtn/NextBtn';
import { Variants } from './Variants/Variants';

export const Audio = () => {
  const learnedWord = useSelector(word);
  const allWords = useSelector(wordsArr);
  const shuffledWords = useShuffle(allWords, learnedWord.wordTranslate);
  return (
    <div>
      <Listening />
      <Variants shuffledWords={shuffledWords} />
      <NextBtn />
    </div>
  );
};
