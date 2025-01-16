import  { useState } from 'react';
import { Search, Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Corrected import

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Placeholder user object - replace with actual user data from your authentication context or API
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
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
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100" />
            <span className="font-medium">{user.name}</span>
            <ChevronDown size={16} />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="py-1">
                <Link to="/dashboard/profile">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                </Link>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => console.log('Logout')}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50 flex items-center gap-2"
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
