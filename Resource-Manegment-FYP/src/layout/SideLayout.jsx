import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaProjectDiagram, FaChartBar, FaClock } from 'react-icons/fa';

const SideMenu = () => {
  return (
    <aside className="bg-gray-800 text-gray-100 w-64 p-4">
      <h2 className="text-2xl font-bold mb-4">Navigation</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/home"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaUsers className="mr-2" />
              Add Employees
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaTasks className="mr-2" />
              Add Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaProjectDiagram className="mr-2" />
              Add Projects
            </Link>
          </li>
          <li>
            <Link
              to="/charts"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaChartBar className="mr-2" />
              Charts
            </Link>
          </li>
          <li>
            <Link
              to="/timer"
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <FaClock className="mr-2" />
              Timer
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
