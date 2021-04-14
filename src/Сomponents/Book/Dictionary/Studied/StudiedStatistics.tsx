import React, { FC } from "react";
import { useParams } from "react-router-dom";
import get from "lodash/get";
import { Diagram } from "./Diagram/Diagram";
import styles from "./StudiedStatistics.module.scss";
import { bookSections } from "../../../../helpers";
import { WordType } from "../../../../types";

export const StudiedStatistics: FC<{ words: Array<WordType> }> = ({ words }) => {
  const { sectionId } = useParams();
  const [level, image] = [bookSections[sectionId - 1].name, bookSections[sectionId - 1].image];
  let correct = 0;
  let wrong = 0;

  words.forEach((word) => {
    correct += get(word, "userWord.optional.correct", 0);
    wrong += get(word, "userWord.optional.wrong", 0);
  });

  const formData = [
    {
      "id": "Правильные",
      "value": correct
    }, {
      "id": "Неправильные",
      "value": wrong
    }
  ];

  return (
    <div className={styles.statistics}>
      <div className={styles.level}>
        <span>{level} Уровень</span>
        <img src={image} alt="planets" className={styles.category__icon}/>
      </div>
      <h2 className={styles.title}>Страница: {words.length} слов</h2>
      <div className={styles.diagram}>
        {(correct !== 0 || wrong !== 0) ? <Diagram data={formData}/> : <h3>Ни одно слово не было изучено</h3>}
      </div>
    </div>
  );
};
