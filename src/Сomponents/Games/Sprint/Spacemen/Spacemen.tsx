import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Spacemen.module.scss';
import { score } from '../../../../store/reducers/sprintSlice';
import { useIconsArray } from '../../../../helpers/hooks';

export const Spacemen = () => {
  const gameScore = useSelector(score);
  const cosmoIcons = useIconsArray(gameScore);
  return (
    <div className={styles.cosmo__icons}>
      {cosmoIcons.map((icon, index) => (
        <img key={icon} src={icon} alt="cosmo-icon" className={styles.cosmo__icon} />
      ))}
    </div>
  );
};
