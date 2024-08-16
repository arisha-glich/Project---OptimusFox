import React, { useState, useEffect } from "react";
import TodayTasks from "./TodayTasks";
import EventPopup from "./EventPopup"; // Import the EventPopup component

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [showEventPopup, setShowEventPopup] = useState(false); // State to manage the visibility of the EventPopup
  const [events, setEvents] = useState([]); // State to manage events

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
    fetchEvents(); // Fetch events on component mount
  }, []);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handle adding a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowEventPopup(false); // Close the popup after adding the event
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-2 p-1 dark:bg-gray-800">
      {/* Today's Tasks Section */}
      <div className="w-full md:w-1/2 bg-gray-400 dark:bg-gray-800  rounded-lg shadow-lg">
        <TodayTasks tasks={tasks} onAddTask={handleAddTask} />
      </div>

      {/* Events Section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Events
        </h2>
        <h4 className="text- font-bold mb-4 text-gray-800 dark:text-gray-200">
        This section manages and displays upcoming events, and allows users to add new events.
        </h4>
        <button
          onClick={() => setShowEventPopup(true)}
          className="py-1 px-2 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition-colors duration-300"
        >
          + Add Event
        </button>
        {/* Display events here */}
        <ul className="mt-4 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="bg-gray-100 dark:bg-gray-800 p-4  border-spacing-2rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Event Popup Component */}
      {showEventPopup && (
        <EventPopup onAddEvent={handleAddEvent} onClose={() => setShowEventPopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;
