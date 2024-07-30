// api.js

export const fetchTasks = async () => {
  const response = await fetch('http://localhost:5000/tasks');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create task');
  }
};

export const updateTask = async (id, task) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update task');
  }
};

export const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

export const refetchTasks = async (setTasks) => {
  try {
    const updatedTasks = await fetchTasks(); // Fetch the latest tasks from the server
    setTasks(updatedTasks); // Update the local state with the fetched tasks
  } catch (error) {
    console.error('Error fetching tasks:', error); // Handle errors
  }
};
