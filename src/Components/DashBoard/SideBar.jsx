import { FaBars, FaCreativeCommons, FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRole from '../../Hooks/useRole';
import SurveyorMenu from './Menu/SurveyorMenu';
import UserMenu from './Menu/UserMenu';
import AdminMenu from './Menu/AdminMenu';
import ProUserMenu from './Menu/ProUserMenu';

const SideBar = () => {
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  if (isLoading) {
    return (
      <div>
        <p>Loading.....</p>
      </div>
    );
  }

  return (
    <div className="relative flex">
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden p-2 z-20">
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 p-2 text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-10 w-64 min-h-screen bg-blue-500 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="menu p-4 font-bold text-white text-md lg:text-lg">
          <li>
            <NavLink to="/dashboard" end onClick={closeSidebar}>
              <FaCreativeCommons />
              Common
            </NavLink>
          </li>
          {/* Admin Menu */}
          {role === 'Admin' && <AdminMenu closeSidebar={closeSidebar} />}
          {/* Surveyor Menu */}
          {role === 'Surveyor' && <SurveyorMenu closeSidebar={closeSidebar} />}
          {/* User Menu */}
          {role === 'User' && <UserMenu closeSidebar={closeSidebar} />}
          {/* Pro User */}
          {role === 'Pro-User' && <ProUserMenu closeSidebar={closeSidebar} />}
          <div className="divider"></div>
          <li>
            <NavLink to="/" onClick={closeSidebar}>
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1" onClick={closeSidebar}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default SideBar;
