import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import AuthenticatedLayout from './components/Authentication/AuthenticatedLayout'; // Layout for authenticated routes
import EmployeeManager from './components/Employes/EmployeeManager';
import TaskManager from './components/Task/TaskManager';
import Charts from './components/Timer/Charts';
import HomePage from './pages/Homepage';
import TimerComponent from './components/Timer/Timer';
import ProjectManager2 from './components/Projects/ProjectManegar2';
import DisplayEmployeeList from './components/Employes/DisplayEmployeeList';
import { useAuth } from './context/AuthProvider'; // Import auth context
import AboutUs from './pages/About';
import ParentComponent from './components/Projects/ParentComponent';

function App() {
  const { isAuthenticated } = useAuth(); // Check authentication status

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />

      {/* Protected Routes */}
      <Route path="/" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/viewprojects" element={<ProjectManager2 />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/viewemployees" element={<DisplayEmployeeList />} />
        <Route path="/employees" element={<EmployeeManager />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="/projects" element={<ParentComponent/>} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/timer" element={<TimerComponent task={{ id: 1, name: 'Sample Task' }} />} />
        <Route path="" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}                  

export default App;
