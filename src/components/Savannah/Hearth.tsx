import React from 'react';
import styles from './Savannah.module.scss';
import { ReactComponent as HearthIcon } from './assets/favorite_24px.svg';
import { ReactComponent as HearthIconBordered } from './assets/favorite_border_24px.svg';

type Props = {
  hearthStatus: boolean;
};

const Hearth: React.FC<Props> = ({ hearthStatus }) => (
  <>{hearthStatus ? <HearthIcon className={styles.hearth} /> : <HearthIconBordered className={styles.hearth} />}</>
);

export default Hearth;
