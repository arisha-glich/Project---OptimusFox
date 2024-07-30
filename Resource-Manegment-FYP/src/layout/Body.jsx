// Body.js
import React from 'react';
import Header from './Header_main';
import Footer from './Footer_main';
import SideMenu from './SideLayout';

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <SideMenu />
        <main className="flex-grow p-8 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Employee Management System</h1>
          {/* Main content goes here */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
