import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div
      className="p-6 rounded-lg shadow-lg text-black"
      style={{ backgroundColor: user.bgColor }}
    >
      <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="text-xl font-semibold text-center mb-2">{user.name}</h3>
      <p className="text-center">{user.tags.join(', ')}</p>
    </div>
  );
};

export default UserCard;
