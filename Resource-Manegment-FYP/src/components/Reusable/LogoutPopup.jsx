import React from 'react';

const LogoutPopup = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
