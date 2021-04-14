import React, { FC } from "react";
import { Line } from "react-chartjs-2";

const initData = (dateMap: object) => ({
  labels: Object.keys(dateMap),
  datasets: [
    {
      label: "Изученные слова",
      data: Object.values(dateMap),
      fill: false,
      backgroundColor: "#2196F3",
      borderColor: "#2196F3"
    }
  ]
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: false
};

export const Chart: FC<{ dateMap: object }> = ({ dateMap }) => <Line data={initData(dateMap)} options={options}/>;
