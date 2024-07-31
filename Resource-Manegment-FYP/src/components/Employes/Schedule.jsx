import React from 'react';

// Reusable InputField component
const InputField = ({ name, placeholder, value, onChange, className }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`input-field ${className}`}
  />
);

const ScheduleInput = ({ index, day, hours, onChange, onRemove }) => (
  <div className="flex items-center mb-2">
    <InputField
      name="day"
      placeholder="Day"
      value={day}
      onChange={(e) => onChange(e, index, 'day')}
      className="mr-2"
    />
    <InputField
      name="hours"
      placeholder="Hours"
      value={hours}
      onChange={(e) => onChange(e, index, 'hours')}
      className="mr-2"
    />
    <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-800">Remove</button>
  </div>
);

export default ScheduleInput;
