// src/hooks/useProjectManager.js
import { useEffect, useState } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectService';

const useProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    status: '',
    deadline: ''
  });
  const [showProjects, setShowProjects] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch projects:', err));
  }, []);

  const handleAddProject = () => {
    createProject(formState)
      .then(() => {
        setFormState({ name: '', status: '', deadline: '' });
        return fetchProjects();
      })
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to create project:', err));
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setFormState({
      name: project.name || '',
      status: project.status || '',
      deadline: project.deadline || ''
    });
  };

  const handleUpdateProject = () => {
    updateProject(currentProject.id, formState)
      .then(() => {
        setCurrentProject(null);
        setFormState({ name: '', status: '', deadline: '' });
        return fetchProjects();
      })
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to update project:', err));
  };

  const handleDeleteProject = (id) => {
    deleteProject(id)
      .then(() => fetchProjects())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to delete project:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return {
    projects,
    currentProject,
    formState,
    handleAddProject,
    handleEditProject,
    handleUpdateProject,
    handleDeleteProject,
    handleChange,
    setShowProjects,
    setFormState
  };
};

export default useProjectManager;
