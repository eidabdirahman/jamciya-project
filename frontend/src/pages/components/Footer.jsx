import { Facebook, Instagram, Mail, PhoneCall, Youtube, MapPin } from 'lucide-react';
import logo from '../public/logo.jpeg'; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 text-white py-10">
      <div className="container mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
            <p className="text-sm leading-relaxed ">
              Our institute is dedicated to providing quality education and fostering
              a community of lifelong learners. Join us on a journey of knowledge and growth.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-semibold  mb-4">Stay Connected</h3>
            <p className="text-sm mb-4">
              Follow us on social media for the latest updates and innovations.
            </p>
            <div className="flex space-x-6">
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-green-400"
              >
                <i className="fab fa-twitter text-xl"></i>
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
        <div className="mt-8 text-center border-t pt-4 text-sm ">
          <p>&copy; 2025 jam'iyyah. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
