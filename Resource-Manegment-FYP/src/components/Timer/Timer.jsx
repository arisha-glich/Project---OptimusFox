import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(''); // Custom time input

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsRunning(false); // Stop timer when time reaches 0
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    if (customTime) {
      setTime(parseInt(customTime) * 60); // Set time in seconds
      setIsRunning(true);
    }
  };

  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setCustomTime('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 border rounded shadow-sm bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">  You're doing great! Keep up the momentum!
          <br />Set Your Break Timer!
        </h3>
        <div className="mb-4 flex justify-center">
          <input
            type="number"
            placeholder="Enter minutes"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="text-center px-4 py-2 border border-gray-300 rounded-lg w-1/2 max-w-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div className="text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">
          {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleStart} className="bg-green-500 text-white py-2 px-4 rounded">
            Start
          </button>
          <button onClick={handleStop} className="bg-yellow-500 text-white py-2 px-4 rounded">
            Stop
          </button>
          <button onClick={handleReset} className="bg-red-500 text-white py-2 px-4 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
