import React, { useState, useEffect } from 'react';

const statusOptions = ['Pending', 'In Progress', 'Completed'];

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    name: '',
    status: '',
    deadline: ''
  });

  useEffect(() => {
    if (project) {
      setFormState({
        name: project.name || '',
        status: project.status || '',
        deadline: project.deadline || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Project Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status:</label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select status</option>
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium mb-1">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formState.deadline}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
