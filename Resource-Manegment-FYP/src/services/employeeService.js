import axios from 'axios';

const API_URL = 'http://localhost:5000/employees';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    return data.map(employee => ({
      ...employee,
      skills: Array.isArray(employee.skills) ? employee.skills : [],
      availability: typeof employee.availability === 'string' ? employee.availability : '',
      schedule: Array.isArray(employee.schedule) ? employee.schedule : [] 
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(API_URL, {
      ...employee,
      skills: Array.isArray(employee.skills) ? employee.skills : [],
      availability: typeof employee.availability === 'string' ? employee.availability : '',
      schedule: Array.isArray(employee.schedule) ? employee.schedule : [] 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      ...updatedEmployee,
      skills: Array.isArray(updatedEmployee.skills) ? updatedEmployee.skills : [],
      availability: typeof updatedEmployee.availability === 'string' ? updatedEmployee.availability : '',
      schedule: Array.isArray(updatedEmployee.schedule) ? updatedEmployee.schedule : [] 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const refreshEmployees = async () => {
  try {
    return await fetchEmployees();
  } catch (error) {
    console.error('Error refreshing employees:', error);
    throw error;
  }
};
