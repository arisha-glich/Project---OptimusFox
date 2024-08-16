import React, { useState, useEffect, useCallback } from 'react';
import Button from '../Reusable/Button'; // Adjust the import path as needed

const TaskBoard = ({
  tasks = [],
  onEdit = () => {},
  onDelete = () => {},
  employees = [],
  setTasks = () => {},
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const statuses = ['Pending', 'In Progress', 'Completed'];

  // Group tasks by their status
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {});

  useEffect(() => {
    // Fetch tasks initially
    fetchTasks(page);
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  // Function to fetch tasks from the API
  const fetchTasks = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks?page=${page}&limit=6`); // Adjust limit as needed
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setTasks(prevTasks => [...prevTasks, ...data]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle the drag start event
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    console.log(taskId)
  };

  // Allow dropping by preventing default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle dropping of tasks
  const handleDrop = async (e, status) => {
    e.preventDefault();
    fetchTasks()
    console.log('fetch again')
    if (draggedTaskId === null) return;

    const movedTask = tasks.find(task => task.id === draggedTaskId);
    if (!movedTask) return;

    const updatedTask = { ...movedTask, status };

    try {
      // Update the task status on the server
      const response = await fetch(`http://localhost:5000/tasks/${draggedTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update task status');

      // Refetch tasks to ensure UI consistency
      fetchTasks(page);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Optionally: Refetch tasks if you want to rollback to the previous state
      fetchTasks(page);
    }

    setDraggedTaskId(null);
  };

  // Calculate the number of days left until the deadline
  const calculateDaysLeft = (deadlineDate) => {
    if (!deadlineDate) return 'N/A';
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 ? `${daysLeft} day(s)` : 'Overdue';
  };

  // Handle scroll event to load more tasks when scrolling to the bottom
  const handleScroll = useCallback(() => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (bottom && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  return (
    <div className="flex space-x-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {statuses.map((status) => (
        <div
          key={status}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 min-h-[300px] transition-transform hover:scale-40"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h3 className="font-bold text-2xl mb-4 text-[#00356B] dark:text-[#1E90FF]">{status}</h3>
          {groupedTasks[status].map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              <h4 className="font-semibold text-xl text-[#00356B] dark:text-[#1E90FF]">{task.name}</h4>
              <p className="text-gray-700 dark:text-gray-400">
                <span className="font-medium">Employee:</span> {employees.find(emp => emp.id === task.employeeId)?.name || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                <span className="font-medium">Status:</span> {task.status || 'Not Assigned'}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                <span className="font-medium">Days Left:</span> {calculateDaysLeft(task.deadlineDate)}
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  onClick={() => onEdit(task)}
                  variant="primary"
                  className="py-1 px-2 text-xs bg-blue-600 dark:bg-blue-800 text-white rounded-none hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                  title="Edit Task">
                  +
                </Button>
                <Button
                  onClick={() => onDelete(task.id)}
                  variant="danger"
                  className="py-1 px-2 text-xs bg-red-600 dark:bg-red-800 text-white rounded-none hover:bg-red-700 dark:hover:bg-red-900 transition-colors"
                   title="Delete Task"
                >
                  -
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
