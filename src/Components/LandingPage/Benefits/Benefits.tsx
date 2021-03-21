import React from "react";
import styles from "./Benefits.module.scss";
import benefits_1 from '../../../assets/image/benefits-1.svg'
import benefits_2 from '../../../assets/image/benefits-2.svg'
import benefits_3 from '../../../assets/image/benefits-3.svg'

export const  Benefits =() => <div className={styles.benefits}>
  <h2 className="title">Что вы получаете с RLang</h2>
  <div className="benefits__inner">
    <div className="benefits__col">
      <div className="benefits__item">
        <img src={benefits_1} alt="icon"/>
        <div className="benefits__text">Быстрое и интересное изучение лексики</div>
      </div>
      <div className="benefits__item">
        <img src={benefits_2} alt="icon"/>
        <div className="benefits__text">Постоянный доступ к учебнику, словарю и статистике</div>
      </div>
      <div className="benefits__item">
        <img src={benefits_3} alt="icon"/>
        <div className="benefits__text">Постоянный доступ к учебнику, словарю и статистике</div>
      </div>
    </div>
    <div className="benefits__video">
      video
    </div>
  </div>
</div>