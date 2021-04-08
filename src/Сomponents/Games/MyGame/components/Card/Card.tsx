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
  const { cardClick, isFlipped, found, animationOn, image, word, wordTranslate, isSecondCard, isShown } = props;
  return (
    <div
      className={
        `card-wrapper ${found && animationOn ? 'card-wrapper_hide' : ''}${found && !animationOn ? 'card-wrapper_display_none' : ''}`
        }
        >
      <div className={`card${  isFlipped ? " flipped" : ""} ${ isShown ? " shown" : ''}`}>
        {/* <div className="card__back" /> */}
        <div className="card__front" onClick={() => { !found && cardClick() }}>
          <div className={`card__image-wrapper ${isSecondCard ? '' : 'card__image-wrapper_first'}`}>
            <img src={getSrcUrl(image)} className="card__image" alt="card__image" />
          </div>
          <p className="card__description card__description_bold">{isSecondCard ? wordTranslate : word}</p>
        </div>
      </div>
    </div>
  );
}
