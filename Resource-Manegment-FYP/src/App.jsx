import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import AuthenticatedLayout from './components/Authentication/AuthenticatedLayout';
import EmployeeManager from './components/Employes/EmployeeManager';
import TaskManager from './components/Task/TaskManager';
import Charts from './components/Timer/Charts';
import HomePage from './pages/Homepage';
import TimerComponent from './components/Timer/Timer';
import ProjectManager2 from './components/Projects/ProjectManegar2';
import DisplayEmployeeList from './components/Employes/DisplayEmployeeList';
import { useAuth } from './context/AuthProvider';
import AboutUs from './pages/About';
import ParentComponent from './components/Projects/ParentComponent';
import TaskManager2 from './components/Task/TaskManegar2';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';

function App() {
  const { isAuthenticated } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.classList.add(theme); // Apply the current theme
  }, [theme]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />

        <Route path="/" element={<AuthenticatedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/viewprojects" element={<TaskManager2 />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/viewemployees" element={<DisplayEmployeeList />} />
          <Route path="/employees" element={<EmployeeManager />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/projects" element={<ParentComponent />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/timer" element={<TimerComponent task={{ id: 1, name: 'Sample Task' }} />} />
          <Route index element={<Navigate to="/home" />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
