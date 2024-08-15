// src/components/Footer.js

import React from 'react';
import '../assets/Css/Footer.css'; // ไฟล์ CSS สำหรับสไตล์

const Footer = () => {
  return (
    
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} NotificationWebsite. All Rights Reserved.</p>
        <p> Create By Puwadon Phang-On </p>
        <div className="footer-socials">
          <a href="https://www.facebook.com/PoiseThailand" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/poisetechnology/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
