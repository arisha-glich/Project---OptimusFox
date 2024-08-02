import React, { useState, useEffect } from 'react';
import TaskBoard from './TaskBoard';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProjectView from './ProjectView';
import { useTasks } from '../../hooks/useTasks';
import { useProjects } from '../../hooks/useProjects';
import { useEmployees } from '../../hooks/useEmployees';
import { refreshProjects } from '../../services/projectService';
import Button from '../Reusable/Button';
import { AiOutlineAppstore, AiOutlineUnorderedList, AiOutlineProject } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

const TaskManager = () => {
  const { tasks, addTask, updateTaskById, deleteTaskById, setTasks } = useTasks();
  const { projects } = useProjects();
  const { employees } = useEmployees();
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState('board'); // 'board', 'list', or 'project'

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const refreshedProjects = await refreshProjects();
        // Assuming you have a method to set projects here
        // you might need to adjust the hook or use another method to set projects
      } catch (error) {
        console.error('Error fetching projects on mount:', error);
      }
    };

    fetchProjectsData();
  }, []);

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
    <div className="overflow-scroll bg-white dark:bg-darkblue">
      <div className="flex justify-end space-x-2 p-4">
        <Button
          onClick={() => setView('board')}
          className={`py-2 px-4 rounded-lg text-sm flex items-center ${
            view === 'board' ? 'bg-purple-700 text-white' : 'bg-purple-500 text-gray-900'
          } dark:${view === 'board' ? 'bg-purple-800 text-white' : 'bg-purple-600 text-gray-100'}`}
        >
          <AiOutlineAppstore className="mr-2 text-xl" />
          Task Board
        </Button>
        <Button
          onClick={() => setView('list')}
          className={`py-2 px-4 rounded-lg text-sm flex items-center ${
            view === 'list' ? 'bg-teal-700 text-white' : 'bg-teal-500 text-gray-900'
          } dark:${view === 'list' ? 'bg-teal-800 text-white' : 'bg-teal-600 text-gray-100'}`}
        >
          <AiOutlineUnorderedList className="mr-2 text-xl" />
          Task List
        </Button>
        <Button
          onClick={() => setView('project')}
          className={`py-2 px-4 rounded-lg text-sm flex items-center ${
            view === 'project' ? 'bg-orange-700 text-white' : 'bg-orange-500 text-gray-900'
          } dark:${view === 'project' ? 'bg-orange-800 text-white' : 'bg-orange-600 text-gray-100'}`}
        >
          <AiOutlineProject className="mr-2 text-xl" />
          Projects
        </Button>
        <Button
          onClick={handleAddTask}
          className="py-2 px-4 rounded-lg text-sm flex items-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white transition duration-300"
        >
          <IoMdAdd className="mr-2 text-xl" />
          Add Task
        </Button>
      </div>

      <div className="p-0 m-0">
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
