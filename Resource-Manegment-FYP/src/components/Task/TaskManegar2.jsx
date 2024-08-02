import React, { useState, useEffect } from 'react';
import TaskBoard from './TaskBoard';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProjectView from './ProjectView';
import { useTasks } from '../../hooks/useTasks';
import { useProjects } from '../../hooks/useProjects';
import { useEmployees } from '../../hooks/useEmployees';
import { refreshProjects } from '../../services/projectService';
import Button from '../Reusable/Button'; // Import the Button component
import { AiOutlineProject } from 'react-icons/ai'; // Import icons
import { IoMdAdd } from 'react-icons/io'; // Import icons

const TaskManager = () => {
  const { tasks, addTask, updateTaskById, deleteTaskById, setTasks } = useTasks();
  const { projects, setProjects } = useProjects();
  const { employees, setEmployees } = useEmployees();
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState('project'); // Default view

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const refreshedProjects = await refreshProjects();
        setProjects(refreshedProjects);
      } catch (error) {
        console.error('Error fetching projects on mount:', error);
      }
    };

    fetchProjectsData();
  }, [setProjects]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleSave = async (updatedTask) => {
    try {
      if (updatedTask.id) {
        await updateTaskById(updatedTask.id, updatedTask);
      } else {
        await addTask(updatedTask);
      }
      setIsEditing(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleAddTask = () => {
    setCurrentTask({ name: '', employeeId: '', projectId: '', assignedDate: '', deadlineDate: '', status: 'Pending' });
    setIsEditing(true);
  };

  return (
    <div className="overflow-scroll bg-white dark:bg-darkblue min-h-screen">
      <div className="flex justify-end space-x-2 p-4 bg-white dark:bg-darkblue border-b dark:border-gray-700">
        <Button
          onClick={handleAddTask}
          className="py-2 px-4 rounded-lg text-sm flex items-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white transition duration-300"
        >
          <IoMdAdd className="mr-2 text-xl" />
          Add Task
        </Button>
      </div>

      <div className="p-4">
        <ProjectView
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={deleteTaskById}
          employees={employees}
          projects={projects}
        />
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <TaskForm
            task={currentTask}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            employees={employees}
            projects={projects}
          />
        </div>
      )}
    </div>
  );
};

export default TaskManager;
