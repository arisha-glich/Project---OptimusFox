// src/hooks/useProjectCompletionData.js
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/projectService';

const useProjectCompletionData = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Project Success Rate (%)',
        data: [],
        backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green with transparency
        borderColor: 'rgba(0, 255, 0, 1)', // Solid green border
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchAndCalculateData = async () => {
      try {
        const data = await fetchProjects();
        const projects = data.projects;

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
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching and calculating data:', error);
      }
    };

    fetchAndCalculateData();
  }, []);

  return chartData;
};

export default useProjectCompletionData;
