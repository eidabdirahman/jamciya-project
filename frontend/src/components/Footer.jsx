import { 
  Facebook, 
  Instagram, 
  Mail, 
  PhoneCall, 
  Youtube, 
  MapPin } from 'lucide-react';
import logo from '../public/logo.jpeg';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 text-white py-10">
      <div className="container mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Branding Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center mb-4">
              <img
                src={logo}
                alt="Institute Logo"
                className="h-14 w-14 rounded-full shadow-lg"
              />
              <span className="text-primary ml-3 text-2xl font-bold">jam'iyyah al Quran wa-sunnah</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Our institute is dedicated to providing quality education and fostering
              a community of lifelong learners. Join us on a journey of knowledge and growth.
            </p>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">MENU</h3>
            <ul className="space-y-2">
              <li><Link to="/materials" className="hover:text-green-400">Materials</Link></li>
              <li><Link to="/blogs" className="hover:text-green-400">Blogs</Link></li>
              <li><Link to="/about" className="hover:text-green-400">About us</Link></li>
              <li><Link to="/contact" className="hover:text-green-400">Contact us</Link></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={20} />
                <span>info@roya-academy.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneCall size={20} />
                <span>+90 544 418 77 58</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>Basaksehir, Istanbul, Türkiye</span>
              </li>
            </ul>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-green-400"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-green-400"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-green-400"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 text-center border-t pt-4 text-sm">
          <p>&copy; 2025 jam'iyyah. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
