import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: new Date() });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ title: '', date: new Date() });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleTileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      return event ? <p>{event.title}</p> : null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleInputChange}
        placeholder="Event Title"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <Calendar
        onChange={handleDateChange}
        value={newEvent.date}
        tileContent={handleTileContent}
        className="mb-4"
      />
      <button
        onClick={handleAddEvent}
        className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Add Event
      </button>
    </div>
  );
};

export default EventDashboard;
