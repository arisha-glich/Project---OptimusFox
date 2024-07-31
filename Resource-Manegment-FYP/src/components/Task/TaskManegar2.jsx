import React, { useState, useEffect } from 'react';
import ProjectView from './ProjectView'; // Import ProjectView
import TaskForm from './TaskForm'; // Keep TaskForm for editing tasks
import { useTasks } from '../../hooks/useTasks'; // Custom hook for tasks
import { useProjects } from '../../hooks/useProjects'; // Custom hook for projects
import { useEmployees } from '../../hooks/useEmployees'; // Custom hook for employees
import { refreshProjects } from '../../services/projectService'; // Service for fetching projects

const TaskManager2 = () => {
  const { tasks, addTask, updateTaskById, deleteTaskById, setTasks } = useTasks();
  const { projects, setProjects } = useProjects();
  const { employees, setEmployees } = useEmployees();
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    setCurrentTask({ name: '', employeeId: '', projectId: '', assignedDate: '', schedule: '', status: 'Pending' });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Manager</h1>
        <div>
          <button
            onClick={handleAddTask}
            className="py-2 px-4 rounded-lg bg-green-600 text-white"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-full">
          {/* Only ProjectView is rendered */}
          <ProjectView
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={deleteTaskById}
            employees={employees}
            projects={projects}
          />
        </div>
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

export default TaskManager2;
