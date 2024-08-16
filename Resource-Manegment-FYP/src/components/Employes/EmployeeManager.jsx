import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Modal from '../Reusable/Modal';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';
import '../../styles/ProjectManager.css';

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
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="pt-10 add-employee-container">
        <button 
          onClick={handleAdd} 
          className="add-employee-button bg-[#8898a8] hover:bg-[#002a5e] dark:bg-[#3f652e] dark:hover:bg-[#77849a] text-white font-bold py-2 px-4 rounded"
        >
          + 
        </button>
        <p className="add-employee-text text-gray-700 dark:text-gray-300">
          Adding new employees is essential for expanding your team's capabilities and ensuring that all projects are adequately staffed with the right skills.
        </p>
      </div>
      <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EmployeeForm
          employee={selectedEmployee || { name: '', role: '', skills: [], availability: '' }}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default ProjectManager;
