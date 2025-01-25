import { Home, LayoutDashboard, FileText, Briefcase, Users, Building, Video, Image, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '@/slices/authSlice';
import { useEffect } from 'react';

export default function Sidebar() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/signin');
    } else {
      dispatch(setCredentials(userInfo));
    }
  }, [userInfo, navigate, dispatch]);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', isActive: pathname === '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', isActive: pathname === '/dashboard' },
    { icon: FileText, label: 'Blogs', path: '/dashboard/blogs', isActive: pathname === '/dashboard/blogs' },
    { icon: Briefcase, label: 'Projects', path: '/dashboard/projects', isActive: pathname === '/dashboard/projects' },
    { icon: Users, label: 'Partners', path: '/dashboard/partners', isActive: pathname === '/dashboard/partners' },
    { icon: Building, label: 'Departments', path: '/dashboard/departments', isActive: pathname === '/dashboard/departments' },
    { icon: Video, label: 'Videos Gallery', path: '/dashboard/videos', isActive: pathname === '/dashboard/videos' },
    { icon: Image, label: 'Photo Gallery', path: '/dashboard/photo-gallery', isActive: pathname === '/dashboard/photo-gallery' },
    { icon: User, label: 'Users', path: '/dashboard/users', isActive: pathname === '/dashboard/users' },
  ];

  return (
    <div className="bg-white transition-all duration-300 ease-in-out w-72 px-0 shadow-lg flex flex-col">
      <div className="p-4 border-b">
        {!userInfo ? (
          <LoadingUser />
        ) : (
          <UserProfile user={userInfo} />
        )}
      </div>
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
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

function LoadingUser() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0" />
      <div>
        <h3 className="font-medium">Loading...</h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0" />
      <div>
        <h3 className="font-medium">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.role}</p>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, badge, isActive, path, isCollapsed }) {
  return (
    <Link
      to={path}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-200 text-gray-700'
      }`}
    >
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
