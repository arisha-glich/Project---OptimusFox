import { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    loadEmployees();
  }, []);

  const addEmployee = async (employee) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const updateEmployeeById = async (id, employee) => {
    try {
      const updatedEmployee = await updateEmployee(id, employee);
      setEmployees(prevEmployees =>
        prevEmployees.map(e => (e.id === id ? updatedEmployee : e))
      );
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployeeById = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return { employees, addEmployee, updateEmployeeById, deleteEmployeeById };
};
