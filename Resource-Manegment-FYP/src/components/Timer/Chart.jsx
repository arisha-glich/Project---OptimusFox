// src/components/Chart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => (
  <Bar
    data={data}
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Completion Rate: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Projects'
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          title: {
            display: true,
            text: 'Completion Rate (%)'
          }
        }
      }
    }}
  />
);

export default Chart;
