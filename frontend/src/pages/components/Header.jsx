import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom"; 
import logo from "../../../public/logo.jpeg";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { title: 'About Us', href: '/about' },
    { title: 'Our Departments', href: '/departments' },
    { title: 'News', href: '/news' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              width={80}
              height={80}
              alt="logo"
              loading="lazy"
            />
            <p>Jam’iyyah Al-Quran wa-Sunnah</p>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.href} 
              className="text-gray-700 hover:text-blue-700 hover:underline underline-offset-2 font-bold transition duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
