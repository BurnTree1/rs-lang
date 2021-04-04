import React from 'react';
import { useParams } from 'react-router-dom';
import { bookSections } from '../../../../helpers/constants';
import { data } from '../../../../helpers/diagramData';
import { Diagram } from './Diagram/Diagram';
import styles from './StudiedStatistics.module.scss';

export const StudiedStatistics = () => {
    const { sectionId } = useParams();
    const [level, image] = [bookSections[sectionId - 1].name, bookSections[sectionId - 1].image]
    const diagramData = data
  return (
    <div className={styles.statistics}>
      <div className={styles.level}>
        <span>{level} Уровень</span>
        <img src={image} alt="planets" className={styles.category__icon} />
      </div>
      <h2 className={styles.title}>Статистика раздела:</h2>
        <div className={styles.diagram}>
            <Diagram data={diagramData}/>
        </div>
      <h2 className={styles.title}>Статистика страницы:</h2>
        <div className={styles.diagram}>
        <Diagram data={diagramData}/>
        </div>
    </div>
  );
};
