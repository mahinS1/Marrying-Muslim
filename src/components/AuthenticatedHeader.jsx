import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, Settings, Search, Home, UserCircle, Mail } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthenticatedHeader = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Hide dropdown when clicking outside
  useEffect(() => {
    if (!userDropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);
  const [userInfo, setUserInfo] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get logged in user from localStorage for basic info
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          setUserInfo(JSON.parse(loggedInUser));
        }

        // Get current authenticated user
        const user = auth.currentUser;
        if (user) {
          // Fetch profile data from Firestore
          const profileDoc = await getDoc(doc(db, 'userProfileData', user.uid));
          if (profileDoc.exists()) {
            setProfileData(profileDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('loggedInUser');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  const getDisplayName = () => {
    if (profileData?.personalInfo?.firstName) {
      return `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName || ''}`.trim();
    }
    return userInfo?.username || 'User';
  };

  const getProfileImage = () => {
    const gender = profileData?.personalInfo?.gender;
    if (gender === 'Male') {
      return '/images/man.jpg';
    } else if (gender === 'Female') {
      return '/images/woman.png';
    }
    return null;
  };

  const navLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/profile', icon: UserCircle, label: 'Profile' }
  ];

  const currentPage = location.pathname;

  return (

  <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/30 shadow-md w-full">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="rounded-full p-2 mr-3">
              <img src={logo} alt="Heart MM Logo" className="w-12 h-12 rounded-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-[#DC2626]">Marrying Muslims</h1>
          </Link>

          {/* Spacer to push nav and user icon to right */}
          <div className="flex-grow" />

          {/* Navigation Links (show on dashboard, search, and profile pages) */}
          {(currentPage === '/dashboard' || currentPage === '/search' || currentPage === '/profile') && (
            <nav className="hidden md:flex items-center space-x-6 mr-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* User Dropdown and Profile Image (no search icon on dashboard) */}
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {getProfileImage() ? (
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 p-1 bg-gray-200 rounded-full text-[#DC2626]" />
                )}
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {getProfileImage() ? (
                        <img
                          src={getProfileImage()}
                          alt="Profile"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-7 h-7 p-1 bg-gray-200 rounded-full text-[#DC2626]" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-xs text-gray-500 break-all max-w-[140px] truncate">{userInfo?.email || 'No email'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation (for dashboard, search, and profile pages) */}
        {(currentPage === '/dashboard' || currentPage === '/search' || currentPage === '/profile') && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="flex items-center justify-around">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex flex-col items-center space-y-0.5 px-2 py-1 rounded-md transition-colors ${
                      isActive
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[10px] sm:text-xs">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
