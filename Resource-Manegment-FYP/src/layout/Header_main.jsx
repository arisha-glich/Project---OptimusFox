import React, { useState, useContext } from "react";
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
  FaMoon,
  FaSun,
  FaCalendar,
} from "react-icons/fa";
import logo from "../assets/IMAGES/logo.jpeg";
import avatar from "../assets/IMAGES/1.jpg";
import { useSearch } from "../context/SearchContext";
import LogoutPopup from "../components/Reusable/LogoutPopup";
import useLogout from "../hooks/useLogout";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogout = useLogout();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutPopup(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <header className="bg-gray-800 text-gray-100 py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">ResourceRover</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="group relative">
              <Link
                to="/home"
                className="hover:text-white flex items-center space-x-2"
              >
                <FaHome /> 
              </Link>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">Go to Home</span>
            </li>
            <li className="group relative">
              <Link
                to="/viewemployees"
                className="hover:text-white flex items-center space-x-2"
              >
                <FaUsers /> <span></span>
              </Link>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">View all Employees</span>
            </li>
            <li className="group relative">
              <Link
                to="/viewprojects"
                className="hover:text-white flex items-center space-x-2"
              >
                <FaProjectDiagram /> 
              </Link>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">View Projects and Tasks</span>
            </li>
            <li className="group relative">
              <Link
                to="/calendar"
                className="hover:text-white flex items-center space-x-2"
              >
                <FaCalendar /> 
              </Link>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">View Calender</span>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded bg-gray-700 text-gray-200 focus:outline-none w-60"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={toggleTheme}
            className="group relative text-gray-400 hover:text-white"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
              {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </span>
          </button>
          <div className="group relative">
            <FaBell className="text-gray-400 hover:text-white" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">Notifications</span>
          </div>
          <div className="group relative">
            <FaQuestionCircle className="text-gray-400 hover:text-white" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">Help</span>
          </div>
          <div className="group relative">
            <FaCog className="text-gray-400 hover:text-white" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">Settings</span>
          </div>
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={handleLogoutClick}
            />
            <LogoutPopup
              isVisible={showLogoutPopup}
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
