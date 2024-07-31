import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Reusable/Button';
import useLoginForm from '../../hooks/useLoginForm';
import { useAuth } from '../../context/AuthProvider'; // Import the Auth context
import logo from '../../assets/IMAGES/logo.jpeg'; // Ensure path is correct
import background from '../../assets/IMAGES/backgroundimage.png'; // Ensure path is correct
import '../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate } = useLoginForm();
  const { login } = useAuth(); // Get the login function from Auth context
  const [loginError, setLoginError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.error('Form validation failed');
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000'; // Use fallback

    try {
      console.log('Attempting to log in with email:', values.email);

      const response = await fetch(`${apiUrl}/users?email=${values.email}`);

      // Log response text for debugging
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = JSON.parse(responseText);
      console.log('Received users:', users);

      const user = users.find(u => u.email === values.email && u.password === values.password);
      if (user) {
        console.log('Login successful, redirecting to /home');
        login(); // Update authentication state
        navigate('/home'); // Redirect to /home
      } else {
        console.error('Login failed: Invalid email or password');
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 w-full h-1 border-t-2 border-red-600 transform -translate-x-1/2 -translate-y-1/2 animate-line"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-1 border-t-2 border-red-600 transform -translate-x-1/2 animate-line2"></div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full z-10 relative transition-transform transform hover:scale-105 duration-300">
        <div className="text-center mb-6">
          <img src={logo} alt="Company Logo" className="w-24 mx-auto mb-4 animate-zoom" />
          <h2 className="text-3xl font-semibold mb-6 text-red-600 animate-fade">OptimusFox ResourceRover</h2>
          <h1 className="text-2xl font-bold text-white animate-fade">Welcome Back!</h1>
          <p className="text-gray-400 mt-2 animate-fade">Please log in to continue accessing your account and our services.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-300 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
          <Button type="submit" variant="primary" className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-300">Sign In</Button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account? 
          <button 
            onClick={handleSignupRedirect} 
            className="text-red-600 hover:text-red-700 font-semibold ml-1">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
