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
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id} className="mb-2">
            {project.name}
            <Button onClick={() => handleEdit(project)} variant="primary" className="ml-2">
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
