import React from 'react';
import '../assets/Css/AboutPage.css'; // หากคุณมีไฟล์ CSS ของ Tailwind ให้แน่ใจว่าไฟล์นี้รวมอยู่ด้วย

const AboutPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold border-b-4 border-yellow-500 pb-2 mb-4 text-gray-800">
          About Us
          <span className="absolute left-0 bottom-0 w-12 h-1 bg-yellow-500"></span>
        </h1>
      </header>

      {/* Our Story Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-4 border-yellow-500 pb-2 mb-4 text-gray-800">NotificationWebsite. All Rights Reserved.

Create By Puwadon Phang-On</h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to [Poisetechnology]! This is My Mini Project From Poisetechnology
        </p>
        <p className="text-lg text-gray-700">
          Project Only use to Poisetechnology
        </p>
      </section>

      {/* Our Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-4 border-yellow-500 pb-2 mb-4 text-gray-800">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member Card */}

          {/* Another Team Member Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src="[Your Image URL]" alt="John Smith" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">John Smith</h3>
            <p className="text-lg text-gray-600 mb-4">CTO</p>
            <p className="text-gray-700">
              John is the technical genius who ensures our products are top-notch. With years of experience in [relevant field], he leads our development team.
            </p>
          </div>
          {/* Add more team members here */}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700">
          We would love to hear from you! For any inquiries, please contact us at [Your Email Address] or follow us on [social media links].
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
