import { useState, useEffect } from 'react';
import { Search, LogOut, ChevronDown, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserDetailsQuery, useLogoutMutation } from '@/slices/usersApiSlice';
import { setCredentials, logout } from '@/slices/authSlice';
import {toast} from 'react-hot-toast';
export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { data: user, error, isLoading } = useGetUserDetailsQuery();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
    }
  }, [user, dispatch]);

  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
      toast.error('Failed to logout');
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.profile-dropdown') && isProfileOpen) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isProfileOpen]);

  const toggleProfileDropdown = (event) => {
    event.stopPropagation(); // Stop propagation of the event
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <header className="w-full h-16 bg-white shadow-sm z-50 px-4 flex items-center justify-between">
      {/* Search Section */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2">
        {/* Profile */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100" />
            <span className="font-medium">
              {isLoading ? 'Loading...' : userInfo?.role === 'admin' || userInfo?.role === 'superadmin' ? userInfo?.name : 'User  '}
            </span>
            <ChevronDown size={16} />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 profile-dropdown z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium">
                  {isLoading ? 'Loading...' : userInfo?.role === 'admin' || userInfo?.role === 'superadmin' ? userInfo?.name : 'Guest'}
                </p>
                <p className="text-sm text-gray-500">
                  {isLoading ? 'Loading...' : userInfo?.role === 'admin' || userInfo?.role === 'superadmin' ? userInfo?.email : 'No email'}
                </p>
              </div>

              <div className="py-1">
                <Link to="/dashboard/profile">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                    <User  size={16} />
                    <span>Profile</span>
                  </button>
                </Link>
                
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50 flex items-center gap-2"
                  disabled={isLogoutLoading}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
