import { userStatistics } from "../api/statistics";
import { getUpdatedGameStatistics } from "../helpers/statistics";
import { Games, IAllGamesStatistics, IGamesStatistics, IStatistics } from "../models/common.models";

export class StatisticsService {
    private service = userStatistics;

    async sendGameStatistics(name: Games, gameStatistics: IGamesStatistics) {
        let statistics: IStatistics;
        try {
            statistics = (await this.service.get()).data;
        } catch (e) {
            statistics = {
                learnedWords: 0,
                optional: {}
            };
        }
        const key: string = new Date().toDateString();
        let updatedGameStatistics: IAllGamesStatistics = {};

        if (statistics.optional.games && statistics.optional.games[key]) {
            updatedGameStatistics = getUpdatedGameStatistics(statistics.optional.games, gameStatistics, name);
        } else {
            updatedGameStatistics = {
                [key]: {
                    [name]: gameStatistics,
                }
            }
        }

        const newStatistics: IStatistics = {
            learnedWords: statistics.learnedWords,
            optional: {
                games: updatedGameStatistics,
            }
        }
        this.service.put(newStatistics);
    }

    async getGameStatistics() {
        try {
            const statistics: IStatistics = (await this.service.get()).data;
            const key: string = new Date().toDateString();

            if (statistics.optional.games && statistics.optional.games[key]) {
                return statistics.optional.games[key];
            }
        } catch (e) {
            return {};
        }
        return {};
    }
}
