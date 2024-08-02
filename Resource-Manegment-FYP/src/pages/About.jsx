import React from 'react';
import teamMember1 from '../assets/IMAGES/1.jpg'; // Adjust the path as needed
import teamMember2 from '../assets/IMAGES/2.jpeg'; // Adjust the path as needed

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">About Us</h1>
        </header>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              At [Your Company Name], our mission is to deliver innovative and efficient resource management solutions
              that help businesses streamline operations, enhance productivity, and achieve their goals.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Meet the Team</h2>
            <div className="flex flex-wrap gap-8">
              <div className="w-full sm:w-1/2 lg:w-1/4 text-center">
                <img
                  src={teamMember1}
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">John Doe</h3>
                <p className="text-gray-500 dark:text-gray-400">Founder & CEO</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 text-center">
                <img
                  src={teamMember2}
                  alt="Team Member 2"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Jane Smith</h3>
                <p className="text-gray-500 dark:text-gray-400">Chief Technology Officer</p>
              </div>
              {/* Add more team members as needed */}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">If you have any questions or would like to learn more about our services, please get in touch with us!</p>
            <p className="text-gray-600 dark:text-gray-400">Email: <a href="mailto:contact@yourcompany.com" className="text-blue-500 dark:text-blue-400 hover:underline">contact@yourcompany.com</a></p>
            <p className="text-gray-600 dark:text-gray-400">Phone: <a href="tel:+1234567890" className="text-blue-500 dark:text-blue-400 hover:underline">+1 (234) 567-890</a></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
