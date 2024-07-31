// src/components/TaskList.js
import React from 'react';
import { useSearch } from '../../context/SearchContext';

const TaskList = ({ tasks, employees, projects, onEdit, onDelete }) => {
  const { searchQuery } = useSearch();

  // Create lookup maps for employees and projects
  const employeeMap = employees.reduce((map, emp) => {
    map[emp.id] = emp.name;
    return map;
  }, {});

  const projectMap = projects.reduce((map, proj) => {
    map[proj.id] = proj.name;
    return map;
  }, {});

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const tasksPerPage = 5; // Number of tasks per page
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  // Slice tasks for current page
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  // Handler for page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-50 min-h-screen">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-gray-700">Task Name</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Status</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Employee</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Project</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-6 border-b text-center text-gray-600">No tasks available.</td>
            </tr>
          ) : (
            currentTasks.map(task => (
              <tr
                key={task.id}
                className="transition-transform transform hover:scale-105 hover:bg-gray-100"
              >
                <td className="py-3 px-4 border-b text-gray-800">{task.name}</td>
                <td className="py-3 px-4 border-b text-gray-800">{task.status}</td>
                <td className="py-3 px-4 border-b text-gray-800">{employeeMap[task.employeeId] || 'N/A'}</td>
                <td className="py-3 px-4 border-b text-gray-800">{projectMap[task.projectId] || 'N/A'}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="py-1 px-3 bg-yellow-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      aria-label={`Edit task ${task.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="py-1 px-3 bg-green-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      aria-label={`Delete task ${task.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="flex space-x-2">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-green-700 text-gray-200 hover:bg-green-600 disabled:opacity-50"
              >
                &lt;
              </button>
            </li>
            {[...Array(totalPages).keys()].map(page => (
              <li key={page + 1}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 rounded ${
                    page + 1 === currentPage
                      ? 'bg-green-700 text-white  hover:bg-gray-600'
                      : 'bg-green-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50"
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TaskList;
