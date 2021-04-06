/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
import React, { Ref } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Close, Fullscreen, FullscreenExit } from '@material-ui/icons';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { ICard, ISettings, IState } from '../../my-game.models';
import Card from '../Card/Card';
import { formatTime, generateCards, getWord } from '../../my-game.helpers';
import { Games, IGamesStatistics, IWord } from '../../../../../models/common.models';
import { VolumeControl } from '../VolumeControl/VolumeControl';
import GamePauseModal from '../../../../Modals/GamePauseModal';
import { clearWords } from '../../../../../store/reducers/memoryGameSlice';
import EndGameModal from '../../../../Modals/EndGameModal';
import { StatisticsService } from '../../../../../services/statistics.service';
import { getPercents } from '../../../../../helpers/statistics';
import './game.scss';

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

  mistakeSound: HTMLAudioElement;

  gameContainerRef: Ref<HTMLDivElement> | undefined;

  statisticsService: StatisticsService

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
      wrongAnswers: [],
      rightAnswers: [],
      longestSeries: 0,
      rightAnswersCount: 0,
    };

    this.flipSound = new Audio(`${process.env.PUBLIC_URL}/card_flip.mp3`);
    this.foundSound = new Audio(`${process.env.PUBLIC_URL}/cards_found.mp3`);
    this.mistakeSound = new Audio(`${process.env.PUBLIC_URL}/wrong_answer.mp3`);
    this.gameContainerRef = React.createRef();
    this.statisticsService = new StatisticsService();
  }

  componentDidMount() {
    let { delay } = this.props;
    if (!delay || isNaN(delay)) {
      delay = DEFAULT_SETTINGS.delay;
    }
    setTimeout(() => {
      const flippedCards: ICard[] = this.state.cards.map((card) => ({ ...card, isShown: false, isFlipped : false }));
      this.setState({
        cards: flippedCards,
        startTime: true,
      }, () => {
      });
    }, delay);
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
      if (firstCard.id === secondCard.id && firstCard.id === currentCard.id) {
        setTimeout(() => {
          this.setState({
            firstCard: null,
            secondCard: null,
          })
        }, 700);
        return true;
      }
    }
    return false;
  }

  checkWin() {
    return this.state.cards.filter((card: ICard) => !card.found).length === 0;
  }

  changeFlipped(cardKey: string) {
    const cardIndex = this.state.cards.findIndex(({ key }) => key === cardKey);
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
        let secondCard = null;
        let firstCard = null;
        let rightAnswers = [...this.state.rightAnswers];
        let wrongAnswers = [...this.state.wrongAnswers, getWord(this.props.words, changedCard)];
        let { rightAnswersCount, longestSeries } = this.state;

        if (prevState.firstCard && prevState.firstCard.image === changedCard.image) {
          if (this.state.soundToggle) {
            this.foundSound.play();
          }

          secondCard = { ...changedCard, found: true };
          firstCard = { ...prevState.firstCard, found: true };
          rightAnswers = [...this.state.rightAnswers, getWord(this.props.words, prevState.firstCard)];
          wrongAnswers = [...this.state.wrongAnswers];
          rightAnswersCount += 1;

          cardsCopy = cardsCopy.map((card) => {
            if (card.key === (prevState.firstCard as ICard).key || card.key === (changedCard as ICard).key) {
              return { ...card, found: true };
            }
            return card;
          });
  
        } else {
          longestSeries = rightAnswersCount > longestSeries ? rightAnswersCount : longestSeries;
          rightAnswersCount = 0;
          cardsCopy = cardsCopy.map((card) => {
            if (card.key === (prevState.firstCard as ICard).key || card.key === (changedCard as ICard).key) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          if (this.state.soundToggle) {
            this.mistakeSound.play();
          }
        }

        return {
          ...prevState,
          cards: cardsCopy,
          secondCard,
          firstCard,
          rightAnswers,
          wrongAnswers,
          rightAnswersCount,
          longestSeries,
        };
      }

      if (prevState.firstCard && prevState.secondCard) {
        cardsCopy = cardsCopy.map((card) => {
          if (card.key === (prevState.firstCard as ICard).key || card.key === (prevState.secondCard as ICard).key) {
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
          this.saveStatistics();
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

  saveStatistics() {
    const { rightAnswersCount, cards, wrongAnswers, longestSeries } = this.state;
    const rightAnswersPercents = getPercents(rightAnswersCount, wrongAnswers.length);
    const data: IGamesStatistics = {
      learnedWords: cards.length / 2,
      rightAnswers: rightAnswersPercents ,
      longestSeries: rightAnswersCount > longestSeries
        ? rightAnswersCount : longestSeries,
    };
    this.statisticsService.sendGameStatistics(Games.memoryGame, data);
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
            <div className="game-field__item" key={shortid()}>
              <Card
                {...{
                  ...card,
                  cardClick: () => this.changeFlipped(card.key),
                  animationOn: this.animationCheck(card)
                }}
              />
            </div>
          ))}
        </div>
        {this.state.haveWin && (
          <div className="modal-overlay">
            <EndGameModal
              wrongAnswers={this.state.wrongAnswers}
              rightAnswers={this.state.rightAnswers}
              submit={this.onStopGameHandler} />
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
