import {
  LayoutDashboard,
  Users,
  X,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({
  isOpen,
  onClose,
}: SidebarProps) => {
  const location = useLocation();

  const links = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Leads',
      path: '/leads',
      icon: Users,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className='fixed inset-0 z-40 bg-black/50 lg:hidden'
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          transform border-r border-gray-200
          bg-white shadow-xl transition-transform duration-300
          dark:border-gray-800 dark:bg-gray-900
          lg:static lg:translate-x-0
          ${
            isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        <div className='flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-800'>
          <div>
            <h2 className='text-2xl font-bold text-blue-600'>
              Smart CRM
            </h2>

            <p className='text-sm text-gray-500'>
              Lead Management
            </p>
          </div>

          <button
            onClick={onClose}
            className='rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <nav className='space-y-2 p-4'>
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className='h-5 w-5' />

                <span className='font-medium'>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;