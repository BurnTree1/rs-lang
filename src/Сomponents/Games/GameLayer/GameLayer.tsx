import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import GetReadyView from '../../Views/GetReadyView/GetReadyView';
import SettingsView from '../../Views/SettingsView/SettingsView';
import styles from './GameLayer.module.scss'

type PropsType = {
    children: ReactNode
    setIsGameStarted: (value: boolean)=> void
    difficultType: string
    isGameStarted?: boolean
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
        setTimeout(()=> {
          if (gameLoader) {
          props.setIsGameStarted(true);
               setGameLoader(false);
          }
        },4000)
      }, [gameLoader, loaderSec]);
      const onGameStart = () => {
        setStartGame(false);
        setIsGameSetings(true);
      };
      const startPlay = () => {
        setIsGameSetings(false)
        setGameLoader(true) 
      }
      useEffect(() => {
        setStartGame(!props.isGameStarted)
      }, [props.isGameStarted]);
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
          {gameLoader && <GetReadyView/>}
          </div>
    )
}