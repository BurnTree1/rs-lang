import React, { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import item1 from '../../../../assets/image/game-item1.svg'
import item2 from '../../../../assets/image/game-item2.svg'
import item3 from '../../../../assets/image/game-item3.svg'
import item4 from '../../../../assets/image/game-item4.svg'
import styles from './GamesSection.module.scss'
import {  fetchAllWords, fetchWithAdditional, setHasDifficulty, setSprintWords } from '../../../../store/reducers/sprintSlice';
import { fetchAudioWithAdditional, setAudioWords, setHasAudioDifficulty } from '../../../../store/reducers/audioSlice';
import { setMemoryGameWords } from '../../../../store/reducers/memoryGameSlice';
import Settings from "../Setting/Settings";
import { bookSections } from '../../../../helpers/constants';
import { isAuth } from "../../../../helpers";
import { useRandomPage } from '../../../../helpers/hooks'

type PropsType = {
    words: object
}
export const GamesSection: FC<PropsType> = ({ words }) => {
    const { sectionId } = useParams();
    const { pageId = "1" } = useParams();
    const randomPage = useRandomPage()
    const [level, image] = [bookSections[sectionId - 1].name, bookSections[sectionId - 1].image]
    const dispatch = useDispatch()
    useEffect(() => {
        if(words && Object.keys(words).length < 4) {
            dispatch(fetchWithAdditional(sectionId, randomPage, words))
            dispatch(fetchAudioWithAdditional(sectionId, randomPage, words))
            dispatch(setHasDifficulty(false))
            dispatch(setHasAudioDifficulty(false))
        }
    }, [words]);
    const onWordsSet = () => {
        setTimeout(()=> {
           if(Object.keys(words).length >= 4) {
                dispatch(setSprintWords(words))
                dispatch(setAudioWords(words))
                dispatch(setMemoryGameWords(words))
            }
        },0)
    }
    return (
    <div className={styles.games}>
        <div className={styles.games__content}>
        <div className={styles.level}><span>{level} Уровень</span><img src={image} alt="planets" className={styles.games__icon}/>
        </div>
        <h2 className={styles.title}>Попробуй эту страницу с игрой:</h2>
        <div className={styles.games__inner}>
            <div className={styles.games__item}>
                <img src={item1} alt="savannah" className={styles.item__img}/>
                <Link onClick={onWordsSet} to='/savannah'>Саванна</Link>
            </div>
            <div className={styles.games__item}>
                <img src={item2} alt="sprint" className={styles.item__img}/>
                <Link onClick={onWordsSet} to='/sprint'>Спринт</Link>
            </div>
            <div className={styles.games__item}>
                <img src={item3} alt="audio" className={styles.item__img}/>
                <Link onClick={onWordsSet} to='/audio'>Аудиовызов</Link>
            </div>
            <div className={styles.games__item}>
                <img src={item4} alt="my game" className={styles.item__img}/>
                <Link onClick={onWordsSet} to='/my-game'>Memory Game</Link>
            </div>
            <div className={styles.settings}>
                {isAuth && <Settings/>}
            </div>
        </div>
        </div>
    </div>
)}
