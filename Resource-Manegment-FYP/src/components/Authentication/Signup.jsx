import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Reusable/Button';
import useSignupForm from '../../hooks/useSignupForm';
import logo from '../../assets/IMAGES/logo.jpeg'; // Ensure correct path
import background from '../../assets/IMAGES/backgroundimage.png'; // Ensure correct path
import '../../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate } = useSignupForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.error('Form validation failed');
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000'; // Use fallback

    try {
      console.log('API URL:', apiUrl); // Debug log
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center p-6 bg-gray-900 rounded-lg shadow-lg max-w-md w-full h-auto">
        <img src={logo} alt="Company Logo" className="w-24 mb-6 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-6 text-red-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <div className="form-group">
            <label htmlFor="fullName" className="block text-gray-300 mb-1">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-300 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-gray-300 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="block text-gray-300 mb-1">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>
          <Button type="submit" variant="primary" className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
