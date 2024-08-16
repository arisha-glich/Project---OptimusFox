// CalendarPage.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import EventForm from './EventForm';
import EventTile from './EventTittle';
import './CalendarPage.css'

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

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

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = async (event) => {
    try {
      const response = await axios.post('http://localhost:5000/events', event);
      setEvents([...events, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = async (event) => {
    try {
      await axios.put(`http://localhost:5000/events/${event.id}`, event);
      setEvents(events.map(e => (e.id === event.id ? event : e)));
      setShowForm(false);
      setCurrentEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="flex items-center justify-center  text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Calendar
      </h2>
      <div className="calendar-container w-full max-w-4xl mx-auto">
        <Calendar
          value={date}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date(2025, 11, 31)}
          tileContent={({ date }) => <EventTile date={date} events={events} />}
          className="react-calendar mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 calendar-large"
        />
      </div>
      <button
        onClick={() => setShowForm(true)}
        className=" flex items-center justify-centermt-4 py-1 px-3 bg-green-600 text-white rounded-full hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition-colors duration-300"
      >
        + Add Event
      </button>
      {showForm && (
        <EventForm
          onSave={currentEvent ? handleEditEvent : handleAddEvent}
          onCancel={() => {
            setShowForm(false);
            setCurrentEvent(null);
          }}
          event={currentEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
