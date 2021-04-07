import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHasDifficulty, wordsArr } from '../../store/reducers/sprintSlice';
import styles from './Savannah.module.scss';
import Word from './Word';
import HeartsWidget from './HeartsWidget';
import { ReactComponent as RockIcon } from './assets/astronomy.svg';
import { ReactComponent as FullScreenIcon } from './assets/fullscreen_24px.svg';
import { ReactComponent as CloseIcon } from './assets/close_24px_outlined.svg';
import getThreeRandomWords, { shuffleArray } from '../../helpers/shuffleArray';
import Words from './Words';
import EndGameModal from '../Modals/EndGameModal';
import StartView from '../Views/StartView/StartView';
import GetReadyView from '../Views/GetReadyView/GetReadyView';
import SettingsView from '../Views/SettingsView/SettingsView';
import GamePauseModal from '../Modals/GamePauseModal';
import { sendStatistics } from '../../helpers/statistics';
import { Games } from '../../models/common.models';
import { serviceContext } from '../../contexts/ServiceContext';
// @ts-ignore
import correct from '../../assets/sounds/sprint-correct.mp3';
// @ts-ignore
import wrong from '../../assets/sounds/sprint-wrong.wav';

const Savannah = () => {
  const rockRef = useRef<HTMLDivElement>(null);
  const words = useSelector(wordsArr)
  const dispatch = useDispatch()
  const [currentWords, setCurrentWords] = useState<typeof words>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  const [wrongAnswers, setWrongAnswers] = useState<typeof words>([]);
  const [rightAnswers, setRightAnswers] = useState<typeof words>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [livesLeft, setLives] = useState<number>(5);
  const [livesCount] = useState<number>(5);
  const [settings, setSettings] = useState({
    section: '',
    difficult: '',
  });
  const [gameIsPaused, setGameIsPaused] = useState(false);
  const [gameIsDone, setGameIsDone] = useState<boolean>(false);
  const [gameView, setGameView] = useState({
    startView: true,
    getReadyView: true,
    settingsView: true,
  });
  const playCorrect = new Audio(correct);
  const playWrong = new Audio(wrong);

  const [longestSeries, setLongesSeries] = useState<number>(0);
  const { service } = useContext(serviceContext);

  const sendStat = useCallback(
    () => {
      sendStatistics({
        name: Games.savannah,
        service,
        rightAnswers: rightAnswers.length,
        wrongAnswers: wrongAnswers.length,
        longestSeries
      });
    },
    [service, rightAnswers, wrongAnswers, longestSeries]
  );
  useEffect(() => {
    const wordsWithoutCurrentWord = [...words.slice(0, currentLevel), ...words.slice(currentLevel + 1, words.length)];
    const newWords = getThreeRandomWords(wordsWithoutCurrentWord);
    newWords.push(words[currentLevel]);
    setCurrentWords(shuffleArray(newWords));
    setCurrentAnswer(words[currentLevel].wordTranslate);
  }, [currentLevel, words]);

  useEffect(() => {
    if (livesLeft === 0) {
      setGameIsDone(true);
      sendStat();
    }
  }, [livesLeft, sendStat]);

  const setNextLevel = () => {
    if (currentLevel === words.length - 1) {
      setGameIsDone(true);
      sendStat();
      return;
    }
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const setHearth = () => {
    setLives((state) => state - 1);
    setWrongAnswers((prevState: any) => [...prevState, words[currentLevel]]);
  };

  const checkAnswer = (variant: string) => {
    const word = variant;
    if (word !== currentAnswer) {
      setLongesSeries(0);
      setHearth();
      playWrong.play();
    } else {
      setLongesSeries(longestSeries + 1);
      setRightAnswers((prevState: any) => [...prevState, words[currentLevel]]);
      playCorrect.play();
    }
    setNextLevel();
  };

  const onClose = () => {
    setGameIsPaused(true);
  };

  const onFullScreen = () => {
    const doc = document.documentElement as HTMLElement & {
      webkitRequestFullscreen(): Promise<void>;
    };
    if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    }
  }

  const onCloseGame = () => {
    setGameIsPaused(false)
    setGameIsDone(false)
    setGameView((prevState) => ({
      ...prevState,
      startView: true,
      settingsView: true,
      getReadyView: true
    }))
    dispatch(setHasDifficulty(true))
  }

  const conditionalRender = () => {
    if (gameView.startView) return <StartView setGameStatus={setGameView} />;
    if (gameView.settingsView) return <SettingsView difficultType='время ответа' setSettings={setSettings} setGameStatus={setGameView} />;
    if (gameView.getReadyView) return <GetReadyView setGameStatus={setGameView} />;

    return (
      <>
        <div className={styles.iconsContainer}>
          <div className={styles.heartsContainer}>
            <HeartsWidget livesCount={livesCount} livesLeft={livesLeft} />
          </div>
          <FullScreenIcon onClick={onFullScreen} className={styles.fullscreenIcon} />
          <CloseIcon className={styles.close} onClick={onClose} />
        </div>
        <Word
          gameIsPaused={gameIsPaused}
          gameIsDone={gameIsDone}
          rockRef={rockRef}
          speed={+settings.difficult || 2000}
          currentWord={words[currentLevel].word}
          setNextLevel={setNextLevel}
          setHearths={setHearth}
        />
        <Words currentWords={currentWords} checkAnswer={checkAnswer} />
        <div className={styles.secondBlock} ref={rockRef}>
          <RockIcon height="100px" width="100px" />
        </div>
      </>
    );
  };

  return (
    <div className={styles.gameContainer}>
      {conditionalRender()}
      {gameIsPaused && (
        <>
          <div className={styles.overlay} />
          <GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone} onCloseGame={onCloseGame}/>
        </>
      )}
      {gameIsDone && (
        <>
          <div className={styles.overlay} />
          <EndGameModal wrongAnswers={wrongAnswers} rightAnswers={rightAnswers} submit={onCloseGame}/>
        </>
      )}
    </div>
  );
};

export default Savannah;
