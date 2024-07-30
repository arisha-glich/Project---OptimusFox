// src/hooks/useProjectsData.js
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/projectService';

const useProjectsData = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Project Success Rate (%)',
        data: [],
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchAndCalculateData = async () => {
      try {
        const projects = await fetchProjects();
        console.log('Fetched projects:', projects);

        if (!Array.isArray(projects)) {
          throw new Error('Projects data is not an array');
        }

        const now = new Date();
        const projectNames = projects.map(project => project.name);
        const completionRates = projects.map(project => {
          const endDate = new Date(project.deadline);
          const isCompleted = project.status === 'Completed' || endDate <= now;
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

export default useProjectsData;
