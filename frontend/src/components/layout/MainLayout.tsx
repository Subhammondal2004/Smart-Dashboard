import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className='min-h-screen bg-gray-100 transition-colors dark:bg-gray-950'>
      <div className='flex'>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <div className='flex min-h-screen flex-1 flex-col overflow-hidden'>
          <Navbar
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
            <div className='mx-auto w-full max-w-7xl'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;