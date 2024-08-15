// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Css/Header.css';


const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">
        <a href="/AboutPage">Incoming Call</a>
        
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/Aboutus" className="hover:text-gray-400">About us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
