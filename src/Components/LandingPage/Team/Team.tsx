import React from "react";
import styles from "./Team.module.scss";
import avatar from "../../../assets/image/avatar.jpg";

export const Team = () => (
  <div className={styles.team}>
    <h2 className={styles.title}>Наша команда</h2>
    <div className={styles.team__inner}>
      <div className={styles.team__item}>
        <div className={styles.photo}>
          <img src={avatar} alt="avatar" className={styles.photo__img}/>
        </div>
        <div className={styles.text}>Lorem ipsum</div>
      </div>
      <div className={styles.team__item}>
        <div className={styles.photo}>
          <img src={avatar} alt="avatar" className={styles.photo__img}/>
        </div>
        <div className={styles.text}>Lorem ipsum</div>
      </div>
      <div className={styles.team__item}>
        <div className={styles.photo}>
          <img src={avatar} alt="avatar" className={styles.photo__img}/>
        </div>
        <div className={styles.text}>Lorem ipsum</div>
      </div>
      <div className={styles.team__item}>
        <div className={styles.photo}>
          <img src={avatar} alt="avatar" className={styles.photo__img}/>
        </div>
        <div className={styles.text}>Lorem ipsum</div>
      </div>
    </div>
  </div>
);