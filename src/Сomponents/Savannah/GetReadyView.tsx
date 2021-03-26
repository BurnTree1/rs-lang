import React, { Dispatch, SetStateAction } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Savannah.module.scss';

type Props = {
  setGameStatus: Dispatch<SetStateAction<{ startView: boolean; getReadyView: boolean; settingsView: boolean }>>;
};
const GetReadyView: React.FC<Props> = ({ setGameStatus }) => {
  const EllipseProps = useSpring({
    x: 314,
    from: { x: 0 },
    reset: true,
    config: { duration: 4000 },
    onRest: () => {
      setGameStatus((prevState) => ({
        ...prevState,
        getReadyView: false,
      }));
    },
  });

  const wordProps = useSpring({
    number: 0,
    from: { number: 4 },
    config: { duration: 5000 },
  });

  return (
    <div>
      <animated.svg strokeDashoffset={EllipseProps.x} className={styles.EllipseSVG}>
        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="47"
            cy="47"
            r="45"
            stroke="#2196F3"
            strokeWidth="4"
            strokeMiterlimit="2.3662"
            strokeDasharray="314"
          />
        </svg>
      </animated.svg>
      <animated.span className={styles.animatedWord}>{wordProps.number}</animated.span>
    </div>
  );
};
export default GetReadyView;
