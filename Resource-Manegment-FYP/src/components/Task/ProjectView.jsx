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
    <div className="flex flex-wrap gap-6 p-6 bg-gray-50 min-h-screen">
      {projects.map(project => (
        <div
          key={project.id}
          className="bg-white p-6 rounded-2xl shadow-xl w-80 min-h-[300px] transition-transform transform hover:scale-94"
        >
          <h3 className="font-bold text-2xl mb-4 text-[#00356B]">{project.name}</h3>
          {groupedTasksByProject[project.id] && groupedTasksByProject[project.id].length > 0 ? (
            groupedTasksByProject[project.id].map(task => (
              <div
                key={task.id}
              className="p-4 mb-4 bg-gray-100 rounded-xl shadow-md transition-transform transform hover:scale-105"
              >
                <h4 className="font-semibold text-xl text-[#00356B]">{task.name}</h4>
                <p className="text-gray-700"><span className="font-medium">Employee:</span> {employees.find(emp => emp.id === task.employeeId)?.name || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-medium">Status:</span> {task.status || 'Not Assigned'}</p>
                <p className="text-gray-700"><span className="font-medium">Assigned Date:</span> {task.assignedDate || 'N/A'}</p>
                <p className="text-gray-700"><span className="font-medium">Schedule:</span> {task.schedule || 'N/A'}</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    onClick={() => onEdit(task)}
                    variant="primary"
                    className="py-1 px-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(task.id)}
                    variant="danger"
                    className="py-1 px-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </Button>
                </div>
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
