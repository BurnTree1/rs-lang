import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './Savannah.module.scss';
import './animation.scss';
import words from './mockData';
import Word from './Word';
import Hearth from './Hearth';
import { ReactComponent as RockIcon } from './assets/stone 1.svg';
import { ReactComponent as SettingsIcon } from './assets/build_24px.svg';
import { ReactComponent as CloseIcon } from './assets/close_24px_outlined.svg';

const Savannah = () => {
  const rockRef = useRef<HTMLDivElement>(null);
  const [currentWords, setCurrentWords] = useState<Array<string>>([]);
  const [speed, setSpeed] = useState<number>(5000000);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [brokenHearts] = useState<number>(5);
  const [livesLeft, setLives] = useState<number>(5);
  const [hearts, setHearts] = useState(
    Array(5)
      .fill(1)
      .map(() => <Hearth hearthStatus={true} key={Math.random()} />)
  );

  useEffect(() => {
    setCurrentWords(words.slice(currentLevel * 4, 4 * (1 + currentLevel)) as Array<string>);
  }, [currentLevel]);

  const setNextLevel = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const setHearth = () => {
    const newArray = [...hearts];
    newArray[brokenHearts - livesLeft] = <Hearth hearthStatus={false} key={Math.random()} />;
    setHearts(newArray);
    setLives((state) => state - 1);
  };

  const checkAnswer = (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => {
    const word = e.currentTarget.textContent;
    if (word && word.slice(2) !== currentWords[0]) {
      setHearth();
    }
    setNextLevel();
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.iconsContainer}>
        <div className={styles.hearthsContainer}>{hearts}</div>
        <SettingsIcon className={styles.setting} />
      </div>
      <CloseIcon className={styles.close} />
      {currentWords[0] && (
        <Word
          parawaRef={rockRef}
          speed={speed}
          currentWord={currentWords[0]}
          setNextLevel={setNextLevel}
          setHearths={setHearth}
        />
      )}
      <div className={styles.wordsContainer}>
        {currentWords.map((word, idx) => (
          <span key={word} onClick={checkAnswer}>{`${idx}.${word}`}</span>
        ))}
      </div>
      <div className={styles.secondBlock} ref={rockRef} onClick={setNextLevel}>
        <RockIcon height="100px" width="100px" />
      </div>
    </div>
  );
};

export default Savannah;
