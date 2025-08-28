
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const LogoHeader = () => {
   const [scrolled, setScrolled] = useState(false);
     const [menuOpen, setMenuOpen] = useState(false);
   
     useEffect(() => {
       const handleScroll = () => {
         setScrolled(window.scrollY > 10);
       };
       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
     }, []);
  return (
      <header
            className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
              scrolled ? 'backdrop-blur-md bg-white/30 shadow-md' : 'bg-transparent'
            }`}
          >
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center w-auto py-2">
                  <Link to="/" className="flex items-center gap-2 group">
                    <div className="rounded-full p-2 overflow-hidden">
                      <img src={logo} alt="Heart MM Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <span className="text-xl font-bold text-[#DC2626] ">Marrying Muslims</span>
                  </Link>
                  <Link to="/" className="flex items-center gap-1 text-base text-gray-600 hover:text-black  transition-colors font-semibold">
                    <ArrowLeft className="w-4 h-4" />
                    Back To Home
                  </Link>
                </div>
      
                {/* Desktop Nav */}
                {/* <nav className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    How It Works
                  </a>
                  <Link to='/login' className="text-red-500 hover:text-red-600 transition-colors font-medium">
                    Login
                  </Link>
                  <Link to='/signup' className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Sign Up
                  </Link>
                </nav> */}
      
                {/* Mobile Menu Icon */}
                {/* <div className="md:hidden">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-700 focus:outline-none"
                  >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div> */}
              </div>
      
              {/* Mobile Menu */}
              {/* {menuOpen && (
                <div className="md:hidden mt-2 space-y-3 bg-white shadow rounded-lg p-4">
                  <a href="#" className="block text-gray-600 hover:text-gray-900">
                    How It Works
                  </a>
                  <a href="#" className="block text-red-500 hover:text-red-600 font-medium">
                    Login
                  </a>
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Sign Up
                  </button>
                </div>
              )} */}
            </div>
          </header>
    
  )
}

export default LogoHeader
