import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      setError('Error fetching tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (task) => {
    try {
      await createTask(task);
      await loadTasks(); // Re-fetch tasks to get the latest data
    } catch (error) {
      setError('Error adding task');
      console.error('Error adding task:', error);
    }
  };

  const updateTaskById = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      await loadTasks(); // Re-fetch tasks to get the latest data
    } catch (error) {
      setError('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks(); // Re-fetch tasks to get the latest data
    } catch (error) {
      setError('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };

  return { tasks, addTask, updateTaskById, deleteTaskById, loading, error };
};
