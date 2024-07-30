import React, { useEffect, useState } from 'react';
import TimerComponent from './Timer';  // Component to display individual task timers
import DeadlineChart from './Deadline';  // Component to display a chart related to deadlines
import { fetchTasks } from '../../services/taskService';  // Service function to fetch tasks
import ProjectCompletionChart from './ProjectCompletionChart';

const App = () => {
  const [tasks, setTasks] = useState([]);  // State to store fetched tasks

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
    <div className="p-8 space-y-6">  
      <h1 className="text-3xl font-bold mb-4">Project Management</h1> 
      <DeadlineChart /> 
      <div className="space-y-4">  
        <ProjectCompletionChart/>
      </div>
    </div>
  );
};

export default App;
