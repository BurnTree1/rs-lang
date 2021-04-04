  
import React from 'react'
import { Line } from 'react-chartjs-2'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Изученные слова',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: false
}

export const Chart = () => (
  <>
    <Line data={data} options={options} />
  </>
);
