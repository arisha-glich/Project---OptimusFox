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
    <div className="p-4">
      <Button variant="primary" onClick={() => setIsCreating(true)} className="mb-4">
        Add New Project
      </Button>
      {isCreating && (
        <ProjectForm
          onSave={handleCreateProject}
          onCancel={() => setIsCreating(false)}
        />
      )}
      <ProjectListContainer
        projects={projects}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      {showEditPopup && (
        <ProjectEditPopup
          project={selectedProject}
          onClose={() => setShowEditPopup(false)}
          onSave={handleSaveProject}
        />
      )}
     
    </div>
  );
};

export default ParentComponent;
