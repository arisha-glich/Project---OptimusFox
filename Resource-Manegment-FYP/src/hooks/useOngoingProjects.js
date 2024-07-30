// src/hooks/useOngoingProjects.js
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/projectService';

const useOngoingProjects = () => {
  const [projectsData, setProjectsData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Project Status',
        data: [],
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchProjects();
        const projects = data.projects;

        // Get the current date
        const now = new Date();

        // Filter ongoing projects based on deadline
        const ongoingProjects = projects.filter(project => {
          // Check if the project's status is 'Ongoing' and its deadline is in the future
          const deadline = new Date(project.deadline);
          return project.status === 'Ongoing' && deadline > now;
        });

        // Prepare data for chart
        const projectNames = ongoingProjects.map(project => project.name);
        const projectStatuses = ongoingProjects.map(() => 1); // All ongoing projects are counted as 1

        setProjectsData({
          labels: projectNames,
          datasets: [
            {
              label: 'Ongoing Projects',
              data: projectStatuses,
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching and processing projects:', error);
      }
    };

    fetchAndSetData();
  }, []);

  return projectsData;
};

export default useOngoingProjects;
