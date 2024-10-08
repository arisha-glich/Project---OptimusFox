import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure the path to the CSS file is correct

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white h-screen flex items-center justify-center">
        <div className="text-center fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 typing-text">Optimize Your Resources with Ease</h1>
          <p className="text-lg md:text-2xl mb-6">Manage projects, track tasks, and streamline your workflow effortlessly.</p>
          <Link
            to="/projects"
            className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 fade-in-up">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md fade-in-up">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Task Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Efficiently manage tasks with customizable workflows and tracking.</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md fade-in-up">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Project Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Keep track of project milestones, deadlines, and progress in real-time.</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md fade-in-up">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Resource Allocation</h3>
              <p className="text-gray-600 dark:text-gray-300">Allocate resources effectively and optimize utilization for better outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 about-text text-gray-800 dark:text-white">About Us</h2>
          <p className="text-lg mb-6 about-text text-gray-600 dark:text-gray-300">
            Our resource management application is designed to help businesses streamline their operations. 
            With our intuitive interface and powerful features, you can effortlessly manage your projects 
            and resources, ensuring optimal efficiency and productivity.
          </p>
          <Link
            to="/about"
            className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition about-link"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 fade-in-up">Ready to Get Started?</h2>
          <p className="text-lg mb-6 fade-in-up">Sign up today and start optimizing your resources with our powerful application.</p>
          <Link
            to="/projects"
            className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition fade-in-up"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
