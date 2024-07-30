import React from 'react';
import Header from '../../layout/Header_main';
import SideMenu from '../../layout/SideLayout';
import Footer from '../../layout/Footer_main';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
