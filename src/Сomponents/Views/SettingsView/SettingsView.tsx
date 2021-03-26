import React, { Dispatch, SetStateAction, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import styles from '../../Savannah/Savannah.module.scss';
import ValueLabel from './ValueLabel';
import RadioButtons from './RadioButtons';

type Props = {
  setSettings: Dispatch<SetStateAction<{ section: string; difficult: string }>>;
  setGameStatus: Dispatch<SetStateAction<{ startView: boolean; getReadyView: boolean; settingsView: boolean }>>;
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

const SettingsView: React.FC<Props> = ({ setSettings, setGameStatus }) => {
  const [values, setValues] = useState<{ section: number; difficult: string }>({
    section: 0,
    difficult: '',
  });

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
  };

  return (
    <div className={styles.settingsContainer}>
      <span>Настройки</span>
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
      </div>
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

export default SettingsView;
