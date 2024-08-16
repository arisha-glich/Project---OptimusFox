import React, { useState } from 'react';
import axios from 'axios';

const EventPopup = ({ onAddEvent, onClose }) => {
  const [event, setEvent] = useState({ title: '', date: new Date() });

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setEvent({ ...event, date: new Date(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/events', event);
      onAddEvent(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Add Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            value={event.date.toISOString().substr(0, 10)}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-full hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
