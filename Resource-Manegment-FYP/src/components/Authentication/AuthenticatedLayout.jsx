import React from 'react';
import Header from '../../layout/Header_main';
import SideMenu from '../../layout/SideLayout';
import Footer from '../../layout/Footer_main';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu className="hidden lg:block w-64 bg-gray-800 text-white" />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
