import React, { useEffect, useRef, useState } from 'react';
import styles from './Savannah.module.scss';
import './animation.scss';
import words from './mockData';
import Word from './Word';
import HeartsWidget from './HeartsWidget';
import { ReactComponent as RockIcon } from './assets/stone 1.svg';
import { ReactComponent as FullScreenIcon } from './assets/fullscreen_24px.svg';
import { ReactComponent as CloseIcon } from './assets/close_24px_outlined.svg';
import getThreeRandomWords, { shuffleArray } from '../../helpers/shuffleArray';
import Words from './Words';
import EndGameModal from './EndGameModal';
import StartView from './StartView';
import GetReadyView from './GetReadyView';
import SettingsView from './SettingsView';
import GamePauseModal from './GamePauseModal';

const Savannah = () => {
  const rockRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const wordsWithoutCurrentWord = [...words.slice(0, currentLevel), ...words.slice(currentLevel + 1, words.length)];
    const newWords = getThreeRandomWords(wordsWithoutCurrentWord);
    newWords.push(words[currentLevel]);
    setCurrentWords(shuffleArray(newWords));
    setCurrentAnswer(words[currentLevel].wordTranslate);
  }, [currentLevel]);

  useEffect(() => {
    if (livesLeft === 0) setGameIsDone(true);
  }, [livesLeft]);

  const setNextLevel = () => {
    if (currentLevel === words.length - 1) {
      setGameIsDone(true);
      return;
    }
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const setHearth = () => {
    setLives((state) => state - 1);
    setWrongAnswers((prevState) => [...prevState, words[currentLevel]]);
  };

  const checkAnswer = (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => {
    const word = e.currentTarget.textContent;
    if (word && word.slice(2) !== currentAnswer) {
      setHearth();
    } else {
      setRightAnswers((prevState) => [...prevState, words[currentLevel]]);
    }
    setNextLevel();
  };

  const onClose = () => {
    setGameIsPaused(true);
  };

  const conditionalRender = () => {
    if (gameView.startView) return <StartView setGameStatus={setGameView} />;
    if (gameView.settingsView) return <SettingsView setSettings={setSettings} setGameStatus={setGameView} />;
    if (gameView.getReadyView) return <GetReadyView setGameStatus={setGameView} />;

    return (
      <>
        <div className={styles.iconsContainer}>
          <div className={styles.heartsContainer}>
            <HeartsWidget livesCount={livesCount} livesLeft={livesLeft} />
          </div>
          <FullScreenIcon className={styles.fullscreenIcon} />
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
      <CloseIcon className={styles.close} onClick={onClose} />
      {gameIsPaused && (
        <>
          <div className={styles.overlay} />
          <GamePauseModal setGameIsPaused={setGameIsPaused} setGameIsDone={setGameIsDone} />
        </>
      )}
      {gameIsDone && (
        <>
          <div className={styles.overlay} />
          <EndGameModal wrongAnswers={wrongAnswers} rightAnswers={rightAnswers} />
        </>
      )}
    </div>
  );
};

export default Savannah;
