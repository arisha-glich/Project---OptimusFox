import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../../services/projectService'; // Adjust the import path as necessary
import ProjectEditPopup from './ProjectEditPopup';
import Button from '../Reusable/Button';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    loadProjects();
  }, []);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleSave = async (updatedProject) => {
    // Update project list after save
    const updatedProjects = projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-darkblue text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id} className="mb-2 flex items-center">
            <span className="flex-1">{project.name}</span>
            <Button 
              onClick={() => handleEdit(project)} 
              variant="primary" 
              className="ml-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-800"
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>
      {isPopupOpen && selectedProject && (
        <ProjectEditPopup
          project={selectedProject}
          onClose={handleClosePopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProjectList;
