// src/components/LogoutPopup.jsx
import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const LogoutPopup = ({ isVisible, onConfirm, onCancel }) => {
  const { logout } = useAuth(); // Access the logout function from context

  const handleConfirm = () => {
    logout(); // Call the logout function from context
    onConfirm(); // Callback to close the popup
  };

  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 p-4 border border-gray-300 shadow-lg rounded-lg">
      <p className="mb-4">Are you sure you want to log out?</p>
      <button
        onClick={handleConfirm}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
      >
        Logout
      </button>
      <button
        onClick={onCancel}
        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  );
};

export default LogoutPopup;
