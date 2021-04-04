import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import item1 from '../../../../assets/image/game-item1.svg'
import item2 from '../../../../assets/image/game-item2.svg'
import item3 from '../../../../assets/image/game-item3.svg'
import item4 from '../../../../assets/image/game-item4.svg'
import styles from './GamesSection.module.scss'
import {  setSprintWords } from '../../../../store/reducers/sprintSlice';
import { setAudioWords } from '../../../../store/reducers/audioSlice';
import { setMemoryGameWords } from '../../../../store/reducers/memoryGameSlice';
import Settings from "../Setting/Settings";
import { bookSections } from '../../../../helpers/constants';

type PropsType = {
    words: object
}
export const GamesSection: FC<PropsType> = ({ words }) => {
    const { sectionId } = useParams();
    const { pageId = "1" } = useParams();
    const [level, image] = [bookSections[sectionId - 1].name, bookSections[sectionId - 1].image]
    const dispatch = useDispatch()
    const onWordsSet = () => {
        setTimeout(()=> {
            dispatch(setSprintWords(words))
            dispatch(setAudioWords(words))
            dispatch(setMemoryGameWords(words))
        },0)
    }
    return (
    <div className={styles.games}>
        <div className={styles.games__content}>
        <div className={styles.level}><span>{level} Уровень</span><img src={image} alt="planets" className={styles.games__icon}/>
        </div>
        <div className={styles.settings}>
        <Settings/>
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
        </div>
        </div>
    </div>
)}
