import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { fetchEmployees } from '../services/employeeService';
import { fetchProjects } from '../services/projectService';

const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    status: '',
    employeeId: '',
    projectId: '',
    scheduledTime: '',
    duration: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [view, setView] = useState('board'); // New state for view

  useEffect(() => {
    fetchTasks().then(data => setTasks(data));
    fetchEmployees().then(data => setEmployees(data));
    fetchProjects().then(data => setProjects(data));
  }, []);

  const handleAddTask = () => {
    createTask(formState).then(() => {
      setFormState({ name: '', status: '', employeeId: '', projectId: '', scheduledTime: '', duration: '' });
      fetchTasks().then(data => setTasks(data));
    });
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setFormState({
      name: task.name,
      status: task.status,
      employeeId: task.employeeId,
      projectId: task.projectId,
      scheduledTime: task.scheduledTime,
      duration: task.duration
    });
  };

  const handleUpdateTask = () => {
    updateTask(currentTask.id, formState).then(() => {
      setCurrentTask(null);
      setFormState({ name: '', status: '', employeeId: '', projectId: '', scheduledTime: '', duration: '' });
      fetchTasks().then(data => setTasks(data));
    });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => fetchTasks().then(data => setTasks(data)));
  };

  const handleChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const filteredTasks = (tasks || []).filter(task =>
    (task.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? task.status === filterStatus : true)
  );

  return {
    tasks,
    employees,
    projects,
    setTasks,
    setCurrentTask,
    handleEditTask,
    handleDeleteTask,
    filteredTasks,
    setView,
    view
  };
};

export default useTaskManager;
