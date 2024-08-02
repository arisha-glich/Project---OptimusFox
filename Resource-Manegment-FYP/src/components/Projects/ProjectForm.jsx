import React, { useState, useEffect } from 'react';

const statusOptions = ['Pending', 'In Progress', 'Completed'];

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    name: '',
    status: '',
    deadline: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormState({
        name: project.name || '',
        status: project.status || '',
        deadline: project.deadline || ''
      });
    } else {
      setFormState({
        name: '',
        status: '',
        deadline: ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Project name is required.';
    if (!formState.status) newErrors.status = 'Status is required.';
    if (!formState.deadline) newErrors.deadline = 'Deadline is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Status:</label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          >
            <option value="">Select status</option>
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>
        <div>
          <label htmlFor="deadline" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formState.deadline}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          {project ? 'Update Project' : 'Add Project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-sky-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-sky-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
