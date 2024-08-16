import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchProjects } from '../../services/projectService'; // Adjust the import based on your file structure

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectCompletionChart = ({ isDarkMode }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Project Success Rate (%)',
        data: [],
        backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchAndCalculateData = async () => {
      try {
        const projects = await fetchProjects();
        const now = new Date();
        const projectNames = projects.map(project => project.name);
        const completionRates = projects.map(project => {
          const endDate = new Date(project.deadline);
          const isCompleted = endDate <= now;
          return isCompleted ? 100 : 0;
        });

        setChartData({
          labels: projectNames,
          datasets: [
            {
              label: 'Project Success Rate (%)',
              data: completionRates,
              backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
              borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching and calculating data:', error);
      }
    };

    fetchAndCalculateData();
  }, [isDarkMode]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Project Completion Chart
      </h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: isDarkMode ? 'white' : 'black',
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Completion Rate: ${context.raw}%`;
                },
              },
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
              titleColor: isDarkMode ? 'black' : 'white',
              bodyColor: isDarkMode ? 'black' : 'white',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Projects',
                color: isDarkMode ? 'white' : 'black',
              },
              ticks: {
                color: isDarkMode ? 'white' : 'black',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Completion Rate (%)',
                color: isDarkMode ? 'white' : 'black',
              },
              ticks: {
                color: isDarkMode ? 'white' : 'black',
              },
              beginAtZero: true,
              suggestedMax: 100,
            },
          },
        }}
      />
    </div>
  );
};

export default ProjectCompletionChart;
