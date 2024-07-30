//it is used to display the generic date
//not using this filhal


import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <label className="block mb-1">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={date => onStartDateChange(date)}
          className="p-2 border rounded"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label className="block mb-1">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={date => onEndDateChange(date)}
          className="p-2 border rounded"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default DateFilter;
