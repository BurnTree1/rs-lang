import { CircularProgress } from "@material-ui/core";
import React, { FC } from "react";
import styles from './Preloading.module.scss';

export const Preloading: FC = () => (
  <div className={styles.overlay}>
    <CircularProgress size={100} />
  </div>
);
