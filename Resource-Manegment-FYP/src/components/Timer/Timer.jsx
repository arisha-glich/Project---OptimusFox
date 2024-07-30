import React, { useState, useEffect } from 'react';

const TimerComponent = ({ task = { id: 'default', name: 'Default Task' } }) => { // Default task prop
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    // Automatically start timer when task changes
    setIsRunning(true);
    return () => {
      setIsRunning(false); // Stop timer when task changes
    };
  }, [task]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Task: {task.name}</h3>
      <div className="text-xl mb-4">
        {Math.floor(time / 3600)}:{Math.floor((time % 3600) / 60)}:{time % 60}
      </div>
      <button onClick={handleStart} className="bg-green-500 text-white py-1 px-3 rounded mr-2">
        Start
      </button>
      <button onClick={handleStop} className="bg-yellow-500 text-white py-1 px-3 rounded mr-2">
        Stop
      </button>
      <button onClick={handleReset} className="bg-red-500 text-white py-1 px-3 rounded">
        Reset
      </button>
    </div>
  );
};

export default TimerComponent;
