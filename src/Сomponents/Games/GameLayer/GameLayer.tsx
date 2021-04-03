import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SettingsView from '../../Views/SettingsView/SettingsView';
import styles from './GameLayer.module.scss'

type PropsType = {
    children: ReactNode
    setIsGameStarted: (value: boolean)=> void
    difficultType: string
  }
export const GameLayer: FC<PropsType> = (props) => {
  const LOADER_TIME = 3;
  const [startGame, setStartGame] = useState<boolean>(true);
  const [gameLoader, setGameLoader] = useState<boolean>(false);
  const [loaderSec, setLoaderSec] = useState<number>(LOADER_TIME);
  const [isGameSetings, setIsGameSetings] = useState<boolean>(false)
  const [settings, setSettings] = useState({
    section: '',
    difficult: ''
})
  const [gameView, setGameView] = useState({
    startView: false,
    getReadyView: false,
    settingsView: false
})
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
        setStartGame(false);
        setIsGameSetings(true);
      };
      const startPlay = () => {
        setIsGameSetings(false)
        setGameLoader(true) 
      }
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
          {isGameSetings && <SettingsView difficultType={props.difficultType} setSettings={setSettings} setGameStatus={setGameView} startPlay={startPlay}/>}
          {gameLoader && <div className={styles.loader}>{loaderSec}</div>}
          </div>
    )
}