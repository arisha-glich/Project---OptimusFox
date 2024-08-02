import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaProjectDiagram, FaChartBar, FaSearch, FaBell, FaQuestionCircle, FaCog, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../assets/IMAGES/logo.jpeg';
import avatar from '../assets/IMAGES/1.jpg';
import { useSearch } from '../context/SearchContext';
import LogoutPopup from '../components/Reusable/LogoutPopup';
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

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
            <li><Link to="/home" className="hover:text-white flex items-center space-x-2"><FaHome /> <span>Home</span></Link></li>
            <li><Link to="/viewemployees" className="hover:text-white flex items-center space-x-2"><FaUsers /> <span>View Employees</span></Link></li>
            <li><Link to="/viewprojects" className="hover:text-white flex items-center space-x-2"><FaProjectDiagram /> <span>Projects Tasks</span></Link></li>
            <li><Link to="/charts" className="hover:text-white flex items-center space-x-2"><FaChartBar /> <span>Charts</span></Link></li>
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
          <button onClick={toggleTheme} className="text-gray-400 hover:text-white">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <FaBell className="text-gray-400 hover:text-white" />
          <FaQuestionCircle className="text-gray-400 hover:text-white" />
          <FaCog className="text-gray-400 hover:text-white" />
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
