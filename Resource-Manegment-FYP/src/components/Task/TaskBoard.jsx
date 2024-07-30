import React, { useState, useEffect } from 'react';

const TaskBoard = ({
  tasks = [],
  onEdit = () => {},
  onDelete = () => {},
  employees = [],
  setTasks = () => {},
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const statuses = ['Pending', 'In Progress', 'Completed'];

  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {});

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();

    const movedTask = tasks.find(task => task.id === draggedTaskId);
    if (!movedTask) return;

    const newTasks = tasks.map(task =>
      task.id === draggedTaskId ? { ...task, status } : task
    );

    // Optimistic UI update
    setTasks(newTasks);

    try {
      // Update the task status on the server
      const response = await fetch(`http://localhost:5000/tasks/${draggedTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Re-fetch tasks to ensure UI is in sync with server
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      // Rollback on failure
      await fetchTasks();
    }

    setDraggedTaskId(null);
  };

  return (
    <div className="flex space-x-4">
      {statuses.map((status) => (
        <div
          key={status}
          className="bg-gray-100 p-4 rounded shadow-md w-80 min-h-[200px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h3 className="font-bold text-lg">{status}</h3>
          {groupedTasks[status].map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="p-2 mb-2 bg-white rounded shadow"
            >
              <h4 className="font-semibold">{task.name}</h4>
              <p>Employee: {employees.find(emp => emp.id === task.employeeId)?.name || 'N/A'}</p>
              <button
                onClick={() => onEdit(task)}
                className="mt-2 py-1 px-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="mt-2 py-1 px-2 bg-red-500 text-white rounded ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
