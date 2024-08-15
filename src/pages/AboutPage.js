import React from 'react';
import '../assets/Css/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <img
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/74268828_2186597561640157_2831256456001486848_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEVhxxHEJ5CBu6xWmqBfKh545j-HUQhzUPjmP4dRCHNQ-SNMCsqbUSE3glWtCG-dNUfDX7mukqYOtm_wPAliXar&_nc_ohc=JDMlubRFAy0Q7kNvgGf4MgA&_nc_ht=scontent.fbkk12-2.fna&oh=00_AYAbxuGowO_y4wO0z2ks-wTvu4PKuzJHOJ1f9cZzghXB6A&oe=66E28FD4"
          alt="Profile of Engi_Nong"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Engi_Nong</h2>
        <p className="text-gray-600 mb-4">Ext. 5008</p>
        <div className="flex justify-between mb-4">
          {/* Add any additional content here if needed */}
        </div>
        <div className="flex justify-between">
        <button className="px-10 py-3 rounded-full button-answer">Answer</button>
          <button className="px-11 py-2 rounded-full button-reject">Reject</button>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
