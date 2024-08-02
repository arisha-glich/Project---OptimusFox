import React, { useState, useEffect } from 'react';
import ProjectListContainer from './ProjectListContainer';
import ProjectEditPopup from './ProjectEditPopup';
import { fetchProjects, updateProject, deleteProject, createProject } from '../../services/projectService';
import Button from '../Reusable/Button';
import ProjectForm from './ProjectForm';

const ParentComponent = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    getProjects();
  }, []);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditPopup(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const handleSaveProject = async (updatedProject) => {
    try {
      await updateProject(selectedProject.id, updatedProject);
      setProjects(projects.map(project =>
        project.id === selectedProject.id ? { ...project, ...updatedProject } : project
      ));
      setShowEditPopup(false);
    } catch (error) {
      console.error('Failed to update project', error);
    }
  };

  const handleCreateProject = async (newProject) => {
    try {
      const createdProject = await createProject(newProject);
      setProjects([...projects, createdProject]);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <div className="project-form-container mb-4">
        <Button variant="primary" onClick={() => setIsCreating(true)} className="mb-4">
          Add New Project
        </Button>
        <p className="text-gray-700 dark:text-gray-300">
          Adding new projects is crucial for business growth and innovation. It allows teams to tackle new challenges, explore new opportunities, and stay competitive in a rapidly changing environment. By continually adding and updating projects, you ensure your organization remains dynamic and responsive.
        </p>
      </div>

      {isCreating && (
        <ProjectForm
          onSave={handleCreateProject}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="project-list-container mt-4">
        <ProjectListContainer
          projects={projects}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {showEditPopup && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ProjectEditPopup
            project={selectedProject}
            onClose={() => setShowEditPopup(false)}
            onSave={handleSaveProject}
          />
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
