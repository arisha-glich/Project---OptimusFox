import React from 'react';
import Header from '../../layout/Header_main';
import SideMenu from '../../layout/SideLayout';
import Footer from '../../layout/Footer_main';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SideMenu className="w-64" /> {/* Adjust width as needed */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
