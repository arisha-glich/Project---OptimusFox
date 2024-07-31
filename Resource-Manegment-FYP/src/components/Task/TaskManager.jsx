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

const TaskManager = () => {
  const { tasks, addTask, updateTaskById, deleteTaskById, setTasks } = useTasks();
  const { projects, setProjects } = useProjects();
  const { employees, setEmployees } = useEmployees();
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState('board'); // 'board', 'list', or 'project'

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
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <div>
          <Button
            onClick={() => setView('board')}
            className={`py-1 px-2 mr-2 rounded-lg text-sm ${view === 'board' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Task Board
          </Button>
          <Button
            onClick={() => setView('list')}
            className={`py-1 px-2 mr-2 rounded-lg text-sm ${view === 'list' ? 'bg-yellow-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Task List
          </Button>
          <Button
            onClick={() => setView('project')}
            className={`py-1 px-2 mr-2 rounded-lg text-sm ${view === 'project' ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Projects
          </Button>
          <Button
            onClick={handleAddTask}
            className="py-1 px-2 rounded-lg text-sm bg-green-600 text-white"
          >
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-full">
          {view === 'board' && (
            <TaskBoard
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={deleteTaskById}
              employees={employees}
              setTasks={setTasks}
            />
          )}
          {view === 'list' && (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={deleteTaskById}
              employees={employees}
              projects={projects}
            />
          )}
          {view === 'project' && (
            <ProjectView
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={deleteTaskById}
              employees={employees}
              projects={projects}
            />
          )}
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

export default TaskManager;
