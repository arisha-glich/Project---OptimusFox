import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();
//This component wraps its children with the AuthContext.Provider, making authentication state and methods available to all nested components
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load authentication state from localStorage when the component mounts
  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    // Ensure to parse the saved state and handle cases where it's not a valid JSON or null
    if (savedAuthState !== null) {
      try {
        setIsAuthenticated(JSON.parse(savedAuthState));
      } catch (error) {
        console.error('Failed to parse authentication state:', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Save authentication state to localStorage when it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    } else {
      localStorage.removeItem('isAuthenticated'); // Optional: clear state if logged out
    }
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
