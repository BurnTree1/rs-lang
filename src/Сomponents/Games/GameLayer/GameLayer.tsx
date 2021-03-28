import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useSound from "use-sound";
import { setWord, word } from '../../../store/reducers/audioSlice';
import styles from './GameLayer.module.scss'

type PropsType = {
    children: ReactNode
    setIsGameStarted: (value: boolean)=> void
  }
export const GameLayer: FC<PropsType> = (props) => {
  const LOADER_TIME = 3;
  const learnedWord = useSelector(word)
  const [startGame, setStartGame] = useState<boolean>(true);
  const [gameLoader, setGameLoader] = useState<boolean>(false);
  const [loaderSec, setLoaderSec] = useState<number>(LOADER_TIME);
  const [play] = useSound(learnedWord.audio)
  const path = useLocation().pathname
  const dispatch = useDispatch()
    useEffect(() => {
        const loaderId = setInterval(() => {
          if (gameLoader) {
            setLoaderSec(loaderSec - 1);
            if (loaderSec === 1) {
              props.setIsGameStarted(true);
              setGameLoader(false);
            }
          }
        }, 1000);
        return () => {
          clearInterval(loaderId);
        };
      }, [gameLoader, loaderSec, props]);
      const onGameStart = () => {
        dispatch(setWord())
        setStartGame(false);
        setGameLoader(true);
        if(path === '/audio') {
          setTimeout(()=> {
            play()
          },LOADER_TIME * 1000)
        }
      };
    return (
        <div>
        {startGame && (
            <div className={styles.game__start}>
                {props.children}
              <button onClick={onGameStart} type="button" className={styles.start__btn}>
                НАЧАТЬ
              </button>
            </div>
          )}
          {gameLoader && <div className={styles.loader}>{loaderSec}</div>}
          </div>
    )
}