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
                rightAnswers: Math.ceil((statisticsCopy[key][gameName].rightAnswers + gameData.rightAnswers) / 2),
                longestSeries: statisticsCopy[key][gameName].longestSeries + gameData.longestSeries,
            };

            return statisticsCopy;
        }
        statisticsCopy[key][gameName] = { ...gameData };
        return statisticsCopy;
    }