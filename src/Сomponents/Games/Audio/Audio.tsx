import React from 'react'
import { useSelector } from 'react-redux'
import { useShuffle } from '../../../helpers/hooks'
import { word, words } from '../../../store/reducers/audioSlice'
import { TopPanel } from '../Sprint/TopPanel/TopPanel'
import { Listening } from './Listening/Listening'
import { NextBtn } from './NextBtn/NextBtn'
import { Variants } from './Variants/Variants'

export const Audio = () => {
    const learnedWord = useSelector(word)
    const allWords = useSelector(words)
    const shuffledWords = useShuffle(allWords, learnedWord.ru)
    return(
    <div>
        <Listening/>
        <Variants shuffledWords={shuffledWords}/>
        <NextBtn/>
        <TopPanel/>
    </div>
)}