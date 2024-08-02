import React, { useState } from 'react';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import Button from '../Reusable/Button';
import '../../styles/tailwind.css';

const EmployeeForm = ({ employee, onSave, onCancel, onChange }) => {
  const {
    localEmployee,
    handleInputChange,
    handleScheduleChange,
    handleAddSchedule,
    handleRemoveSchedule,
  } = useEmployeeForm(employee, onChange);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!localEmployee.name) newErrors.name = 'Name is required';
    if (!localEmployee.role) newErrors.role = 'Role is required';
    if (!localEmployee.skills || localEmployee.skills.length === 0) newErrors.skills = 'Skills are required';
    if (!localEmployee.availability) newErrors.availability = 'Availability is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(localEmployee);
      alert('Employee details saved successfully!');
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    handleInputChange({ target: { name: 'skills', value: skills } });
  };

  return (
    <div className="relative overflow-hidden max-w-3xl mx-auto p-8 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 opacity-50 animate-slide"></div>
      <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
        <h2 className="text-3xl font-bold mb-6 text-[#00356B] dark:text-white">{employee.id ? 'Edit Employee' : 'Add New Employee'}</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={localEmployee.name}
              onChange={handleInputChange}
              className={`appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#00356B] dark:focus:border-[#00356B] ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
              id="name"
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-red-500 dark:text-red-400 text-xs italic">{errors.name}</p>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={localEmployee.role}
              onChange={handleInputChange}
              className={`appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#00356B] dark:focus:border-[#00356B] ${errors.role ? 'border-red-500 dark:border-red-500' : ''}`}
              id="role"
              placeholder="Developer"
            />
            {errors.role && <p className="text-red-500 dark:text-red-400 text-xs italic">{errors.role}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="skills">
              Skills 
            </label>
            <input
              type="text"
              name="skills"
              value={localEmployee.skills.join(', ')}
              onChange={handleSkillsChange}
              className={`appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#00356B] dark:focus:border-[#00356B] ${errors.skills ? 'border-red-500 dark:border-red-500' : ''}`}
              id="skills"
              placeholder="JavaScript, React"
            />
            {errors.skills && <p className="text-red-500 dark:text-red-400 text-xs italic">{errors.skills}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="availability">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              value={localEmployee.availability}
              onChange={handleInputChange}
              className={`appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#00356B] dark:focus:border-[#00356B] ${errors.availability ? 'border-red-500 dark:border-red-500' : ''}`}
              id="availability"
              placeholder="Full-Time, Part-Time"
            />
            {errors.availability && <p className="text-red-500 dark:text-red-400 text-xs italic">{errors.availability}</p>}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={handleSubmit} variant="primary" className="bg-[#00356B] hover:bg-[#002b59] dark:bg-[#1a202c] dark:hover:bg-[#2d3748]">Save</Button>
          <Button onClick={onCancel} variant="secondary" className="ml-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
