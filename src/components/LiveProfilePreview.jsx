import React, { useState, useEffect } from "react";
import ViewProfile from '../pages/ViewProfile';

const LiveProfilePreview = ({ profiles, currentUserId }) => {
  const [show, setShow] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    const found = profiles.find((p) => p.id === currentUserId);
    setMyProfile(found || null);
  }, [profiles, currentUserId]);

  return (
    <div className="flex flex-col items-center mt-8">
      <button
        className="bg-[#DC2626] hover:bg-[]#DC2626 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm mb-4"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? "Hide My Profile" : "Show My Profile"}
      </button>
      {show && myProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShow(false)} />
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh] p-0 sm:p-0">
            <ViewProfile userId={myProfile.id} onClose={() => setShow(false)} />
          </div>
        </div>
      )}
      {show && !myProfile && (
        <div className="text-gray-500 text-center">No profile found for your account.</div>
      )}
    </div>
  );
};

export default LiveProfilePreview;
