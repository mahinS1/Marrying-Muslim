import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
      <p className="mt-2 text-gray-600 text-base">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
