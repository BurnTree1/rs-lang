import { cloneDeep } from 'lodash';
import { IAllGamesStatistics, IGamesStatistics, Games } from '../models/common.models';

export const getUpdatedGameStatistics = (
  gamesStatistics: IAllGamesStatistics,
  gameData: IGamesStatistics,
  gameName: Games
): IAllGamesStatistics => {
  const statisticsCopy = cloneDeep(gamesStatistics);
  const key = Object.keys(gamesStatistics)[0];
  if (statisticsCopy[key][gameName]) {
    statisticsCopy[key][gameName] = {
      learnedWords: statisticsCopy[key][gameName].learnedWords + gameData.learnedWords,
      rightAnswers: Number(Number((statisticsCopy[key][gameName].rightAnswers + gameData.rightAnswers) / 2).toFixed(2)),
      longestSeries: gameData.longestSeries > statisticsCopy[key][gameName].longestSeries
        ? gameData.longestSeries
        : statisticsCopy[key][gameName].longestSeries,
    };

    return statisticsCopy;
  }
  statisticsCopy[key][gameName] = { ...gameData };
  return statisticsCopy;
};

export const getPercents = (rightAnswers: number, wrongAnswers: number) =>
    Number(Number((rightAnswers / (rightAnswers + wrongAnswers)) * 100).toFixed(2));

export const sendStatistics = (
    args: { name: Games, service: any, rightAnswers: number, wrongAnswers: number, longestSeries: number }
) => {
  const { name, service, rightAnswers, wrongAnswers, longestSeries } = args;
  const rightAnswersPercents = getPercents(rightAnswers, wrongAnswers);
  const data: IGamesStatistics = {
    learnedWords: rightAnswers + wrongAnswers,
    rightAnswers: rightAnswersPercents ,
    longestSeries,
  };
  service.sendGameStatistics(name, data);
};