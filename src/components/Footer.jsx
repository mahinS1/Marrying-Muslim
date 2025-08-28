import React from "react";
import { ArrowUp } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative">
      {/* Back to Top Arrow Button - left corner, only in footer */}
      <button
        onClick={(e) => {
          if (!e.currentTarget) return;
          e.currentTarget.classList.add("scale-90");
          // Instantly scroll to top
          window.scrollTo({ top: 0, behavior: 'auto' });
          setTimeout(() => {
            if (e.currentTarget) e.currentTarget.classList.remove("scale-90");
          }, 150);
        }}
        className="absolute left-4 bottom-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg p-3 flex items-center justify-center transition-all duration-200 z-20 active:scale-90"
        title="Back to Top"
        aria-label="Back to Top"
        style={{ transition: "transform 0.15s" }}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-12 mr-5">
            <div className="flex justify-center sm:justify-start items-center">
              <img
                src="./images/nMM.png"
                alt="Logo"
                className="w-40 sm:w-32 md:w-56 -mt-12 sm:ml-10 h-auto mb-4 object-contain"
              />
            </div>
            {/* Logo Section - mobile: left, big image; desktop: normal */}
            <div className="flex flex-col items-start mb-6 md:mb-0 px-4 sm:px-6 md:px-0">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10  rounded-full flex items-center justify-center mr-2 overflow-hidden">
                  <img
                    src={logo}
                    alt="Heart MM Logo"
                    className="w-16 h-16  rounded-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Marrying Muslims</h3>
              </div>
              <p className="text-gray-400 text-left text-sm leading-relaxed max-w-xs">
                Connecting Muslim hearts worldwide with dignity and respect.
              </p>
            </div>
            {/* Quick Links */}
            <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#howitworks"
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#successstories"
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    Our Vision
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={"/privacy-policy"}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/termsandconditions"}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/cookie-policy"}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-start px-4 sm:px-6 md:px-0">
              <div className="space-y-1 text-white text-base mb-4  text-left w-full">
                <strong>Contact</strong><br />
                Email: <a className="text-sm text-gray-400" href="mailto:help@marryingmuslims.com">help@marryingmuslims.com</a><br />
                Address:<br />
                <p className="text-gray-400">JPJ7+7GM, At-Thamiri Street<br />
                Ad-Dirah, Riyadh<br />
                Kingdom of Saudi Arabia (KSA)</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center px-4 sm:px-6 md:px-0">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2025 Marrying Muslims. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
