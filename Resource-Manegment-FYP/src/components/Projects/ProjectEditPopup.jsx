import React, { useState, useEffect } from 'react';
import { updateProject } from '../../services/projectService'; // Adjust the import path as necessary
import Button from '../Reusable/Button';

const statusOptions = ['Pending', 'In Progress', 'Completed'];

const ProjectEditPopup = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        status: project.status || '',
        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await updateProject(project.id, formData);
      onSave(formData);
      onClose();
    } catch (err) {
      setError('Failed to update the project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Status
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="py-1 px-4"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="accent" onClick={onClose} className="py-1 px-4">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditPopup;
