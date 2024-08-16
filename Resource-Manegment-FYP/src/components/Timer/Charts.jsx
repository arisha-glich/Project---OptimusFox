import React, { useEffect, useState, useContext } from 'react';
import TimerComponent from './Timer';  // Component to display individual task timers
import DeadlineChart from './Deadline';  // Component to display a chart related to deadlines
import { fetchTasks } from '../../services/taskService';  // Service function to fetch tasks
import ProjectCompletionChart from './ProjectCompletionChart';
import { ThemeContext } from '../../context/ThemeContext';  // Import ThemeContext

const App = () => {
  const [tasks, setTasks] = useState([]);  // State to store fetched tasks
  const { theme } = useContext(ThemeContext);  // Get the current theme from the context

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();  // Fetch tasks from API
        setTasks(data);  // Update state with fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);  // Handle fetch errors
      }
    };
    getTasks();  // Call the function to fetch tasks
  }, []);  // Empty dependency array means this runs once when the component mounts

  return (
    <div className={`p-8 space-y-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Project Management</h1> 
      <DeadlineChart isDarkMode={theme === 'dark'} /> 
      <div className="space-y-4">  
        <ProjectCompletionChart isDarkMode={theme === 'dark'} />
      </div>
    </div>
  );
};

export default App;
