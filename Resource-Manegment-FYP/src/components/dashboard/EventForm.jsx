// EventForm.js
import React, { useState, useEffect } from 'react';

const EventForm = ({ onSave, onCancel, event }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? new Date(event.date) : new Date());
  const [id, setId] = useState(event ? event.id : '');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(new Date(event.date));
      setId(event.id);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id, title, date });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
          {event ? 'Edit Event' : 'Add Event'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              value={date.toISOString().substr(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
