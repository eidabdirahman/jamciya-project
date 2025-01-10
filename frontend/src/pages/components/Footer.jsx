import { Facebook, Instagram, Mail, PhoneCall, Youtube } from 'lucide-react';
import logo from '../../../public/logo.jpeg'; // Adjust the path according to your project structure

const Footer = () => {
  return (
    <footer className="bg-[#004A64] text-white py-10 mt-40">
      <div className="container mx-auto px-6 flex flex-wrap justify-between">
        <div className="w-full sm:w-1/3 text-center sm:text-left mb-6 sm:mb-0">
          <h2 className="text-lg font-bold uppercase mb-4 text-[#F48024]">
            About the Institute
          </h2>
          <p className="bg-[#F48024] w-72 h-[0.8px] my-4"></p>
          <img
            src={logo}
            alt="Institute Logo"
            className="mx-auto sm:mx-0 w-32 mb-4"
          />
          <div className="flex justify-center sm:justify-start gap-4">
            <Youtube />
            <Instagram />
            <Facebook />
          </div>
          <div className="mt-4">
            <p className="flex items-center justify-center sm:justify-start gap-3">
              <Mail size={20} className="text-[#f48023]" />
              jnks@gmail.com
            </p>
            <p className="flex items-center justify-center sm:justify-start mt-2 gap-3">
              <PhoneCall size={20} className="text-[#f48023]" />
              +252 63 000000
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/3 text-center sm:text-left mb-6 sm:mb-0">
          <h2 className="text-lg font-bold uppercase  text-[#F48024] ">
            Index
          </h2>

          <p className="bg-[#F48024] w-72 h-[0.8px] my-4"></p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#F48024]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F48024]">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/3">
          <h2 className="text-lg font-bold uppercase mb-4 text-[#F48024]">
            What&apos;s New?
          </h2>
          <p className="bg-[#F48024] w-72 h-[0.8px] my-4"></p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="/2.jpeg"
                alt="News 1"
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  The Way of The Servant of Allah
                </h3>
                <p className="text-xs">Sh. Khalid Ahmed | 2022-08-12</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/2.jpeg"
                alt="News 2"
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  The Way of The Students of Knowledge
                </h3>
                <p className="text-xs">Sh. A/basid barawe | 2022-08-12</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/1.jpeg"
                alt="News 3"
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  Meditations on The Concept of Iman
                </h3>
                <p className="text-xs">Dr. Khadar | 2022-08-12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-6">
        <p>All Rights Are Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
