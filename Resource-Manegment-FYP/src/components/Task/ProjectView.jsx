import React from 'react';
import Button from '../Reusable/Button';

const ProjectView = ({ tasks, onEdit, onDelete, employees, projects }) => {
  // Group tasks by project ID
  const groupedTasksByProject = tasks.reduce((acc, task) => {
    const projectId = task.projectId || 'Unassigned'; // Default project if none provided
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex overflow-x-auto space-x-6 py-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 min-w-[300px] flex-shrink-0 transition-transform transform hover:scale-70 dark:text-gray-300"
          >
            <h3 className="font-bold text-2xl mb-4 text-[#00356B] dark:text-[#1E90FF]">{project.name}</h3>
            {groupedTasksByProject[project.id] && groupedTasksByProject[project.id].length > 0 ? (
              groupedTasksByProject[project.id].map((task) => (
                <div
                  key={task.id}
                  className="p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform transform hover:scale-105"
                >
                  <h4 className="font-semibold text-xl text-[#00356B] dark:text-[#1E90FF]">{task.name}</h4>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-medium">Employee:</span> {employees.find((emp) => emp.id === task.employeeId)?.name || 'N/A'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-medium">Status:</span> {task.status || 'Not Assigned'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-medium">Assigned Date:</span> {task.assignedDate || 'N/A'}
                  </p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      onClick={() => onEdit(task)}
                      variant="primary"
                      className="py-1 px-2 text-xs bg-blue-600 dark:bg-blue-800 text-white  hover:bg-blue-700 dark:hover:bg-blue-900 rounded-none transition-colors"
                    >
                   +
                    </Button>
                    <Button
                      onClick={() => onDelete(task.id)}
                      variant="danger"
                      className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white  rounded-none"
  title="Delete Employee" // Tooltip text
                    >
                      -
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No tasks in this project</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
