import React from "react";
import { StatisticsService } from "../services/statistics.service";

const statisticsService = new StatisticsService();
export const serviceContext = React.createContext<{ service: StatisticsService }>({ service: statisticsService });
