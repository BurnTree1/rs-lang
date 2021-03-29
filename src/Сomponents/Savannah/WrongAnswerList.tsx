import React from 'react';
import useSound from 'use-sound';
import styles from './Savannah.module.scss';
import { ReactComponent as VoiceIcon } from './assets/volume_up_24px.svg';
import { WordType } from './types';

type Props = {
  word: WordType;
};

const WrongAnswerList: React.FC<Props> = ({ word }) => {
  const url = 'https://react-learnwords-example.herokuapp.com';
  const [play] = useSound(`${url}/${word.audio}`);

  return (
    <div className={styles.endModalWordContainer}>
      <VoiceIcon className={styles.voiceIcon} onClick={() => play()} />
      <p>
        <span>{word.word} </span> — <span> {word.wordTranslate}</span>
      </p>
    </div>
  );
};

export default WrongAnswerList;
