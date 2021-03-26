import React, { useEffect, useState } from 'react';
import styles from './Savannah.module.scss';
import { ReactComponent as HeartIcon } from './assets/favorite_24px.svg';
import { ReactComponent as HeartIconBordered } from './assets/favorite_border_24px.svg';

type Props = {
  livesLeft: number;
  livesCount: number;
};

const HeartsWidget: React.FC<Props> = ({ livesLeft, livesCount }) => {
  const [countOfBorderedIcons, setCountOfBorderedIcons] = useState<number>(0);

  useEffect(() => {
    setCountOfBorderedIcons(livesCount - livesLeft);
  }, [livesLeft, livesCount]);

  return (
    <>
      {Array(countOfBorderedIcons)
        .fill(true)
        .map(() => (
          <HeartIconBordered key={Math.random()} className={styles.heart} />
        ))}
      {Array(livesLeft)
        .fill(true)
        .map(() => (
          <HeartIcon key={Math.random()} className={styles.heart} />
        ))}
    </>
  );
};

export default HeartsWidget;
