/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import { ICard, IGameData, IGameWinData, ISettings, IState } from './my-game.models';
import Card from './components/Card/Card';
import './game.scss';
import { formatTime, generateCards } from './my-game.helpers';
// @ts-ignore
// import flipCard from './assets/card_flip.mp3';
// // @ts-ignore
// import foundPair from './assets/cards_found.mp3';

// interface IProps extends RouteComponentProps {
//   settings: ISettings;
//   cards: ICard[];
//   firstCard: ICard | null;
//   secondCard: ICard | null;
//   paused(data: IGameData): void;
//   isResumed: boolean;
//   attempts: number;
//   time: number;
//   soundsOn: boolean;
//   autoPlay?: boolean;
// }
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

interface IProps extends RouteComponentProps {}

class MyGame extends React.Component<IProps, IState> {
  flipSound: any;

  foundSound: any;

  constructor(props: IProps) {
    super(props);
    const cards = generateCards(DEFAULT_SETTINGS)
    const settings = DEFAULT_SETTINGS;
    const time = 0;
    const attempts = 0;
    const firstCard = null;
    const secondCard = null;
    const isResumed = false;
    // let { settings, cards, attempts, time } = props;
    // const { firstCard, secondCard, isResumed } = props;
    const startTime = false;

    const { width, height } = settings;
    const size: number = width * height;
    this.state = {
      size,
      cards,
      firstCard,
      secondCard,
      isResumed,
      startTime,
      attempts,
      time,
      haveWin: false,
      fullScreen: false,
    };

    // this.flipSound = new Audio(flipCard);
    this.flipSound = new Audio('flipCard');
    this.flipSound.volume = settings.soundsVolume;
    // this.foundSound = new Audio(foundPair);
    this.foundSound = new Audio('foundPair');
    this.foundSound.volume = settings.soundsVolume;
  }

  componentDidMount() {
    const { delay } = DEFAULT_SETTINGS;
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
      startTime: false,
    });

    const data: IGameData = {
      cards: this.state.cards,
      time: this.state.time,
      attempts: this.state.attempts,
      settings: DEFAULT_SETTINGS,
    };
    // this.props.paused(data);
  };

  getScore(): number {
    const settings = DEFAULT_SETTINGS;
    const { time, attempts } = this.state;
    const points = ((settings.width * settings.height * settings.delay) ** 2) / (Math.sqrt(time * attempts));
    return Number(points.toFixed(0));
  }

  onWinHandler() {
    const data: IGameWinData = {
      time: this.state.time,
      attempts: this.state.attempts,
      score: this.getScore(),
      fieldSize: this.getFieldSizeString(),
    };
  }

  getFieldSizeString(): string {
    console.log(this);
    const settings = DEFAULT_SETTINGS;
    return `${settings.width}x${settings.height}`;
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

  saveGame() {
    const data: IGameData = {
      cards: this.state.cards,
      time: this.state.time,
      attempts: this.state.attempts,
      settings: DEFAULT_SETTINGS,
      startTime: this.state.startTime,
    };

    // this.storageService.saveGame(data);
  }

  autoPlaying() {
    const { cards } = this.state;
    const acceptedCards = cards.filter((item) => !item.found && !item.isFlipped);
    if (acceptedCards.length > 0) {
      const index = Math.floor(Math.random() * acceptedCards.length);
      const card = acceptedCards[index];
      this.changeFlipped(card.id);

      setTimeout(() => {
        this.autoPlaying();
      }, 1000);
    }
  }

  getFieldSize() {
    const { size } = this.state;

    if (size === 24) {
      return 'large';
    }
    if (size === 18) {
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
    const haveWin = this.state.cards.filter((card: ICard) => !card.found).length === 0;
    return haveWin;
  }

  changeFlipped(cardId: string) {
    // if (this.props.soundsOn) {
    //   this.flipSound.volume = this.storageService.settings.soundsVolume;
    //   this.flipSound.play();
    // }
    const cardIndex = this.state.cards.findIndex(({ id }) => id === cardId);

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
          // if (this.props.soundsOn) {
          //   this.flipSound.volume = this.storageService.settings.soundsVolume;
          //   this.foundSound.play();
          // }
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
        } else {
          this.saveGame();
        }
      })
    });
  }

  render() {
    const { cards, fullScreen } = this.state;
    // const { autoPlay } = this.props;

    return (
      <div className={`game ${fullScreen ? 'game_fullscreen' : ''}`}>
        <div className="statistics">
          <div className="statistics__inner">
            <Button
              variant="contained"
              className="pause-button"
              onClick={this.pauseHandler}>Stop</Button>
          </div>
          <div className="statistics__inner">
            <div className="score-wrapper">
              <p className="score-wrapper__caption">Attempts:</p>
              <p className="score-wrapper__score">{this.state.attempts}</p>
            </div>

            <div className="time-wrapper">
              <p className="time-wrapper__caption">Time:</p> <p className="time-wrapper__time">{formatTime(this.state.time)}</p>
            </div>
          </div>
          <div className="statistics__inner">
            <IconButton color="primary" onClick={this.fullScreenToggle} component="span">
              {fullScreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </div>
        </div>
        <div className={`game-field game-field_${this.getFieldSize()}`}>
          {/* {autoPlay && <div className="game__overlay" />} */}
          {cards.map((card: ICard) => (
            <div className="game-field__item" key={card.id}>
              <Card
                cardClick={() => this.changeFlipped(card.id)}
                isFlipped={card.isFlipped}
                imgName={card.image}
                found={card.found}
                animationOn={this.animationCheck(card)}
              />
            </div>
          ))}
        </div>
        {this.state.haveWin && <h2>You win</h2>}
      </div>
    );
  }
}

export default withRouter(MyGame);