/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './card.scss';
import { ICard } from '../../my-game.models';
import { getSrcUrl } from '../../../../../helpers/words.helper';

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
