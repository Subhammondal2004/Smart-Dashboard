import { useEffect, useState } from 'react';

import {
  Menu,
  LogOut,
  Moon,
  Sun,
  User,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import api from '../../api/axios';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({
  onMenuClick,
}: NavbarProps) => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  useEffect(() => {
    const theme =
      localStorage.getItem('theme') || 'light';

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success('Logged out successfully');

      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className='sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
      <div className='flex items-center justify-between px-4 py-4 lg:px-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={onMenuClick}
            className='rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden'
          >
            <Menu className='h-6 w-6 text-gray-700 dark:text-white' />
          </button>

          <div>
            <h1 className='hidden text-xl font-bold text-gray-900 dark:text-white sm:block'>
              Smart Leads Dashboard
            </h1>

            <p className='hidden text-sm text-gray-500 dark:text-gray-400 md:block'>
              Manage and track your leads
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            className='rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800'
          >
            {isDark ? (
              <Sun className='h-5 w-5 text-yellow-400' />
            ) : (
              <Moon className='h-5 w-5 text-gray-700 dark:text-white' />
            )}
          </button>

          <div className='hidden items-center gap-3 rounded-xl bg-gray-100 px-4 py-2 dark:bg-gray-800 sm:flex'>
            <div className='rounded-full bg-blue-100 p-2 dark:bg-blue-900'>
              <User className='h-4 w-4 text-blue-600 dark:text-blue-300' />
            </div>

            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                {user?.name || 'Sales User'}
              </span>

              <span className='text-xs capitalize text-gray-500'>
                {user?.role || 'sales'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='flex items-center gap-2 rounded-lg px-4 py-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950'
          >
            <LogOut className='h-5 w-5' />

            <span className='hidden sm:inline'>
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;