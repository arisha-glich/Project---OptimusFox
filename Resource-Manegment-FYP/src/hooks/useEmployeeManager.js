import { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

const useEmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', skills: [], availability: '', schedule: [] });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    refreshEmployees();
  }, []);

  const refreshEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error refreshing employees:', error);
    }
  };

  const handleAddEmployee = async (employee) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees([...employees, newEmployee]);
      setNewEmployee({ name: '', role: '', skills: [], availability: '', schedule: [] });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const updated = await updateEmployee(editingEmployee.id, updatedEmployee);
      setEmployees(employees.map(emp => (emp.id === updated.id ? updated : emp)));
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleChange = (name, value) => {
    if (editingEmployee) {
      setEditingEmployee(prev => ({ ...prev, [name]: value }));
    } else {
      setNewEmployee(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setEditingEmployee(null);
    setNewEmployee({ name: '', role: '', skills: [], availability: '', schedule: [] });
  };

  return {
    employees,
    newEmployee,
    editingEmployee,
    handleAddEmployee,
    handleEditEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleChange,
    resetForm
  };
};

export default useEmployeeManager;
