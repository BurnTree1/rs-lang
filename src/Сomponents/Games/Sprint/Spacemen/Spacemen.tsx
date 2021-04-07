import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Spacemen.module.scss';
import { pointsToAdd, score } from '../../../../store/reducers/sprintSlice';
import { useIconsArray } from '../../../../helpers/hooks';

export const Spacemen = () => {
  const points = useSelector(pointsToAdd);
  const cosmoIcons = useIconsArray(points);
  return (
    <div className={styles.cosmo__icons}>
      {cosmoIcons.map((icon, index) => (
        <img key={icon} src={icon} alt="cosmo-icon" className={styles.cosmo__icon} />
      ))}
    </div>
  );
};
