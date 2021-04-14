import { Games } from "../../../../models/common.models";

export interface IGameStatistic {
  gameName: Games;
  title: string;
  logo: string;
  learnedWords: number;
  rightAttempts: number;
  longestLine: number;
}