import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { X, MapPin, Building, GraduationCap, Heart, User, Clock, Calendar, Baby, Home, Users } from 'lucide-react';
// Accept userId and onClose as props for modal usage
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    aboutMe: string;
  };
  familyBackground: {
    country: string;
    city: string;
    maritalStatus: string;
    motherTongue: string;
    wantChildren: string;
    languagesKnown: string;
  };
  careerEducation: {
    education: string;
    occupation: string;
    income: string;
    employmentStatus: string;
  };
  religiousInfo: {
    sunniMuslim: string;
    prayerFrequency: string;
    hijab: string;
  };
}

interface ViewProfileProps {
  userId: string;
  onClose?: () => void;
}

function ViewProfile({ userId, onClose }: ViewProfileProps) {
  function getSunniLabel(val?: string) {
    if (!val) return 'Muslim';
    if (val.toLowerCase() === 'yes-sunni' || val.toLowerCase() === 'yes sunni') return 'Sunni';
    return val;
  }
  const [activeTab, setActiveTab] = useState('About');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let incremented = false;
    const fetchProfileData = async () => {
      try {
        const profileDoc = await getDoc(doc(db, 'userProfileData', userId));
        if (profileDoc.exists()) {
          setProfileData(profileDoc.data() as ProfileData);
          if (!incremented) {
            const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
            if (currentUser?.uid !== userId) {
              await updateDoc(doc(db, 'userProfileData', userId), {
                profileViews: increment(1),
                profileViewHistory: [
                  ...(profileDoc.data().profileViewHistory || []),
                  { timestamp: Date.now(), viewerId: currentUser?.uid || null }
                ]
              });
              incremented = true;
            }
          }
        } else {
          toast.error('Profile not found');
          if (onClose) onClose();
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        if (onClose) onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userId]);


  const closeModal = () => {
    if (onClose) onClose();
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birth = new Date(dateOfBirth);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
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

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl">Profile not found</div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Modal Overlay */}
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40" style={{backdropFilter: 'blur(1px)'}} onClick={closeModal}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl z-50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-red-600">Profile Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Profile Image */}
          <div className="lg:w-1/3 p-6 flex justify-center items-start">
            <div className="bg-gray-200 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center text-gray-400 overflow-hidden">
              {getProfileImage() ? (
                <img
                  src={getProfileImage() || undefined}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <User size={48} className="mx-auto mb-2" />
                  <p className="text-xs">Profile Image</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Profile Info */}
          <div className="lg:w-2/3 p-6">
            {/* Profile Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {profileData.personalInfo?.firstName} {profileData.personalInfo?.lastName}
                </h3>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
                  {getSunniLabel(profileData.religiousInfo?.sunniMuslim)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {calculateAge(profileData.personalInfo?.dateOfBirth)} years old
              </p>
              
              {/* Profile Icons */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <MapPin size={16} className="text-red-500 mr-2" />
                  <span>
                    {profileData.familyBackground?.city && profileData.familyBackground?.country
                      ? `${profileData.familyBackground.city}, ${profileData.familyBackground.country}`
                      : 'Location not provided'
                    }
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Building size={16} className="text-red-500 mr-2" />
                  <span>{profileData.careerEducation?.occupation || 'Not provided'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <GraduationCap size={16} className="text-red-500 mr-2" />
                  <span>{profileData.careerEducation?.education || 'Not provided'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Heart size={16} className="text-red-500 mr-2" />
                  <span>{profileData.familyBackground?.maritalStatus || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-between border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
              {['About', 'Preferences', 'Lifestyle'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6 text-xs sm:text-base">
              {/* About Tab */}
              {activeTab === 'About' && (
                <>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">About Me</h4>
                    <p className="text-gray-700">{profileData.personalInfo?.aboutMe || 'No description provided'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{calculateAge(profileData.personalInfo?.dateOfBirth)} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">
                          {profileData.familyBackground?.city && profileData.familyBackground?.country
                            ? `${profileData.familyBackground.city}, ${profileData.familyBackground.country}`
                            : 'Not provided'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marital Status:</span>
                        <span className="font-medium">{profileData.familyBackground?.maritalStatus || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Religion:</span>
                        <span className="font-medium">{getSunniLabel(profileData.religiousInfo?.sunniMuslim) || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{profileData.personalInfo?.gender || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mother Tongue:</span>
                        <span className="font-medium">{profileData.familyBackground?.motherTongue || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Preferences Tab */}
              {activeTab === 'Preferences' && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Looking For</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Want Children:</span>
                      <span className="font-medium">{profileData.familyBackground?.wantChildren || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages Known:</span>
                      <span className="font-medium">{profileData.familyBackground?.languagesKnown || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Education Preference:</span>
                      <span className="font-medium">{profileData.careerEducation?.education || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Religious Practice:</span>
                      <span className="font-medium">{profileData.religiousInfo?.prayerFrequency || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lifestyle Tab */}
              {activeTab === 'Lifestyle' && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Lifestyle & Values</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prayer:</span>
                      <span className="font-medium">{profileData.religiousInfo?.prayerFrequency || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hijab:</span>
                      <span className="font-medium">{profileData.religiousInfo?.hijab || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Education:</span>
                      <span className="font-medium">{profileData.careerEducation?.education || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Occupation:</span>
                      <span className="font-medium">{profileData.careerEducation?.occupation || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employment Status:</span>
                      <span className="font-medium">{profileData.careerEducation?.employmentStatus || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income Range:</span>
                      <span className="font-medium">{profileData.careerEducation?.income || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewProfile;