import React from 'react';
import Button from '../Reusable/Button';

// Reusable Card component
const Card = ({ title, content, footer }) => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    <div className="bg-[#00356B] text-white flex items-center justify-center h-48 rounded-t-lg">
      <div className="text-4xl font-bold">{title}</div>
    </div>
    <div className="px-6 py-4">{content}</div>
    <div className="px-6 pt-4 pb-2 flex justify-end space-x-2">{footer}</div>
  </div>
);

const EmployeeList = ({ employees, onEdit, onDelete }) => (
  <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
    <h3 className="text-4xl font-semibold mb-6  text-[#621818]">Meet Our Team</h3>
    <p className="text-lg text-gray-700 mb-8">
      At OptimusFox, we pride ourselves on having a dedicated and talented team that drives our success. Our employees are our greatest asset, bringing a wealth of experience and expertise to every project. Below, you'll find an introduction to some of the key members of our team who contribute to making our company thrive.
    </p>
    <h3 className="text-2xl font-semibold mb-6 text-[#00356B]">Employees of OPTIMUSFOX</h3>
    {employees.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <Card
            key={employee.id}
            title={employee.name.split(' ').map(part => part.charAt(0)).join('')}  // Initials
            content={
              <>
                <div className="font-bold text-xl mb-2 text-[#00356B]">{employee.name}</div>
                <p className="text-gray-700 text-base mb-2"><span className="font-semibold">Role:</span> {employee.role}</p>
                <p className="text-gray-700 text-base mb-2"><span className="font-semibold">Skills:</span> {employee.skills.join(', ')}</p>
                <p className="text-gray-700 text-base mb-2"><span className="font-semibold">Availability:</span> {employee.availability}</p>
              </>
            }
            footer={
              <>
                <Button onClick={() => onEdit(employee)} variant="primary" className="bg-[#00356B] hover:bg-[#002b59]">Edit</Button>
                <Button onClick={() => onDelete(employee.id)} variant="danger" className="bg-red-500 hover:bg-red-600">Delete</Button>
              </>
            }
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No employees found.</p>
    )}
  </div>
);

export default EmployeeList;
