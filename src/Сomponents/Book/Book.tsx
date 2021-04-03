import React, { FC } from 'react';
import map from 'lodash/map';
import { Link } from 'react-router-dom';
import { bookBuilder, bookSections } from '../../helpers';
import styles from './Book.module.scss';
import arrow from '../../assets/image/arrow-link.svg'

export default () => (
  <div>
    <h1 className={styles.title}>Учебник</h1>
    <div className={styles.categories}>
      {map(bookSections, ({ name, id, image }) => (
        <SectionItem key={id} id={id} name={name} image={image} />
      ))}
    </div>
  </div>
);

const SectionItem: FC<{ id: number; name: string; image: string }> = ({ id, name, image }) => (
  <div className={styles.categories__item}>
    <Link to={bookBuilder(id)} className={styles.categories__link}>
      <img src={image} alt="section" className={styles.categories__img} />
      <div className={styles.categories__name}>{name}</div>
    </Link>
    <div className={styles.arrow}>
      <img src={arrow} alt="arrow" className={styles.arrow__img}/>
    </div>
  </div>
);
