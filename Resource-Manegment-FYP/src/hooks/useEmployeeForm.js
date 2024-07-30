import { useState, useEffect } from 'react';

const useEmployeeForm = (initialEmployee, onChange) => {
  const [localEmployee, setLocalEmployee] = useState(initialEmployee);

  useEffect(() => {
    setLocalEmployee(initialEmployee);
  }, [initialEmployee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalEmployee(prev => ({ ...prev, [name]: value || '' })); 
    onChange(name, value || '');
  };

  const handleScheduleChange = (e, index, field) => {
    const { value } = e.target;
    const newSchedule = [...localEmployee.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value || '' };
    setLocalEmployee(prev => ({ ...prev, schedule: newSchedule }));
    onChange('schedule', newSchedule);
  };

  const handleAddSchedule = () => {
    const newSchedule = [...localEmployee.schedule, { day: '', hours: '' }];
    setLocalEmployee(prev => ({ ...prev, schedule: newSchedule }));
    onChange('schedule', newSchedule);
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = localEmployee.schedule.filter((_, i) => i !== index);
    setLocalEmployee(prev => ({ ...prev, schedule: newSchedule }));
    onChange('schedule', newSchedule);
  };

  return {
    localEmployee,
    handleInputChange,
    handleScheduleChange,
    handleAddSchedule,
    handleRemoveSchedule,
  };
};

export default useEmployeeForm;
