import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import styles from './SettingsModal.module.scss';
import { useRandomPage } from '../../../../../helpers/hooks';
import ValueLabel from '../../../../Views/SettingsView/ValueLabel';
import RadioButtons from '../../../../Views/SettingsView/RadioButtons';
import { fetchAllWords, hasDifficulty, loading } from '../../../../../store/reducers/memoryGameSlice';

type Props = {
  setSettings: Dispatch<SetStateAction<{ section: string; difficult: string }>>;
  setGameStatus: Dispatch<SetStateAction<{ startView: boolean; getReadyView: boolean; settingsView: boolean }>>;
  startPlay?: () => void
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

const SettingsModal: React.FC<Props> = ({ setSettings, setGameStatus, startPlay }) => {
  const [values, setValues] = useState<{ section: number; difficult: string }>({
    section: 0,
    difficult: '7000',
  });
  const dispatch = useDispatch();
  const difficulty = useSelector(hasDifficulty);
  const loadingGame = useSelector(loading);
  const randomPage = useRandomPage();
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
    dispatch(fetchAllWords(values.section, randomPage));
  };
  return (
    <div className={styles.settingsContainer}>
      {loadingGame && (<span>Loading...</span>)}
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
        <span>Выберите сложность</span>
        <RadioButtons setValues={setValues} />
      </div>
      <button type="button" onClick={onConfirm}>
        Продолжить
      </button>
    </div>
  );
};

export default SettingsModal;
