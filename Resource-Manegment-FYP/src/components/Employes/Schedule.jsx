import React from 'react';

const ScheduleInput = ({ index, day, hours, onChange, onRemove }) => (
  <div className="flex items-center mb-2">
    <input
      type="text"
      name="day"
      placeholder="Day"
      value={day}
      onChange={(e) => onChange(e, index, 'day')}
      className="input-field mr-2"
    />
    <input
      type="text"
      name="hours"
      placeholder="Hours"
      value={hours}
      onChange={(e) => onChange(e, index, 'hours')}
      className="input-field mr-2"
    />
    <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-800">Remove</button>
  </div>
);

export default ScheduleInput;
