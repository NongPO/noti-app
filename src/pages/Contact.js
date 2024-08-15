import React from 'react';
import UserCard from '../component/UserCard';
import '../assets/Css/Contact.css'; // Import the updated CSS

const Contact = () => {
  const rainbowColors = [
    '#61A5F0', 
    '#f79724'
  ];
    <div
        className="absolute inset-0 bg-cover bg-center animate-pulse-slow opacity-20"
        style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}
        aria-hidden="true"
      ></div>

  const users = [
    {
      name: 'User 1 | Ex 5001',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 2 | 5002',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 3 | 5003',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 4 | 5004',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 5 | Ex 5005',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 6 | Ex 5006',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
    {
      name: 'User 7 | Ex 5007',
      avatar: 'https://via.placeholder.com/150',
      tags: ['Support Engineer'],
      bgColor: rainbowColors[1],
    },
  ];

  return (
    <div className="page-container w3-red">
      <div className="header-footer-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <div className="user-card" key={index}>
              <div className="user-card-content">
                <UserCard user={user} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Contact;
