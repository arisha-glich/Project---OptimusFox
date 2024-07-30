import React from 'react';
import Button from '../Reusable/Button';

const ProjectListContainer = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-gray-600">No projects available.</p>
      ) : (
        projects.map(project => (
          <div key={project.id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-gray-600">Status: {project.status}</p>
                <p className="text-gray-600">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={() => onEdit(project)}
                  className="py-1 px-4"
                >
                  Edit
                </Button>
                <Button
                  variant="accent"
                  onClick={() => onDelete(project.id)}
                  className="py-1 px-4"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectListContainer;
