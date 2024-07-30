import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TaskItem = ({ task, onEdit, onDelete, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white rounded shadow ${isDragging ? 'opacity-50' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4 className="font-semibold">{task.name}</h4>
      <p>Employee: {task.employeeName || 'N/A'}</p>
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
  );
};

const Column = ({ status, tasks, onEdit, onDelete, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-gray-100 p-4 rounded shadow-md w-80 min-h-[200px] ${isOver ? 'bg-blue-200' : ''}`}
    >
      <h3 className="font-bold text-lg">{status}</h3>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            moveTask={moveTask}
          />
        ))
      ) : (
        <p className="text-gray-500">No tasks in this column</p>
      )}
    </div>
  );
};
