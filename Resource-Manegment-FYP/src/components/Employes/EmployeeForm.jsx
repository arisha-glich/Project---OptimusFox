import React, { useState } from 'react';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import ScheduleInput from './Schedule';
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
    <div className="relative overflow-hidden max-w-3xl mx-auto p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 opacity-50 animate-slide"></div>
      <div className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-lg z-10">
        <h2 className="text-3xl font-bold mb-6">{employee.id ? 'Edit Employee' : 'Add New Employee'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={localEmployee.name}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role:</label>
            <input
              type="text"
              name="role"
              value={localEmployee.role}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.role ? 'border-red-500' : ''}`}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated):</label>
          <input
            type="text"
            name="skills"
            value={localEmployee.skills.join(', ')}
            onChange={handleSkillsChange}
            className={`input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.skills ? 'border-red-500' : ''}`}
          />
          {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability:</label>
          <input
            type="text"
            name="availability"
            value={localEmployee.availability}
            onChange={handleInputChange}
            className={`input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.availability ? 'border-red-500' : ''}`}
          />
          {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule:</label>
          {localEmployee.schedule.map((item, index) => (
            <ScheduleInput
              key={index}
              index={index}
              day={item.day}
              hours={item.hours}
              onChange={(e, field) => handleScheduleChange(e, index, field)}
              onRemove={() => handleRemoveSchedule(index)}
            />
          ))}
          <button type="button" onClick={handleAddSchedule} className="mt-2 text-blue-600 hover:text-blue-800">Add Schedule</button>
        </div>
        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-4">Cancel</Button>
          <Button onClick={handleSubmit}>{employee.id ? 'Update' : 'Add'}</Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
