import item1 from '../../../../assets/image/game-item1.svg'
import item2 from '../../../../assets/image/game-item2.svg'
import item3 from '../../../../assets/image/game-item3.svg'
import item4 from '../../../../assets/image/game-item4.svg'
import { Games, IGamesStatistics } from "../../../../models/common.models";
import { IGameStatistic } from "./dayStatistic.model";

const gameStatisticsListTemplate: IGameStatistic[] = [
    {
      gameName: Games.savannah,
      title: 'Саванна',
      logo: item1,
      learnedWords: 0,
      rightAttempts: 0,
      longestLine: 0,
    },
    {
      gameName: Games.sprint,
      title: 'Спринт',
      logo: item2,
      learnedWords: 0,
      rightAttempts: 0,
      longestLine: 0,
    },
    {
      gameName: Games.audio,
      title: 'Аудиовызов',
      logo: item3,
      learnedWords: 0,
      rightAttempts: 0,
      longestLine: 0,
    },
    {
      gameName: Games.memoryGame,
      title: 'Memory Game',
      logo: item4,
      learnedWords: 0,
      rightAttempts: 0,
      longestLine: 0,
    },
  ];

export const getGameStatistics = (statistics: { [k: string]: IGamesStatistics; }) => gameStatisticsListTemplate
    .map((item: IGameStatistic) => {
        if (statistics[item.gameName]) {
            return {
                ...item,
                learnedWords: statistics[item.gameName].learnedWords,
                rightAttempts: statistics[item.gameName].rightAnswers,
                longestLine: statistics[item.gameName].longestSeries,
            }
        }
        return item;
    });
