
 import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase/firebase';

const Signup = () => {

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  const [creatingAccount, setCreatingAccount] = useState(false);
  const navigate = useNavigate();
     

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validation function
  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCreatingAccount(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      // Store extra info in Realtime Database
      await set(ref(realtimeDb, 'users/' + user.uid), {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // Not recommended in production
        confirmPassword: formData.confirmPassword, // Not recommended in production
        createdAt: new Date().toISOString()
      });
  toast.success('Signup Successful!');
  // Store phone in localStorage for profile completion
  localStorage.setItem('signupPhone', formData.phone);
  setFormData({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
  navigate('/complete-profile');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email is already in use');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak');
      } else {
        toast.error(error.message);
      }
    } finally {
      setCreatingAccount(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center px-4 py-8 pb-16">
      <div className="w-full max-w-md">
        {/* Back to Home Link (top) */}
        <div className="mb-4 mt-2">
          <Link to='/' className="flex items-center text-gray-600 hover:text-gray-800 text-sm transition-colors w-fit">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back To Home
          </Link>
        </div>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-row items-center gap-2 mb-4 justify-center">
            <div className=" rounded-full p-2 overflow-hidden">
              <img src={logo} alt="Heart MM Logo" className="w-16 h-16 object-contain" />
            </div>
            <div className='text-left'>
              <h1 className="lg:text-4xl text-2xl font-bold text-[#DC2626]">Marrying Muslims</h1>
              <p className="text-sm  text-gray-600">Marriage The Halal Way</p>
            </div>
          </div>
          {/* <p className="text-gray-600 text-sm text-center">Begin your journey to find your perfect match</p> */}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600 text-sm">Join our community and find your soulmate</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6 disabled:opacity-60"
              disabled={creatingAccount}
            >
              {creatingAccount ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to='/login' className="text-red-600 hover:text-red-700 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

  {/* Extra bottom space for mobile usability */}
  <div className="h-8 sm:h-12" />
      </div>
    </div>

   
  )
}

export default Signup
