import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onCancel, employees, projects }) => {
  const [name, setName] = useState(task.name);
  const [employeeId, setEmployeeId] = useState(task.employeeId);
  const [projectId, setProjectId] = useState(task.projectId || '');
  const [assignedDate, setAssignedDate] = useState(task.assignedDate || '');
  const [schedule, setSchedule] = useState(task.schedule || '');

  useEffect(() => {
    setName(task.name);
    setEmployeeId(task.employeeId);
    setProjectId(task.projectId || '');
    setAssignedDate(task.assignedDate || '');
    setSchedule(task.schedule || '');
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...task,
      name,
      employeeId,
      projectId,
      assignedDate,
      schedule,
    });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">{task.id ? 'Edit Task' : 'Add Task'}</h2>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Assigned Employee</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Project</label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Assigned Date</label>
          <input
            type="date"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Schedule</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
