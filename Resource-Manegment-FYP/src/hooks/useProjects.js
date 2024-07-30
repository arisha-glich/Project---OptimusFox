import { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectService';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    loadProjects();
  }, []);

  const addProject = async (project) => {
    try {
      const newProject = await createProject(project);
      setProjects(prevProjects => [...prevProjects, newProject]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProjectById = async (id, project) => {
    try {
      const updatedProject = await updateProject(id, project);
      setProjects(prevProjects =>
        prevProjects.map(p => (p.id === id ? updatedProject : p))
      );
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProjectById = async (id) => {
    try {
      await deleteProject(id);
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return { projects, addProject, updateProjectById, deleteProjectById };
};
