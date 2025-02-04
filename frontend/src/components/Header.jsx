import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import logo from "../public/logo.jpeg";

// Main Header Component
const Header = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'Our Departments', href: '/departments' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blogs', href: '/blogs' },
    { title: 'Be a member', href: '/member' },
    { title: 'Contact Us', href: '/contact' },
  ];

  const toggleMenu = () => setDropdownOpen(!dropdownOpen);

  const handleItemClick = (href) => {
    setDropdownOpen(false);
    navigate(href);
  };

  return (
    <nav className="bg-white border-b shadow-sm fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />
        <DesktopNav items={menuItems} pathname={pathname} userInfo={userInfo} />
        <MobileMenuButton isOpen={dropdownOpen} toggleMenu={toggleMenu} />
      </div>
      {dropdownOpen && <MobileNav items={menuItems} pathname={pathname} onItemSelect={handleItemClick} userInfo={userInfo} />}
    </nav>
  );
};

// Logo Component
const Logo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        width={70}
        height={60}
        alt="logo"
        loading="lazy"
      />
      <p className="text-xl font-bold text-blue-500">Jam’iyyah Al-Quran wa-Sunnah</p>
    </Link>
  </div>
);

// Desktop Navigation Component
const DesktopNav = ({ items, pathname, userInfo }) => (
  <div className="hidden md:flex space-x-6 items-center">
    {items.map((item) => (
      <Link
        key={item.href}
        to={item.href}
        className={`text-gray-700 hover:text-blue-400 capitalize transition-colors duration-200 ${pathname === item.href ? 'text-blue-700 font-semibold' : ''}`}
      >
        {item.title}
      </Link>
    ))}
    {userInfo ? (
      <Link
        to="/dashboard"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ml-6"
      >
        Dashboard
      </Link>
    ) : (
      <Link
        to="/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ml-6"
      >
        Signin
      </Link>
    )}
  </div>
);

// Mobile Menu Button Component
const MobileMenuButton = ({ isOpen, toggleMenu }) => (
  <div className="md:hidden flex items-center">
    <button onClick={toggleMenu} className="focus:outline-none">
      {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
    </button>
  </div>
);

// Mobile Navigation Component
const MobileNav = ({ items, pathname, onItemSelect, userInfo }) => (
  <div className={`md:hidden bg-white shadow-md ${dropdownOpen ? 'block' : 'hidden'}`}>
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-col space-y-4">
        {items.map((item) => (
          <button
            key={item.href}
            onClick={() => onItemSelect(item.href)}
            className={`block w-full text-left text-gray-700 hover:text-blue-400 capitalize transition-colors duration-200 ${pathname === item.href ? 'text-blue-700 font-semibold' : ''}`}
          >
            {item.title}
          </button>
        ))}
        {userInfo ? (
          <button
            onClick={() => onItemSelect('/dashboard')}
            className="font-light rounded-full bg-blue-500 text-white hover:bg-blue-700"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => onItemSelect('/signin')}
            className="font-light rounded-full bg-blue-500 text-white hover:bg-blue-700"
          >
            Signin
          </button>
        )}
      </div>
    </div>
  </div>
);
export default Header;
