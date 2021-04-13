import React from "react";
import styles from "./Benefits.module.scss";
import benefits_1 from '../../../assets/image/benefits-1.svg'
import benefits_2 from '../../../assets/image/benefits-2.svg'
import benefits_3 from '../../../assets/image/benefits-3.svg'

export const  Benefits =() => <div className={styles.benefits}>
  <h2 className={styles.title}>Что вы получаете с RS Lang</h2>
  <div className={styles.benefits__inner}>
    <div className={styles.benefits__col}>
      <div className={styles.benefits__item}>
        <img src={benefits_1} alt="icon"/>
        <div className={styles.benefits__text}>Быстрое и интересное изучение лексики</div>
      </div>
      <div className={styles.benefits__item}>
        <img src={benefits_2} alt="icon"/>
        <div className={styles.benefits__text}>Постоянный доступ к учебнику, словарю и статистике</div>
      </div>
      <div className={styles.benefits__item}>
        <img src={benefits_3} alt="icon"/>
        <div className={styles.benefits__text}>Закрепление материала в минииграх</div>
      </div>
    </div>
    <div className={styles.benefits__video}>
      <iframe className={styles.video} width="555" height="325" title='benefits' src="https://www.youtube.com/embed/5nmpokoRaZI" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
    </div>
  </div>
</div>
