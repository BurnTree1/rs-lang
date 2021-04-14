import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useSound from "use-sound";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import styles from '../../Savannah/Savannah.module.scss';
import ValueLabel from './ValueLabel';
import RadioButtons from './RadioButtons';
import { fetchAllWords, gameOver, hasDifficulty, setSprintDifficult } from '../../../store/reducers/sprintSlice';
import { audioGameOver, fetchAllAudioWords, setAudioDifficult, word } from '../../../store/reducers/audioSlice';
import { useRandomPage } from '../../../helpers/hooks';
import { URL_API } from '../../../helpers/constants';

type Props = {
  setSettings: Dispatch<SetStateAction<{ section: string; difficult: string }>>;
  setGameStatus: Dispatch<SetStateAction<{ startView: boolean; getReadyView: boolean; settingsView: boolean }>>;
  startPlay?: () => void
  difficultType: string
};

const SettingsSlider = withStyles({
  root: {
    width: 300,
    position: 'relative',
    padding: 0,
  },
  track: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#85c5e9',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    border: '3px solid #91D5FF',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  rail: {
    height: 4,
    borderRadius: 100,
    backgroundColor: '#a5bfd4',
  },
})(Slider);

const sections = ['Начальный', 'Легкий', 'Средний', 'Сложный', 'Великий', 'Невероятный'];

const SettingsView: React.FC<Props> = ({ setSettings, setGameStatus, startPlay, difficultType }) => {
  const [values, setValues] = useState<{ section: number; difficult: string }>({
    section: 0,
    difficult: '7000',
  });
  const LOADER_TIME = 4;
  const learnedWord = useSelector(word)
  const dispatch = useDispatch()
  const url = URL_API
  const [play] = useSound(`${url}/${learnedWord.audio}`)
  const path = useLocation().pathname
  const difficulty = useSelector(hasDifficulty)
  const randomPage = useRandomPage()
  const onChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    setValues((prevState) => ({
      ...prevState,
      section: value as number,
    }));
  };
  const onConfirm = () => {
    const currentDifficult = sections[values.section];
    setSettings({
      section: currentDifficult,
      difficult: values.difficult,
    });
    setGameStatus((prevState) => ({
      ...prevState,
      settingsView: false,
    }));
    if(difficulty) {
      dispatch(fetchAllWords(values.section, randomPage))
      dispatch(fetchAllAudioWords(values.section, randomPage))
    }
    dispatch(setSprintDifficult(values.difficult))
    dispatch(setAudioDifficult(values.difficult))
    dispatch(gameOver(false))
    dispatch(audioGameOver(false))
    startPlay && startPlay()
  };
  return (
    <div className={styles.settingsContainer}>
      <span>Настройки</span>
      {difficulty &&
      <div className={styles.sliderContainer}>
        <span>Выберите раздел</span>
        <SettingsSlider
          value={values.section}
          min={0}
          max={5}
          step={1}
          valueLabelDisplay="on"
          ValueLabelComponent={ValueLabel}
          onChange={onChange}
        />
      </div> }
      <div className={styles.radioButtonsContainer}>
        <span>Выберите сложность (влияет на {difficultType})</span>
        <RadioButtons setValues={setValues} />
      </div>
      <button type="button" onClick={onConfirm}>
        Продолжить
      </button>
    </div>
  );
};

export default SettingsView;
