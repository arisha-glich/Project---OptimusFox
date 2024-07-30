import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Modal from '../Reusable/Modal';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';

const ProjectManager = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      const fetchedEmployees = await fetchEmployees();
      setEmployees(fetchedEmployees);
    };
    getEmployees();
  }, []);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = async (employee) => {
    if (employee.id) {
      await updateEmployee(employee.id, employee);
    } else {
      await createEmployee(employee);
    }
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>

      <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EmployeeForm
          employee={selectedEmployee || { name: '', role: '', skills: [], availability: '', schedule: [] }}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default ProjectManager;
