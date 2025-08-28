import { useState, useEffect } from "react";
import { User, Search, TrendingUp } from "lucide-react";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [username, setUsername] = useState("User");
  const [profileViews, setProfileViews] = useState(0);
  const [profileViewHistory, setProfileViewHistory] = useState([]);
  const [viewChange, setViewChange] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const profileDoc = await getDoc(doc(db, "userProfileData", user.uid));
          if (profileDoc.exists()) {
            const profileData = profileDoc.data();
            if (profileData.personalInfo && profileData.personalInfo.firstName) {
              setUsername(profileData.personalInfo.firstName);
            } else if (profileData.username) {
              setUsername(profileData.username);
            }
            setProfileViews(profileData.profileViews || 0);
            setProfileViewHistory(profileData.profileViewHistory || []);
  useEffect(() => {
    // Calculate % change in views from last week
    if (!profileViewHistory.length) {
      setViewChange(0);
      return;
    }
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const lastWeekStart = now - oneWeek;
    const prevWeekStart = now - 2 * oneWeek;
    let lastWeek = 0;
    let prevWeek = 0;
    profileViewHistory.forEach((v) => {
      if (!v.timestamp) return;
      if (v.timestamp >= lastWeekStart) lastWeek++;
      else if (v.timestamp >= prevWeekStart && v.timestamp < lastWeekStart) prevWeek++;
    });
    if (prevWeek === 0 && lastWeek > 0) setViewChange(100);
    else if (prevWeek === 0 && lastWeek === 0) setViewChange(0);
    else setViewChange(Math.round(((lastWeek - prevWeek) / prevWeek) * 100));
  }, [profileViewHistory]);
            return;
          }
        }
      } catch (e) {
        // Ignore and fallback to localStorage
      }
      // Fallback: get from localStorage
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        try {
          const user = JSON.parse(loggedInUser);
          setUsername(user.username || "User");
        } catch {
          setUsername("User");
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedHeader />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Start exploring!
          </p>
        </div>

        {/* All Cards in One Responsive Row */}
        <div className="flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-4 sm:gap-6 w-full max-w-10xl mx-auto mb-8 pb-2">
          {/* Profile Views Card */}
          <div className="flex-1 w-full max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col justify-between mx-auto md:mx-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-medium text-sm sm:text-base">Profile Views</h3>
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{profileViews}</div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                {viewChange >= 0 ? '+' : ''}{viewChange}% from last week
              </div>
            </div>
          </div>
          {/* Find Matches Card */}
          <Link to="/search" className="flex-1 w-full max-w-lg mx-auto md:mx-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-between">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    Find Matches
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Discover profiles that match your preferences
                  </p>
                </div>
              </div>
            </div>
          </Link>
          {/* My Profile Card */}
          <Link to="/profile" className="flex-1 w-full max-w-lg mx-auto md:mx-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-between">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    My Profile
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    View and edit your profile information
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
