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
import { checkWin, formatTime, generateCards, getWord } from '../../my-game.helpers';
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
    const doc = document.documentElement as HTMLElement & {
      webkitRequestFullscreen(): Promise<void>;
      webkitCancelFullScreen(): Promise<void>;
    };
    if (doc.webkitRequestFullscreen && !this.state.fullScreen) {
      doc.webkitRequestFullscreen();
      this.setState({fullScreen: true});
    }
    // @ts-ignore 
    if (document.webkitCancelFullScreen && this.state.fullScreen) {
      // @ts-ignore
      document.webkitCancelFullScreen();
      this.setState({ fullScreen: false });
    }
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

  changeFlipped(card: ICard) {
    if (card.isFlipped) {
      return;
    }

    if (this.state.soundToggle) {
      this.flipSound.play();
    }

    const { firstCard, attempts } = this.state;

    if (!firstCard) {
      this.setState({
        firstCard: card,
        attempts: attempts + 1,
      });
      return;
    }
    let { rightAnswersCount } = this.state;
    if (firstCard?.image === card?.image) {
      if (this.state.soundToggle) {
        this.foundSound.play();
      }

      rightAnswersCount += 1;

      const cardsCopy = this.state.cards.slice().map((item: ICard) => {
        if (item.key === firstCard.key || item.key === card.key) {
          return { ...item, found: true };
        }
        return item;
      });

      const rightAnswers = [...this.state.rightAnswers, getWord(this.props.words, firstCard)];
      const win = checkWin(cardsCopy);
      if (win) {
        this.saveStatistics(rightAnswersCount);
      }
      this.setState({
        firstCard: null,
        secondCard: null,
        cards: cardsCopy,
        rightAnswers,
        haveWin: win,
        rightAnswersCount,
        attempts: attempts + 1,
      });
      return;
    }

    if (this.state.soundToggle) {
      this.mistakeSound.play();
    }

    const wrongAnswers = [...this.state.wrongAnswers, getWord(this.props.words, firstCard)];
      this.setState({
        firstCard: null,
        secondCard: null,
        wrongAnswers,
        rightAnswersCount: 0,
        attempts: attempts + 1,
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

  saveStatistics(rightAnswersCount: number) {
    const { wrongAnswers, longestSeries } = this.state;
    const rightAnswersPercents = getPercents(rightAnswersCount, wrongAnswers.length);
    const data: IGamesStatistics = {
      learnedWords: this.props.words.length,
      rightAnswers: rightAnswersPercents ,
      longestSeries: rightAnswersCount > longestSeries
        ? rightAnswersCount : longestSeries,
    };
    this.statisticsService.sendGameStatistics(Games.memoryGame, data);
  }

  render() {
    const { cards, fullScreen, firstCard } = this.state;
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
              {/* <p className="time-wrapper__caption">Time:</p> <p className="time-wrapper__time">{formatTime(this.state.time)}</p> */}
            </div>
            <div />
          </div>
          <div className="statistics__inner statistics__inner_controls">
            <IconButton color="primary" onClick={this.fullScreenToggle} component="span">
              <Fullscreen />
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
                  cardClick: () => this.changeFlipped(card),
                  isFlipped: firstCard?.key === card.key,
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
            <GamePauseModal
              setGameIsPaused={this.pauseHandler}
              setGameIsDone={this.onStopGameHandler}
              onCloseGame={this.onStopGameHandler} />
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
