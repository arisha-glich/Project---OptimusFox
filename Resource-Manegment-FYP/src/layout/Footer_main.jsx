import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6 text-center">
      <p className="mb-4">&copy; 2024 [Your Software House]. All Rights Reserved.</p>
      <ul className="list-none p-0 mb-4">
        <li className="inline mx-2">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </li>
        <li className="inline mx-2">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </li>
      </ul>
      <div className="flex justify-center gap-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
