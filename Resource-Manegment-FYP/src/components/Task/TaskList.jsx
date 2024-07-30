import React from 'react';

const TaskList = ({ tasks, employees, projects, onEdit, onDelete }) => {
  // Create lookup maps for employees and projects
  const employeeMap = employees.reduce((map, emp) => {
    map[emp.id] = emp.name;
    return map;
  }, {});

  const projectMap = projects.reduce((map, proj) => {
    map[proj.id] = proj.name;
    return map;
  }, {});

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Task Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Employee</th>
            <th className="py-2 px-4 border-b">Project</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 border-b text-center text-gray-600">No tasks available.</td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.id}>
                <td className="py-2 px-4 border-b">{task.name}</td>
                <td className="py-2 px-4 border-b">{task.status}</td>
                <td className="py-2 px-4 border-b">{employeeMap[task.employeeId] || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{projectMap[task.projectId] || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onEdit(task)}
                    className="py-1 px-2 bg-blue-500 text-white rounded"
                    aria-label={`Edit task ${task.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="py-1 px-2 bg-red-500 text-white rounded ml-2"
                    aria-label={`Delete task ${task.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
