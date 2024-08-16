import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onCancel, employees = [], projects = [] }) => {
  const [formState, setFormState] = useState(task || {
    name: '',
    employeeId: '',
    projectId: '',
    assignedDate: '',
    deadlineDate: '',
    status: 'Pending',
  });

  useEffect(() => {
    setFormState(task || {
      name: '',
      employeeId: '',
      projectId: '',
      assignedDate: '',
      deadlineDate: '',
      status: 'Pending',
    });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="name">
            Task Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="employeeId">
            Employee
          </label>
          <select
            id="employeeId"
            name="employeeId"
            value={formState.employeeId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="">Select Employee</option>
            {employees.length > 0 && employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="projectId">
            Project
          </label>
          <select
            id="projectId"
            name="projectId"
            value={formState.projectId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="">Select Project</option>
            {projects.length > 0 && projects.map((proj) => (
              <option key={proj.id} value={proj.id}>{proj.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="assignedDate">
            Assigned Date
          </label>
          <input
            id="assignedDate"
            name="assignedDate"
            type="date"
            value={formState.assignedDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="deadlineDate">
            Deadline Date
          </label>
          <input
            id="deadlineDate"
            name="deadlineDate"
            type="date"
            value={formState.deadlineDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
