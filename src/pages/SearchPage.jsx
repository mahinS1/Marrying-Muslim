import LiveProfilePreview from '../components/LiveProfilePreview';
import React, { useState, useEffect } from "react";
import { countriesList } from '../utils/countries';

// Capitalize each word in a string
function capitalizeWords(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// Capitalize all options in an array
function capitalizeOptions(arr) {
  return arr.map(opt => capitalizeWords(opt));
}
import LoadingSpinner from '../components/LoadingSpinner';
import ViewProfile from './ViewProfile';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Grid,
  List,
  ChevronDown,
  Camera,
  MapPin,
  GraduationCap,
  Heart,
  User,
  Bell,
  ArrowDownCircle,
} from "lucide-react";
import { auth, db, realtimeDb } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { toast } from 'react-toastify';
import AuthenticatedHeader from '../components/AuthenticatedHeader';




const maritalStatuses = capitalizeOptions(["All Status", "Never Married", "Divorced", "Widowed"]);
const educationLevels = capitalizeOptions([
  "All Education Levels",
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Other"
]);
const professions = capitalizeOptions([
  "All Professions",
  "Engineer",
  "Doctor",
  "Teacher",
  "Manager",
  "Nurse",
  "Architect",
  "Software Engineer",
  "Business Analyst",
  "Consultant",
]);

const getInitialProfilesToShow = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 1024) {
      // Mobile/tablet
      return 10;
    }
  }
  // Desktop
  return 15;
};

const SearchPage = () => {
  // Dynamically set countries: only show UK if any profile is from the UK
  // Only show countries where at least one profile exists
  const [countries, setCountries] = useState(["All Countries"]);
  const [profilesToShow, setProfilesToShow] = useState(getInitialProfilesToShow());
  // Update profilesToShow on resize (responsive)
  useEffect(() => {
    const handleResize = () => {
      setProfilesToShow(getInitialProfilesToShow());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(true);
  const [viewProfileId, setViewProfileId] = useState(null);
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("All Status");
  const [selectedEducation, setSelectedEducation] = useState("All Education Levels");
  const [selectedProfession, setSelectedProfession] = useState("All Professions");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  // Removed onlineStatuses state
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  // Get current user ID on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const sortOptions = capitalizeOptions([
    "Newest First",
    "Age: Low to High",
    "Age: High to Low",
    "Name: A to Z",
  ]);

  // Fetch all user profiles from Firestore and set available countries
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const profilesCollection = collection(db, 'userProfileData');
        const profilesSnapshot = await getDocs(profilesCollection);
        const profilesData = [];
        const countrySet = new Set();
        profilesSnapshot.forEach((doc) => {
          const data = doc.data();
          let age = 25;
          if (data.personalInfo?.dateOfBirth) {
            try {
              const birthDate = new Date(data.personalInfo.dateOfBirth);
              const today = new Date();
              if (!isNaN(birthDate.getTime()) && birthDate < today) {
                age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                if (age < 18 || age > 100) {
                  age = 25;
                }
              }
            } catch (error) {
              age = 25;
            }
          }
          const country = data.familyBackground?.country;
          if (country) {
            countrySet.add(capitalizeWords(country));
          }
          const profileData = {
            id: doc.id,
            name: data.personalInfo ? `${data.personalInfo.firstName || ''} ${data.personalInfo.lastName || ''}`.trim() || 'Anonymous' : 'Anonymous',
            age: age,
            maritalStatus: data.familyBackground?.maritalStatus || 'Not specified',
            location: data.familyBackground ? `${data.familyBackground.city || ''}, ${data.familyBackground.country || ''}`.trim() || 'Location not specified' : 'Location not specified',
            education: data.careerEducation?.education || 'Not specified',
            profession: data.careerEducation?.occupation || 'Not specified',
            aboutMe: data.personalInfo?.aboutMe || '',
            gender: data.personalInfo?.gender || 'Not specified',
            expectations: data.personalInfo?.expectations || '',
            healthConditions: data.personalInfo?.healthConditions || '',
            createdAt: data.profileCompletedAt || data.createdAt || new Date().toISOString(),
            personalInfo: data.personalInfo || {},
            familyBackground: data.familyBackground || {},
            careerEducation: data.careerEducation || {},
            religiousInfo: data.religiousInfo || {}
          };
          profilesData.push(profileData);
        });
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);
        // Set countries dropdown to only those with profiles
        setCountries(["All Countries", ...Array.from(countrySet).sort()]);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profiles: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Debug function to check all collections
  const debugCollections = async () => {
    try {
      console.log('=== DEBUGGING COLLECTIONS ===');
      
      // Check userProfileData collection
      const userProfileCollection = collection(db, 'userProfileData');
      const userProfileSnapshot = await getDocs(userProfileCollection);
      console.log('userProfileData collection size:', userProfileSnapshot.size);
      
      // Check if there's a 'users' collection
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        console.log('users collection size:', usersSnapshot.size);
      } catch (e) {
        console.log('users collection does not exist or is not accessible');
      }
      
      // Check if there's a 'profiles' collection
      try {
        const profilesCollection = collection(db, 'profiles');
        const profilesSnapshot = await getDocs(profilesCollection);
        console.log('profiles collection size:', profilesSnapshot.size);
      } catch (e) {
        console.log('profiles collection does not exist or is not accessible');
      }
      
      console.log('=== END DEBUGGING ===');
    } catch (error) {
      console.error('Error debugging collections:', error);
    }
  };

  // Call debug function on mount
  useEffect(() => {
    debugCollections();
  }, []);

  // Filter profiles based on search criteria
  useEffect(() => {
    let filtered = [...profiles];
    // Remove current user's own profile from search results
    if (currentUserId) {
      filtered = filtered.filter(profile => profile.id !== currentUserId);
    }
    console.log('Starting with profiles:', filtered.length);

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(query) ||
        profile.location.toLowerCase().includes(query) ||
        profile.profession.toLowerCase().includes(query) ||
        profile.education.toLowerCase().includes(query)
      );
      console.log('After search query filter:', filtered.length);
    }

    // Age range filter
    filtered = filtered.filter(profile => 
      profile.age >= ageRange[0] && profile.age <= ageRange[1]
    );
    console.log('After age range filter:', filtered.length);

    // Country filter
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(profile => 
        profile.location.toLowerCase().includes(selectedCountry.toLowerCase())
      );
      console.log('After country filter:', filtered.length);
    }

    // Marital status filter
    if (selectedMaritalStatus !== "All Status") {
      filtered = filtered.filter(profile => 
        profile.maritalStatus.toLowerCase() === selectedMaritalStatus.toLowerCase()
      );
      console.log('After marital status filter:', filtered.length);
    }

    // Education filter
    if (selectedEducation !== "All Education Levels") {
      filtered = filtered.filter(profile => 
        profile.education.toLowerCase().includes(selectedEducation.toLowerCase())
      );
      console.log('After education filter:', filtered.length);
    }

    // Profession filter
    if (selectedProfession !== "All Professions") {
      filtered = filtered.filter(profile => 
        profile.profession.toLowerCase().includes(selectedProfession.toLowerCase())
      );
      console.log('After profession filter:', filtered.length);
    }

    // Sort profiles
    switch (sortBy) {
      case "Age: Low to High":
        filtered.sort((a, b) => a.age - b.age);
        break;
      case "Age: High to Low":
        filtered.sort((a, b) => b.age - a.age);
        break;
      case "Name: A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
  // Removed Online First sort
      case "Newest First":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    console.log('Final filtered profiles:', filtered.length);
    console.log('Filtered profiles:', filtered);
    setFilteredProfiles(filtered);
  }, [profiles, searchQuery, ageRange, selectedCountry, selectedMaritalStatus, selectedEducation, selectedProfession, sortBy]);

  // Removed online status effect

  const clearAllFilters = () => {
    setSearchQuery("");
    setAgeRange([18, 50]);
    setSelectedCountry("All Countries");
    setSelectedMaritalStatus("All Status");
    setSelectedEducation("All Education Levels");
    setSelectedProfession("All Professions");
  };

  const getMaritalStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
      case "never married":
        return "Never Married";
      case "divorced":
        return "Divorced";
      case "widowed":
        return "Widowed";
      default:
        return status;
    }
  };

  const getEducationDisplay = (education) => {
    switch (education.toLowerCase()) {
      case "bachelor's degree":
        return "Bachelor's Degree";
      case "master's degree":
        return "Master's Degree";
      case "high school":
        return "High School";
      case "diploma":
        return "Diploma";
      case "phd":
        return "PhD";
      default:
        return education;
    }
  };

  const getProfileImageByGender = (gender) => {
    if (gender === 'Male') {
      return '/images/man.jpg';
    } else if (gender === 'Female') {
      return '/images/woman.png';
    }
    return null;
  };

  const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative flex justify-center pt-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
          {getProfileImageByGender(profile.gender) ? (
            <img
              src={getProfileImageByGender(profile.gender)}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
        </div>
        {/* Removed online/offline status indicator */}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.age} years old</p>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span>{getMaritalStatusDisplay(profile.maritalStatus)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
            <span>{getEducationDisplay(profile.education)}</span>
          </div>
        </div>

        <button 
          onClick={() => setViewProfileId(profile.id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium transition-colors"
        >
          <User className="w-4 h-4 inline mr-2" />
          View Profile
        </button>
      </div>
    </div>
  );

  const ProfileListItem = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
          {getProfileImageByGender(profile.gender) ? (
            <img
              src={getProfileImageByGender(profile.gender)}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-6 h-6 text-gray-400" />
          )}
        </div>
  {/* Removed online/offline status indicator */}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.age} years old</p>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex space-x-4 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1 text-gray-400" />
            <span>{getMaritalStatusDisplay(profile.maritalStatus)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
            <span>{getEducationDisplay(profile.education)}</span>
          </div>
        </div>

        <button 
          onClick={() => setViewProfileId(profile.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded font-medium transition-colors"
        >
          <User className="w-4 h-4 inline mr-2" />
          View Profile
        </button>
      </div>
    </div>

  );

  const Dropdown = ({
    value,
    options,
    onChange,
    placeholder,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading profiles..." />;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <AuthenticatedHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Filters */}
            <div className="w-full md:w-80 flex-shrink-0 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Search Filters
                  </h2>
                  <button 
                    onClick={clearAllFilters}
                    className="text-red-500 text-sm hover:text-red-600" 
                    type="button"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search by name, location, or education
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search profiles..."
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range: {ageRange[0]} - {ageRange[1]} years
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={ageRange[1]}
                      onChange={(e) =>
                        setAgeRange([ageRange[0], parseInt(e.target.value, 10)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Dropdown
                      value={selectedCountry}
                      options={countries}
                      onChange={setSelectedCountry}
                      placeholder="Select Country"
                    />
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marital Status
                    </label>
                    <Dropdown
                      value={selectedMaritalStatus}
                      options={maritalStatuses}
                      onChange={setSelectedMaritalStatus}
                      placeholder="Select Marital Status"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education
                    </label>
                    <Dropdown
                      value={selectedEducation}
                      options={educationLevels}
                      onChange={setSelectedEducation}
                      placeholder="Select Education"
                    />
                  </div>

                  {/* Show My Profile Button and Card */}
                  {currentUserId && profiles.length > 0 && (
                    <LiveProfilePreview
                      profiles={profiles}
                      currentUserId={currentUserId}
                    />
                  )}
                  {/* Profession filter removed */}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight sm:leading-snug">
                    Search Profiles
                  </h2>
                  <p className="text-xs sm:text-base text-gray-600 mt-1 sm:mt-2">
                    Found {filteredProfiles.length} profiles matching your criteria
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Layout Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setIsGridView(true)}
                      className={`p-2 rounded ${
                        isGridView
                          ? "bg-red-500 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGridView(false)}
                      className={`p-2 rounded ${
                        !isGridView
                          ? "bg-red-500 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <Dropdown
                    value={sortBy}
                    options={sortOptions}
                    onChange={setSortBy}
                    placeholder="Sort by"
                  />
                </div>
              </div>

              {/* Profiles Grid/List */}
              {filteredProfiles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              ) : isGridView ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles.slice(0, profilesToShow).map((profile) => (
                      <ProfileCard key={profile.id} profile={profile} />
                    ))}
                  </div>
                  {profilesToShow < filteredProfiles.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors font-semibold flex items-center gap-2"
                        onClick={() => setProfilesToShow((prev) => prev + getInitialProfilesToShow())}
                      >
                        <ArrowDownCircle className="w-5 h-5" />
                        See More Profiles
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    {filteredProfiles.slice(0, profilesToShow).map((profile) => (
                      <ProfileListItem key={profile.id} profile={profile} />
                    ))}
                  </div>
                  {profilesToShow < filteredProfiles.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors font-semibold"
                        onClick={() => setProfilesToShow((prev) => prev + getInitialProfilesToShow())}
                      >
                        See More Profiles
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Show My Profile Button and Card removed from under cards; only in sidebar */}
            </div>
          </div>
        </div>
      </div>
      {/* Modal Overlay for ViewProfile */}
      {viewProfileId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setViewProfileId(null)} />
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <ViewProfile userId={viewProfileId} onClose={() => setViewProfileId(null)} />
          </div>
        </div>
      )}
    </>
  );
}

export default SearchPage;