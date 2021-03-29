/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './card.scss';
import card1 from './assets/1.png';
import card2 from './assets/2.png';
import card3 from './assets/3.png';
import card4 from './assets/4.png';
import card5 from './assets/5.png';
import card6 from './assets/6.png';
import card7 from './assets/7.png';
import card8 from './assets/8.png';
import card9 from './assets/9.png';
import card10 from './assets/10.png';
import card11 from './assets/11.png';
import card12 from './assets/12.png';
import { Cards, ICard } from '../../my-game.models';
import { getSrcUrl } from '../../../../helpers/words.helper';
import { IWord } from '../../../../models/common.models';

const cardsMap = {
  [Cards.card1]: card1,
  [Cards.card2]: card2,
  [Cards.card3]: card3,
  [Cards.card4]: card4,
  [Cards.card5]: card5,
  [Cards.card6]: card6,
  [Cards.card7]: card7,
  [Cards.card8]: card8,
  [Cards.card9]: card9,
  [Cards.card10]: card10,
  [Cards.card11]: card11,
  [Cards.card12]: card12,
}

interface IProps extends ICard {
  cardClick(): void;
  animationOn: boolean;
}

export default function Card(props: IProps) {
  const { cardClick, isFlipped, found, animationOn, image, word, wordTranslate, isSecondCard } = props;
  return (
    <div
      className={
        `card-wrapper ${found && animationOn ? 'card-wrapper_hide' : ''}${found && !animationOn ? 'card-wrapper_display_none' : ''}`
        }
        onClick={() => { !found && cardClick() }}>
      <div className={`card${  isFlipped ? " flipped" : ""}`}>
        <div className="card__back" />
        <div className="card__front">
          <img src={getSrcUrl(image)} className="card__image" alt="card__image" />
          <p className="card__description card__description_bold">{isSecondCard ? wordTranslate : word}</p>
          {/* <p className="card__description">{wordTranslate}</p> */}
        </div>
      </div>
    </div>
  );
}
