import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    setSending(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF3F3] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm disabled:opacity-60"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link to="/login" className="text-red-600 hover:text-red-500 font-semibold transition-colors">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
