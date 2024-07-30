import React from 'react';

const ProjectView = ({ tasks, onEdit, onDelete, employees, projects }) => {
  // Group tasks by project ID
  const groupedTasksByProject = tasks.reduce((acc, task) => {
    const projectId = task.projectId || 'Unassigned'; // Default project if none provided
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap space-x-4">
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-gray-100 p-4 rounded shadow-md w-80 min-h-[200px] mb-4"
        >
          <h3 className="font-bold text-lg">{project.name}</h3>
          {groupedTasksByProject[project.id] && groupedTasksByProject[project.id].length > 0 ? (
            groupedTasksByProject[project.id].map(task => (
              <div
                key={task.id}
                className="p-2 mb-2 bg-white rounded shadow"
              >
                <h4 className="font-semibold">{task.name}</h4>
                <p>Employee: {employees.find(emp => emp.id === task.employeeId)?.name || 'N/A'}</p>
                <p>Status: {task.status || 'Not Assigned'}</p>
                <p>Assigned Date: {task.assignedDate || 'N/A'}</p>
                <p>Schedule: {task.schedule || 'N/A'}</p>
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
            ))
          ) : (
            <p className="text-gray-500">No tasks in this project</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectView;
