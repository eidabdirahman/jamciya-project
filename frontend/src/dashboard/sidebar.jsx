import { useState, useEffect } from "react";
import { Calendar, Mail, Grid } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const menuItems = [
    { icon: Grid, label: 'Dashboard', path: '/dashboard', isActive: pathname === '/dashboard' },
    { icon: Calendar, label: 'Blogs', path: '/dashboard/blogs', isActive: pathname === '/dashboard/blogs' },
    { icon: Calendar, label: 'Projects', path: '/dashboard/projects', isActive: pathname === '/dashboard/projects' },
    { icon: Calendar, label: 'Partners', path: '/dashboard/partners', isActive: pathname === '/dashboard/partners' },
    { icon: Calendar, label: 'Departments', path: '/dashboard/departments', isActive: pathname === '/dashboard/departments' },
    { icon: Calendar, label: 'Videos Gallery', path: '/dashboard/videos', isActive: pathname === '/dashboard/videos' },
    { icon: Calendar, label: 'Photo Gallery', path: '/dashboard/photo-gallery', isActive: pathname === '/dashboard/photo-gallery' },
];

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  return (
    <div className={`bg-white transition-all duration-300 ease-in-out w-72 px-0 shadow-lg flex flex-col`}>
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0" />
          <div>
            <h3 className="font-medium">name</h3>
            <p className="text-sm text-gray-500">admin</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={item.isActive}
              isCollapsed={false}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, badge, isActive, path, isCollapsed }) {
  return (
    <Link to={path} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
      <Icon size={20} />
      {!isCollapsed && (
        <span className="flex-1 flex items-center justify-between">
          {label}
          {badge && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {badge}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
