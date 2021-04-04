import React, { FC } from "react";
import { head, last } from "lodash";
import { Link, useParams } from "react-router-dom";
import { bookSections, urlBuilder } from "../../../helpers";
import arrow from '../../../assets/image/categories-arrow.svg'
import styles from './SectionHandler.module.scss'

const SectionHandler: FC<{prefix: string}> = ({ prefix }) => {
  const { sectionId } = useParams();
  const sectionInt = parseInt(sectionId, 10);

  // @ts-ignore
  const leftLink = head(bookSections).id !== sectionInt ?
    <Link className={styles.category__link} to={urlBuilder(prefix, sectionInt - 1)}>
      <img className={styles.arrow} src={arrow} alt="prev"/>
      <img src={bookSections[sectionInt - 2].image} alt="category"/>
      {bookSections[sectionInt - 2].name}
    </Link> : null;

  // @ts-ignore
  const rightLink = last(bookSections).id !== sectionInt ?
    <Link className={styles.category__link} to={urlBuilder(prefix, sectionInt + 1)}>
      {bookSections[sectionInt].name}
      <img src={bookSections[sectionInt].image} alt="category"/>
      <img className={styles.arrow} src={arrow} alt="next"/>
    </Link> : null;

  return <div className={styles.categories}>
    {leftLink}
    {rightLink}
  </div>;
};

export default SectionHandler;
