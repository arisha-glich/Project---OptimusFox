import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaProjectDiagram,
  FaChartBar,
  FaSearch,
  FaBell,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";
import logo from '../assets/IMAGES/logo.jpeg'; // Adjust the path according to where your logo is stored
import avatar from '../assets/IMAGES/1.jpg'; // Adjust the path according to where your avatar is stored

const Header = () => {
  return (
    <header className="bg-gray-800 text-gray-100 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            className="h-8 mr-4"
          />
          <h1 className="text-xl font-bold">ResourceRover</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/home" className="hover:text-white flex items-center">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/viewemployees"
                className="hover:text-white flex items-center"
              >
                <FaUsers className="mr-2" /> View Employees
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-white flex items-center">
                <FaTasks className="mr-2" /> All Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/viewprojects"
                className="hover:text-white flex items-center"
              >
                <FaProjectDiagram className="mr-2" /> All Projects
              </Link>
            </li>
            <li>
              <Link to="/charts" className="hover:text-white flex items-center">
                <FaChartBar className="mr-2" /> Charts
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 rounded bg-gray-700 text-gray-200 focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <FaBell className="text-gray-400 hover:text-white" />
          <FaQuestionCircle className="text-gray-400 hover:text-white" />
          <FaCog className="text-gray-400 hover:text-white" />
          <img
            src={avatar} // Use the imported avatar
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
