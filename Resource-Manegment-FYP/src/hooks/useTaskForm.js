import { useState, useEffect } from 'react';

const useTaskForm = (initialTask = {}, onChange) => {
  const [localTask, setLocalTask] = useState({
    name: '',
    status: '',
    employeeId: '',
    projectId: '',
    scheduledTime: '',
    duration: '',
    ...initialTask
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLocalTask(prev => ({
      ...prev,
      ...initialTask
    }));
  }, [initialTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalTask(prev => ({ ...prev, [name]: value || '' }));
    onChange(name, value || '');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localTask.name) newErrors.name = 'Task Name is required';
    if (!localTask.status) newErrors.status = 'Status is required';
    if (!localTask.employeeId) newErrors.employeeId = 'Employee is required';
    if (!localTask.projectId) newErrors.projectId = 'Project is required';
    if (!localTask.scheduledTime) newErrors.scheduledTime = 'Scheduled Time is required';
    if (!localTask.duration) newErrors.duration = 'Duration is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    localTask,
    errors,
    handleInputChange,
    validateForm,
  };
};

export default useTaskForm;
