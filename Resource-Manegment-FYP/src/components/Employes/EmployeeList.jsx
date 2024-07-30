import React from 'react';
import Button from '../Reusable/Button';

const getInitials = (name) => {
  return name.split(' ').map(part => part.charAt(0)).join('');
};

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">Employees</h3>
      {employees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map(employee => (
            <div
              key={employee.id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center bg-gray-200 p-4 border-b border-gray-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-300 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                    {getInitials(employee.name)}
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">{employee.name}</h4>
                  <p className="text-gray-600">{employee.role}</p>
                </div>
              </div>
              <div className="p-4 border-b border-gray-300">
                <p className="text-gray-700 mb-2"><span className="font-semibold">Skills:</span> {employee.skills.join(', ')}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Availability:</span> {employee.availability}</p>
              </div>
              <div className="p-4 flex justify-end space-x-2 border-t border-gray-300">
                <Button onClick={() => onEdit(employee)} className="bg-blue-500 hover:bg-blue-600 text-white">Edit</Button>
                <Button onClick={() => onDelete(employee.id)} danger className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
