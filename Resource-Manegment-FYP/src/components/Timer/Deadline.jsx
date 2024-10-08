import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchProjects } from "../../services/projectService";
import { ThemeContext } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DeadlineChart = () => {
  const { theme } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjects();
  }, []);

  const activeProjects = projects.filter((project) => {
    const deadline = new Date(project.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    return (
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) > 0 &&
      project.status !== "finished"
    );
  });

  const finishedProjects = projects.filter(
    (project) => project.status === "finished"
  );

  const activeChartData = {
    labels: activeProjects.map((project) => project.name),
    datasets: [
      {
        label: "Days Remaining",
        data: activeProjects.map((project) => {
          const deadline = new Date(project.deadline);
          const today = new Date();
          const diffTime = deadline - today;
          return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }),
        backgroundColor:
          theme === "dark" ? "rgba(75, 192, 192, 0.2)" : "rgba(75, 192, 192, 0.7)",
        borderColor:
          theme === "dark" ? "rgba(75, 192, 192, 1)" : "rgba(75, 192, 192, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const finishedChartData = {
    labels: finishedProjects.map((project) => project.name),
    datasets: [
      {
        label: "Success Rate",
        data: finishedProjects.map((project) => project.successRate || 0),
        backgroundColor:
          theme === "dark" ? "rgba(255, 99, 132, 0.2)" : "rgba(255, 99, 132, 0.7)",
        borderColor:
          theme === "dark" ? "rgba(255, 99, 132, 1)" : "rgba(255, 99, 132, 0.8)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const activeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} days`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Active Projects",
        },
      },
      y: {
        title: {
          display: true,
          text: "Days Remaining",
        },
        beginAtZero: true,
      },
    },
  };

  const finishedOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Finished Projects",
        },
      },
      y: {
        title: {
          display: true,
          text: "Success Rate (%)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`p-4 border rounded shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
      <div className="mb-8">
        <h4 className="text-md font-semibold mb-2">Active Projects</h4>
        <Bar data={activeChartData} options={activeOptions} />
      </div>
    </div>
  );
};

export default DeadlineChart;
