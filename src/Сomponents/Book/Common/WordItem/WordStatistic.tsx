import React from "react";
import styles from "./WordItem.module.scss";

export default ({ info }: any) => <>
  <span className={styles.word__progress}>{info.correct || 0}</span>
  <span className={styles.word__progress}>{info.wrong || 0}</span>
</>
