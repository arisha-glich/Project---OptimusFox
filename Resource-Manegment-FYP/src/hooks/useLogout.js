// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform the logout operation
    navigate('/signup'); // Redirect to the signup page after logout
  };

  return handleLogout;
};

export default useLogout;
