// EventTile.js
import React from 'react';

const EventTile = ({ date, events }) => {
  const eventsOnDate = events.filter(event =>
    date.toDateString() === new Date(event.date).toDateString()
  );
  
  return (
    <div>
      {eventsOnDate.map((event, index) => (
        <div key={index} className="text-red-500">{event.title}</div>
      ))}
    </div>
  );
};

export default EventTile;
