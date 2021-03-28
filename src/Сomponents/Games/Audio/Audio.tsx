import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useShuffle } from '../../../helpers/hooks'
import { correctAnswers, word, words, wrongAnswers } from '../../../store/reducers/audioSlice'
import EndGameModal from '../../Modals/EndGameModal'
import GamePauseModal from '../../Modals/GamePauseModal'
import { TopPanel } from '../Sprint/TopPanel/TopPanel'
import { Listening } from './Listening/Listening'
import { NextBtn } from './NextBtn/NextBtn'
import { Variants } from './Variants/Variants'
import styles from './Audio.module.scss'

export const Audio = () => {
    const learnedWord = useSelector(word)
    const allWords = useSelector(words)
    const wrongWords = useSelector(wrongAnswers)
  const correctWords = useSelector(correctAnswers)
  const [gameIsPaused, setGameIsPaused] = useState<boolean>(false);
  const [gameIsDone, setGameIsDone] = useState<boolean>(false);
    const shuffledWords = useShuffle(allWords, learnedWord.ru)
    return(
    <div>
        <Listening/>
        <Variants shuffledWords={shuffledWords}/>
        <NextBtn/>
        <TopPanel setGameIsPaused={setGameIsPaused}/>
      {gameIsPaused && <div className={styles.overlay}><GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone}/></div>}
        {gameIsDone && (
        <>
          <div className={styles.overlay} />
          <EndGameModal wrongAnswers={wrongWords} rightAnswers={correctWords} />
        </>
      )}
    </div>
)}