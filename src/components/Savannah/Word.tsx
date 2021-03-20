import React, { RefObject, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './Savannah.module.scss';

type Props = {
  parawaRef: RefObject<HTMLDivElement>;
  speed: number;
  currentWord: string;
  setNextLevel: () => void;
  setHearths: () => void;
};

const Word: React.FC<Props> = ({ parawaRef, speed, currentWord, setNextLevel, setHearths }) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<number>();
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset(true);
  }, [currentWord]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setNextLevel();
      setHearths();
      setReset(true);
    }, time);
    return () => {
      clearTimeout(timerId);
    };
  }, [time, currentWord, setNextLevel, setHearths]);

  const animationProps = useSpring({
    top: coordinates.y,
    from: { top: coordinates.x + 60 },
    reset,
    config: { duration: time },
  });

  useEffect(() => {
    if (wordRef.current && parawaRef.current) {
      const yCoordOfWord = wordRef.current.getBoundingClientRect().y;
      const yCooodOfBox = parawaRef.current.getBoundingClientRect().y;
      setCoordinates({
        x: yCoordOfWord,
        y: yCooodOfBox,
      });
      setTime(speed / (yCooodOfBox - yCoordOfWord));
    }
  }, [speed, parawaRef]);

  return (
    <animated.span className={styles.firstBlock} style={animationProps} ref={wordRef}>
      {currentWord}
    </animated.span>
  );
};

export default Word;
