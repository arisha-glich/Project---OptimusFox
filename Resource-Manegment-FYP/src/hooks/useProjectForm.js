import { useState, useEffect } from 'react';

const useProjectForm = (initialProject, onChange) => {
  const [formState, setFormState] = useState({
    name: '',
    status: '',
    deadline: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialProject) {
      setFormState({
        name: initialProject.name || '',
        status: initialProject.status || '',
        deadline: initialProject.deadline || ''
      });
    }
  }, [initialProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    onChange(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Project Name is required';
    if (!formState.status) newErrors.status = 'Status is required';
    if (!formState.deadline) newErrors.deadline = 'Deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formState,
    errors,
    handleInputChange,
    validateForm
  };
};

export default useProjectForm;
