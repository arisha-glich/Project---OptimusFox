import React, { useState, useEffect } from 'react';
import TaskForm from '../Task/TaskForm';
import axios from 'axios';

const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch tasks, employees, and projects from the API
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      const today = new Date().toISOString().split('T')[0];
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();

      // Filter tasks to only include those assigned today
      const todayTasks = response.data.filter(task => {
        const taskDate = new Date(task.assignedDate);
        return taskDate.toISOString().split('T')[0] === today;
      });

      // Further filter tasks to include only those within the last 12 hours
      const recentTasks = todayTasks.filter(task => new Date(task.assignedDate) >= new Date(twelveHoursAgo));

      // Log tasks to verify structure
      console.log('Tasks:', recentTasks);

      setTasks(recentTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');

      // Log employees to verify structure
      console.log('Employees:', response.data);

      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects');

      // Log projects to verify structure
      console.log('Projects:', response.data);

      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Add or update a task
  const handleSave = async (task) => {
    try {
      if (editingTask) {
        // Update the task
        await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, task);
        setTasks(tasks.map(t => (t.id === editingTask.id ? task : t)));
      } else {
        // Add new task
        const response = await axios.post('http://localhost:5000/tasks', task);
        setTasks([...tasks, response.data]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Today's Tasks
      </h2> 
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h4 className="text-sm font-bold mb-4 text-gray-800 dark:text-gray-200">
          This section is dedicated to managing and displaying tasks for the current day.
        </h4>
        <div className="mb-4">
          {tasks.length > 0 ? (
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{task.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Deadline: {task.deadlineDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No tasks for today</p>
          )}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="py-1 px-2 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition-colors duration-300"
        >
          + Add Task
        </button>
      </div>
      {showForm && (
        <TaskForm
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
          initialTask={editingTask}
          employees={employees} // Pass employees to TaskForm
          projects={projects}   // Pass projects to TaskForm
        />
      )}
    </div>
  );
};

export default TodayTasks;
