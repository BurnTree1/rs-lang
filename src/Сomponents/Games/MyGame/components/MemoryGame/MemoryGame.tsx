/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
import React, { Ref } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Close, Fullscreen, FullscreenExit } from '@material-ui/icons';
import { connect } from 'react-redux';
import { ICard, ISettings, IState } from '../../my-game.models';
import Card from '../Card/Card';
import { formatTime, generateCards } from '../../my-game.helpers';
import { IWord } from '../../../../../models/common.models';
import { VolumeControl } from '../VolumeControl/VolumeControl';
import GamePauseModal from '../../../../Modals/GamePauseModal';
import { WinModal } from '../WinModal/WinModal';
import { clearWords } from '../../../../../store/reducers/memoryGameSlice';
import './game.scss';
import { URL_API } from '../../../../../helpers/constants';

const DEFAULT_SETTINGS: ISettings = {
  width: 6,
  height: 4,
  delay: 5,
  theme: 'light',
  soundOn: true,
  musicOn: true,
  soundsVolume: 0.2,
  musicVolume: 0.2,
};

interface IProps extends RouteComponentProps {
  words: IWord[];
  clearWords?(): void;
  delay?: number;
}

class MemoryGame extends React.Component<IProps, IState> {
  flipSound: HTMLAudioElement;

  foundSound: HTMLAudioElement;

  gameContainerRef: Ref<HTMLDivElement> | undefined;

  constructor(props: IProps) {
    super(props);
    const { words } = props;
    this.state = {
      size: words.length * 2,
      cards: generateCards(words, DEFAULT_SETTINGS),
      firstCard: null,
      secondCard: null,
      isResumed: false,
      startTime: false,
      attempts: 0,
      time: 0,
      haveWin: false,
      fullScreen: false,
      soundToggle: true,
      isPaused: false,
    };

    this.flipSound = new Audio(`${URL_API}/card_flip.mp3`);
    this.foundSound = new Audio(`${URL_API}/cards_found.mp3`);
    this.gameContainerRef = React.createRef();
  }

  componentDidMount() {
    let { delay } = this.props;
    if (!delay || isNaN(delay)) {
      delay = DEFAULT_SETTINGS.delay;
    }
    setTimeout(() => {
      const flippedCards: ICard[] = this.state.cards.map((card) => ({ ...card, isFlipped: false }));
      this.setState({
        cards: flippedCards,
        startTime: true,
      }, () => {
      });
    }, delay * 1000);
    this.tick();
  }

  pauseHandler = () => {
    this.setState({
      startTime: !this.state.startTime,
      isPaused: !this.state.isPaused,
    });
  };

  getScore(): number {
    const settings = DEFAULT_SETTINGS;
    const { time, attempts } = this.state;
    const points = ((settings.width * settings.height * settings.delay) ** 2) / (Math.sqrt(time * attempts));
    return Number(points.toFixed(0));
  }

  tick() {
    setTimeout(() => {
      if (this.state.startTime && !this.state.haveWin) {
        this.setState({
          time: this.state.time + 1,
        });
      }
      this.tick();
    }, 1000);
  }

  getFieldSize() {
    const { size } = this.state;

    if (size >= 24) {
      return 'large';
    }
    if (size >= 16) {
      return 'medium';
    }

    return 'small';
  }

  fullScreenToggle = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  }

  animationCheck = (currentCard: ICard): boolean => {
    const { firstCard, secondCard } = this.state;
    if (firstCard && secondCard) {
      if (firstCard.image === secondCard.image && firstCard.image === currentCard.image) {
        return true;
      }
    }
    return false;
  }

  checkWin() {
    return this.state.cards.filter((card: ICard) => !card.found).length === 0;
  }

  changeFlipped(cardId: string) {
    const cardIndex = this.state.cards.findIndex(({ id }) => id === cardId);
    if (this.state.cards[cardIndex].isFlipped) {
      return;
    }

    if (this.state.soundToggle) {
      this.flipSound.play();
    }

    const changedCard: ICard = { ...this.state.cards[cardIndex], isFlipped: !this.state.cards[cardIndex].isFlipped };
    let cardsCopy = this.state.cards.slice();
    cardsCopy.splice(cardIndex, 1, changedCard);

    this.setState((prevState: any) => {
      const newState = {
        ...prevState,
        cards: cardsCopy,
      };
      if (!prevState.firstCard && changedCard.isFlipped) {
        return { ...newState, firstCard: changedCard };
      }
      if (!prevState.secondCard && changedCard.isFlipped) {
        let successGuess: boolean = false;
        if (prevState.firstCard && prevState.firstCard.image === changedCard.image) {
          if (this.state.soundToggle) {
            this.foundSound.play();
          }
          successGuess = true;
        }
        cardsCopy = cardsCopy.map((card) => {
          if (card.id === (prevState.firstCard as ICard).id || card.id === (changedCard as ICard).id) {
            return { ...card, found: successGuess };
          }
          return card;
        });
        return {
          ...prevState,
          cards: cardsCopy,
          secondCard: { ...changedCard, found: successGuess },
          firstCard: { ...prevState.firstCard, found: successGuess },
        };
      }

      if (prevState.firstCard && prevState.secondCard) {
        cardsCopy = cardsCopy.map((card) => {
          if (card.id === (prevState.firstCard as ICard).id || card.id === (prevState.secondCard as ICard).id) {
            return { ...card, isFlipped: false };
          }
          return card;
        });
        return {
          ...prevState,
          cards: cardsCopy,
          firstCard: changedCard,
          secondCard: null,
        };
      }

      return {
        ...prevState,
      }
    }, () => {
      this.setState({
        attempts: this.state.attempts + 1,
      }, () => {
        const win = this.checkWin();
        if (win) {
          this.setState({
            haveWin: win,
          });
        }
      })
    });
  }

  onSoundToggle = () => {
    this.setState({
      soundToggle: !this.state.soundToggle
    });
  }

  onStopGameHandler = () => {
    if (this.props.clearWords) {
      this.props.clearWords();
    }
    this.props.history.push('/my-game');
  }

  render() {
    const { cards, fullScreen } = this.state;

    return (
      <div className={`game ${fullScreen ? 'game_fullscreen' : ''}`} ref={this.gameContainerRef}>
        <div className="statistics">
          <div className="volume-wrapper">
            <VolumeControl volumeIsOn={this.state.soundToggle} handler={this.onSoundToggle} />
          </div>
          <div className="statistics__inner">
            <div className="score-wrapper">
              <p className="score-wrapper__caption">Attempts:</p>
              <p className="score-wrapper__score">{this.state.attempts}</p>
            </div>

            <div className="time-wrapper">
              <p className="time-wrapper__caption">Time:</p> <p className="time-wrapper__time">{formatTime(this.state.time)}</p>
            </div>
            <div />
          </div>
          <div className="statistics__inner statistics__inner_controls">
            <IconButton color="primary" onClick={this.fullScreenToggle} component="span">
              {fullScreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <IconButton color="primary" onClick={this.pauseHandler} component="span">
              <Close />
            </IconButton>
          </div>
        </div>
        <div className={`game-field game-field_${this.getFieldSize()}`}>
          {cards.map((card: ICard) => (
            <div className="game-field__item" key={card.id}>
              <Card
                {...{
                  ...card,
                  cardClick: () => this.changeFlipped(card.id),
                  animationOn: this.animationCheck(card)
                }}
              />
            </div>
          ))}
        </div>
        {this.state.haveWin && (
          <div className="modal-overlay">
            <WinModal cardsCount={this.state.size} attempts={this.state.attempts} submit={this.onStopGameHandler} />
          </div>
        )}
        {this.state.isPaused
          && (
          <div className="modal-overlay">
            <GamePauseModal setGameIsPaused={this.pauseHandler} setGameIsDone={this.onStopGameHandler} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (_state: any, props: IProps) => ({
  ...props
});

const mapDispatchToProps = { clearWords };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MemoryGame));
