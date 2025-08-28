
import logo from '../assets/logo.png';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Home page: show nav if not logged in, else show logo + go to profile button
  if (location.pathname === '/') {
    let isLoggedIn = false;
    try {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) isLoggedIn = true;
    } catch {}

    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="rounded-full p-2 mr-3">
                <img src={logo} alt="Heart MM Logo" className="w-12 h-12 rounded-full object-contain" />
              </div>
              <span className="lg:text-xl text-md font-bold text-[#DC2626]">Marrying Muslims</span>
            </Link>
            <div />
            {isLoggedIn ? (
              <button
                className="bg-[#DC2626] hover:bg-red-700 text-white px-2 lg:px-4 py-2 rounded-md font-medium transition-colors lg:text-sm text-[.5rem]"
                onClick={() => navigate('/dashboard')}
              >
                Go to Profile
              </button>
            ) : (
              <>
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#howitworks" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    How It Works
                  </a>
                  <Link to='/login' className="text-[#DC2626] hover:text-red-600 transition-colors font-medium cursor-pointer">
                    Login
                  </Link>
                  <Link to='/signup' className="bg-[#DC2626] hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
                    Sign Up
                  </Link>
                </nav>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-700 focus:outline-none cursor-pointer ml-2"
                  >
                    {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                  </button>
                </div>
                {/* Mobile menu dropdown */}
                {menuOpen && (
                  <div className="absolute top-16 right-4 left-4 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-4 z-50 md:hidden">
                    <a href="#howitworks" className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer block">
                      How It Works
                    </a>
                    <Link to='/login' className="text-[#DC2626] hover:text-red-600 transition-colors font-medium cursor-pointer block">
                      Login
                    </Link>
                    <Link to='/signup' className="bg-[#DC2626] hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer block text-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Dashboard: logo click navigates home, rest of header as before
  if (location.pathname === '/dashboard') {
    return (
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center cursor-pointer">
              <div className="rounded-full p-2 mr-3">
                <img src={logo} alt="Heart MM Logo" className="w-12 h-12 rounded-full object-contain" />
              </div>
              <span className="text-xl font-bold text-[#DC2626]">Marrying Muslims</span>
            </Link>
            {/* ...existing nav and profile logic here if needed... */}
          </div>
        </div>
      </header>
    );
  }

  // Other pages: default header
  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="rounded-full p-2 mr-3">
              <img src={logo} alt="Heart MM Logo" className="w-12 h-12 rounded-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#DC2626]">Marrying Muslims</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
