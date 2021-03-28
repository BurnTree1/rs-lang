import React, { RefObject, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './Savannah.module.scss';

type Props = {
  gameIsDone: boolean;
  gameIsPaused: boolean;
  rockRef: RefObject<HTMLDivElement>;
  speed: number;
  currentWord: string;
  setNextLevel: () => void;
  setHearths: () => void;
};

const Word: React.FC<Props> = ({ rockRef, speed, currentWord, setNextLevel, setHearths, gameIsDone, gameIsPaused }) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const [newTime, setNewTime] = useState<number>();
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [initialCoordY, setInitialCoordY] = useState<number>();

  const [props, set, stop] = useSpring(() => ({
    top: coordinates.y,
    from: { top: initialCoordY },
    reset: true,
    config: { duration: speed },
  }));

  const onResume = () => {
    if (wordRef.current && rockRef.current) {
      const yCoordOfWord = wordRef.current.getBoundingClientRect().y;
      const yCooodOfBox = rockRef.current.getBoundingClientRect().y;
      setCoordinates({
        x: yCoordOfWord,
        y: yCooodOfBox,
      });
      setNewTime(speed - (yCoordOfWord / yCooodOfBox) * speed);
    }
  };

  useEffect(() => {
    if (gameIsDone || gameIsPaused) stop();
    else onResume();
  }, [gameIsDone, gameIsPaused]);

  useEffect(() => {
    if (wordRef.current) setInitialCoordY(wordRef.current.getBoundingClientRect().y + 60);
  }, []);

  useEffect(() => {
    if (wordRef.current && rockRef.current) {
      const yCoordOfWord = wordRef.current.getBoundingClientRect().y;
      const yCooodOfBox = rockRef.current.getBoundingClientRect().y;
      setCoordinates({
        x: yCoordOfWord,
        y: yCooodOfBox,
      });
    }
  }, [speed, rockRef]);

  useEffect(() => {
    set({
      top: coordinates.y,
      from: { top: coordinates.x },
      config: { duration: speed },
      onRest: (a) => {
        if (a.finished) {
          setNextLevel();
          setHearths();
        }
      },
    });
  }, [coordinates]);

  useEffect(() => {
    set({
      top: coordinates.y,
      reset: false,
      config: { duration: newTime },
      onRest: (a) => {
        if (a.finished) {
          setNextLevel();
          setHearths();
        }
      },
    });
  }, [newTime]);

  useEffect(() => {
    set({
      top: coordinates.y,
      from: { top: initialCoordY },
      reset: true,
      config: { duration: speed },
      onRest: (a) => {
        if (a.finished) {
          setNextLevel();
          setHearths();
        }
      },
    });
  }, [currentWord]);

  return (
    <>
      <animated.span className={styles.firstBlock} style={props} ref={wordRef}>
        {currentWord}
      </animated.span>
    </>
  );
};

export default Word;
