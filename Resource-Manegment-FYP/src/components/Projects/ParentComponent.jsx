import React, { useState, useEffect } from 'react';
import ProjectListContainer from './ProjectListContainer';
import ProjectEditPopup from './ProjectEditPopup';
import { fetchProjects, updateProject, deleteProject, createProject } from '../../services/projectService';
import Button from '../Reusable/Button';
import ProjectForm from './ProjectForm';
import '../../styles/ParentComponent.css';

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
    <div className="p-4">
      <div className="project-form-container">
        <Button variant="" onClick={() => setIsCreating(true)} className="add-project-button">
          Add New Project
        </Button>
        <p className="mt-4 text-gray-700">
          Adding new projects is crucial for business growth and innovation. It allows teams to tackle new challenges, explore new opportunities, and stay competitive in a rapidly changing environment. By continually adding and updating projects, you ensure your organization remains dynamic and responsive.
        </p>
      </div>

      {isCreating && (
        <ProjectForm
          onSave={handleCreateProject}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="project-list-container">
        <ProjectListContainer
          projects={projects}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {showEditPopup && (
        <div className="project-edit-popup">
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
