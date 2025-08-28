import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Edit3,
  Eye,
  EyeOff,
  ChevronDown,
  Save,
  Check,
} from "lucide-react";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import { auth, db, realtimeDb } from "../firebase/firebase";
import { ref as dbRef, onValue, get as dbGet } from "firebase/database";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TAB_TYPES = ["Personal", "Preferences", "Career", "Privacy"];

const Profile = () => {
  const [onlineStatus, setOnlineStatus] = useState("offline");
  // Helper to get default profile image based on gender
  function getProfileImage() {
    const gender = profileData?.personalInfo?.gender?.toLowerCase();
    if (gender === "male") return "/images/man.jpg";
    if (gender === "female") return "/images/woman.png";
    return null;
  }
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Personal");
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState(
    "Public - Visible to all users"
  );
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [phoneFromRealtime, setPhoneFromRealtime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [editingTab, setEditingTab] = useState("");

  useEffect(() => {
    // Listen for online status
    const user = auth.currentUser;
    let unsubscribeStatus;
    if (user) {
      const statusRef = dbRef(realtimeDb, "/status/" + user.uid);
      unsubscribeStatus = onValue(statusRef, (snap) => {
        setOnlineStatus(snap.val()?.state || "offline");
      });
    }
    const fetchProfileData = async () => {
      try {
        // Get current authenticated user
        const user = auth.currentUser;
        if (user) {
          setUserInfo({ email: user.email, phone: user.phoneNumber });
          // Fetch profile data from Firestore
          const profileDoc = await getDoc(doc(db, "userProfileData", user.uid));
          if (profileDoc.exists()) {
            const data = profileDoc.data();
            setProfileData(data);
            // If phone is missing in Firestore, try to get from Realtime DB
            if (!data.personalInfo?.phone) {
              try {
                const snap = await dbGet(
                  dbRef(realtimeDb, "users/" + user.uid + "/phone")
                );
                if (snap.exists()) setPhoneFromRealtime(snap.val());
              } catch (e) {}
            }
            // Load privacy settings if present
            if (data.profileSettings) {
              setShowOnlineStatus(
                data.profileSettings.showOnlineStatus !== false
              ); // default true
              setSelectedVisibility(
                data.profileSettings.visibility ||
                  "Public - Visible to all users"
              );
            } else {
              setShowOnlineStatus(true);
              setSelectedVisibility("Public - Visible to all users");
            }
          } else {
            console.log("No profile data found");
            toast.info("Please complete your profile first");
            navigate("/complete-profile");
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    return () => {
      if (unsubscribeStatus) unsubscribeStatus();
    };
  }, [navigate]);

  const renderTabContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading profile..." />;
    }

    // Online status dot (only show if enabled)
    const statusDot = showOnlineStatus ? (
      <span
        className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
        style={{
          backgroundColor: onlineStatus === "online" ? "#22c55e" : "#d1d5db",
          border: "1px solid #888",
        }}
        title={onlineStatus === "online" ? "Online" : "Offline"}
      />
    ) : null;

    switch (activeTab) {
      case "Personal":
        return (
          <div className="p-6 text-xs sm:text-base">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your basic profile information
                </p>
              </div>
              {!isEditing || editingTab !== "Personal" ? (
                <button
                  onClick={() => handleEdit("Personal")}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Match the PersonalInfoStep order and format */}
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <input
                    type="text"
                    value={editFormData.firstName || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.firstName || "Not provided"}
                  </div>
                )}
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <input
                    type="text"
                    value={editFormData.lastName || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.lastName || "Not provided"}
                  </div>
                )}
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <input
                    type="date"
                    value={editFormData.dateOfBirth || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.dateOfBirth || "Not provided"}
                  </div>
                )}
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <select
                    value={editFormData.gender || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        gender: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.gender || "Not provided"}
                  </div>
                )}
              </div>
              {/* Email (not editable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="text-gray-900">
                  {userInfo?.email || "Not provided"}
                </div>
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <input
                    type="text"
                    value={editFormData.phone || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.phone ||
                      phoneFromRealtime ||
                      userInfo?.phone ||
                      ""}
                  </div>
                )}
              </div>
              {/* About Me */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <textarea
                    value={editFormData.aboutMe || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        aboutMe: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900 capitalize">
                    {profileData?.personalInfo?.aboutMe || "Not provided"}
                  </div>
                )}
              </div>
              {/* Health Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Conditions
                </label>
                {isEditing && editingTab === "Personal" ? (
                  <textarea
                    value={editFormData.healthConditions || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        healthConditions: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.healthConditions ||
                      "Not provided"}
                  </div>
                )}
              </div>
              {/* Religious Practice (not editable here) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religious Practice
                </label>
                <div className="text-gray-900">
                  {profileData?.religiousInfo?.sunniMuslim || "Not specified"}
                </div>
              </div>
              {/* Prayer Frequency (not editable here) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Frequency
                </label>
                <div className="text-gray-900">
                  {profileData?.religiousInfo?.prayerFrequency ||
                    "Not specified"}
                </div>
              </div>
              {/* Mother Tongue (not editable here) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mother Tongue
                </label>
                <div className="text-gray-900">
                  {profileData?.familyBackground?.motherTongue ||
                    "Not provided"}
                </div>
              </div>
            </div>
          </div>
        );

      case "Preferences":
        return (
          <div className="p-6 text-xs sm:text-base">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {" "}
                  Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Set your preferences for potential matches
                </p>
              </div>
              {!isEditing || editingTab !== "Preferences" ? (
                <button
                  onClick={() => handleEdit("Preferences")}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expectations
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <textarea
                    value={editFormData.expectations || ""}
                    onChange={(e) =>
                      handleInputChange("expectations", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.personalInfo?.expectations || "Not specified"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status Preference
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <select
                    value={editFormData.maritalStatusPreference || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "maritalStatusPreference",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Any</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.familyBackground?.maritalStatus != null &&
                    profileData?.familyBackground?.maritalStatus !== ""
                      ? profileData?.familyBackground?.maritalStatus
                      : "Any"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Want Children
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <select
                    value={editFormData.wantChildren || ""}
                    onChange={(e) =>
                      handleInputChange("wantChildren", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Not specified</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Open to discussion">
                      Open to discussion
                    </option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.familyBackground?.wantChildren ||
                      "Not specified"}
                  </div>
                )}
              </div>

              <div>
                <label className="block capitalize text-sm font-medium text-gray-700 mb-2">
                  Nationality Preference
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <input
                    type="text"
                    value={editFormData.nationality || ""}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 capitalize"
                  />
                ) : (
                  <div className="text-gray-900 capitalize">
                    {profileData?.familyBackground?.nationality !=
                      null &&
                    profileData?.familyBackground?.nationality !== ""
                      ? profileData?.familyBackground?.nationality
                      : "Any"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Known
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <input
                    type="text"
                    value={editFormData.languagesKnown || ""}
                    onChange={(e) =>
                      handleInputChange("languagesKnown", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900 capitalize">
                    {profileData?.familyBackground?.languagesKnown ||
                      "Not specified"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religious Practice
                </label>
                {isEditing && editingTab === "Preferences" ? (
                  <select
                    value={editFormData.religiousPracticePreference || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "religiousPracticePreference",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Not specified</option>
                    <option value="Very religious">Very religious</option>
                    <option value="Moderately religious">
                      Moderately religious
                    </option>
                    <option value="Somewhat religious">
                      Somewhat religious
                    </option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.religiousInfo?.sunniMuslim !=
                      null &&
                    profileData?.religiousInfo?.sunniMuslim !==
                      ""
                      ? profileData?.religiousInfo?.sunniMuslim
                      : "Not specified"}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "Career":
        return (
          <div className="p-6 text-xs sm:text-base">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Career Information
                </h2>
                <p className="text-sm text-gray-500">
                  Your professional background and career details
                </p>
              </div>
              {!isEditing || editingTab !== "Career" ? (
                <button
                  onClick={() => handleEdit("Career")}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                {isEditing && editingTab === "Career" ? (
                  <select
                    value={editFormData.education || ""}
                    onChange={(e) =>
                      handleInputChange("education", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.careerEducation?.education || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                {isEditing && editingTab === "Career" ? (
                  <input
                    type="text"
                    value={editFormData.occupation || ""}
                    onChange={(e) =>
                      handleInputChange("occupation", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <div className="text-gray-900">
                    {profileData?.careerEducation?.occupation || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income Range
                </label>
                {isEditing && editingTab === "Career" ? (
                  <select
                    value={editFormData.income || ""}
                    onChange={(e) =>
                      handleInputChange("income", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select income range</option>
                    <option value="Under $25,000">Under $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                    <option value="$75,000 - $100,000">
                      $75,000 - $100,000
                    </option>
                    <option value="$100,000 - $150,000">
                      $100,000 - $150,000
                    </option>
                    <option value="Over $150,000">Over $150,000</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="text-gray-900">
                    {profileData?.careerEducation?.income || "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "Privacy":
        return (
          <div className="p-6 text-xs sm:text-base">
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Privacy Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Control who can see your information
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Removed 'Show Last Seen' privacy option */}

              <div className="py-4">
                <h3 className="text-base font-medium text-gray-900 mb-3">
                  Profile Visibility
                </h3>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      setShowVisibilityDropdown(!showVisibilityDropdown)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="text-gray-900">
                        {selectedVisibility}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        showVisibilityDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showVisibilityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div
                        onClick={() => {
                          setSelectedVisibility(
                            "Public - Visible to all users"
                          );
                          setShowVisibilityDropdown(false);
                        }}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <Check
                          className={`w-4 h-4 mr-3 ${
                            selectedVisibility ===
                            "Public - Visible to all users"
                              ? "text-red-500"
                              : "text-transparent"
                          }`}
                        />
                        <Eye className="w-5 h-5 mr-3 text-gray-400" />
                        <span className="text-gray-900">
                          Public - Visible to all users
                        </span>
                      </div>
                      <div
                        onClick={() => {
                          setSelectedVisibility(
                            "Private - Only visible to matched users"
                          );
                          setShowVisibilityDropdown(false);
                        }}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100"
                      >
                        <Check
                          className={`w-4 h-4 mr-3 ${
                            selectedVisibility ===
                            "Private - Only visible to matched users"
                              ? "text-red-500"
                              : "text-transparent"
                          }`}
                        />
                        <EyeOff className="w-5 h-5 mr-3 text-gray-400" />
                        <span className="text-gray-900">
                          Private - Not visible to users
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={async () => {
                    setSaving(true);
                    try {
                      const user = auth.currentUser;
                      if (user) {
                        await updateDoc(doc(db, "userProfileData", user.uid), {
                          profileSettings: {
                            showOnlineStatus,
                            visibility: selectedVisibility,
                          },
                        });
                        toast.success("Privacy settings saved!");
                      }
                    } catch (err) {
                      toast.error("Failed to save privacy settings");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Privacy Settings"}</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleEdit = (tab) => {
    setEditingTab(tab);

    if (tab === "Personal") {
      setEditFormData({
        firstName: profileData?.personalInfo?.firstName || "",
        lastName: profileData?.personalInfo?.lastName || "",
        dateOfBirth: profileData?.personalInfo?.dateOfBirth || "",
        gender: profileData?.personalInfo?.gender || "",
        aboutMe: profileData?.personalInfo?.aboutMe || "",
        expectations: profileData?.personalInfo?.expectations || "",
        healthConditions: profileData?.personalInfo?.healthConditions || "",
        phone: profileData?.personalInfo?.phone || userInfo?.phone || "",
        country: profileData?.familyBackground?.country || "",
        city: profileData?.familyBackground?.city || "",
        maritalStatus: profileData?.familyBackground?.maritalStatus || "",
      });
    } else if (tab === "Preferences") {
      setEditFormData({
        expectations: profileData?.personalInfo?.expectations || "",
        maritalStatusPreference:
          profileData?.familyBackground?.maritalStatusPreference || "",
        wantChildren: profileData?.familyBackground?.wantChildren || "",
        nationalityPreference:
          profileData?.familyBackground?.nationalityPreference || "",
        languagesKnown: profileData?.familyBackground?.languagesKnown || "",
        religiousPracticePreference:
          profileData?.religiousInfo?.religiousPracticePreference || "",
      });
    } else if (tab === "Career") {
      setEditFormData({
        education: profileData?.careerEducation?.education || "",
        occupation: profileData?.careerEducation?.occupation || "",
        income: profileData?.careerEducation?.income || "",
        employmentStatus: profileData?.careerEducation?.employmentStatus || "",
      });
    }

    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditFormData({});
    setEditingTab("");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("No authenticated user found.");
        return;
      }

      // DOB validation (only when editing personal info)
      if (editingTab === "Personal") {
        const dob = editFormData.dateOfBirth;
        if (!dob) {
          toast.error("Date of Birth is required.");
          setSaving(false);
          return;
        }
        // Parse as yyyy-mm-dd to avoid Date quirks
        const dobParts = dob.split("-");
        if (dobParts.length !== 3) {
          toast.error("Invalid Date of Birth format.");
          setSaving(false);
          return;
        }
        const year = parseInt(dobParts[0], 10);
        const month = parseInt(dobParts[1], 10) - 1;
        const day = parseInt(dobParts[2], 10);
        const dobDate = new Date(year, month, day);
        const now = new Date();
        const minYear = 1900;
        const minAge = 18;
        if (
          isNaN(dobDate.getTime()) ||
          year < minYear ||
          year > now.getFullYear()
        ) {
          toast.error(
            "Date of Birth year must be between 1900 and current year."
          );
          setSaving(false);
          return;
        }
        if (dobDate > now) {
          toast.error("Date of Birth cannot be in the future.");
          setSaving(false);
          return;
        }
        // Check age
        let age = now.getFullYear() - year;
        const m = now.getMonth() - month;
        if (m < 0 || (m === 0 && now.getDate() < day)) {
          age--;
        }
        if (age < minAge) {
          toast.error("You must be at least 18 years old.");
          setSaving(false);
          return;
        }
      }

      let updatedProfileData = { ...profileData };

      if (editingTab === "Personal") {
        updatedProfileData = {
          ...profileData,
          personalInfo: {
            ...profileData.personalInfo,
            firstName: editFormData.firstName,
            lastName: editFormData.lastName,
            dateOfBirth: editFormData.dateOfBirth,
            gender: editFormData.gender,
            aboutMe: editFormData.aboutMe,
            expectations: editFormData.expectations,
            healthConditions: editFormData.healthConditions,
            phone: editFormData.phone,
          },
          familyBackground: {
            ...profileData.familyBackground,
            country: editFormData.country,
            city: editFormData.city,
            maritalStatus: editFormData.maritalStatus,
          },
        };
      } else if (editingTab === "Preferences") {
        updatedProfileData = {
          ...profileData,
          personalInfo: {
            ...profileData.personalInfo,
            expectations: editFormData.expectations,
          },
          familyBackground: {
            ...profileData.familyBackground,
            maritalStatusPreference: editFormData.maritalStatusPreference,
            wantChildren: editFormData.wantChildren,
            nationalityPreference: editFormData.nationalityPreference,
            languagesKnown: editFormData.languagesKnown,
          },
          religiousInfo: {
            ...profileData.religiousInfo,
            religiousPracticePreference:
              editFormData.religiousPracticePreference,
          },
        };
      } else if (editingTab === "Career") {
        updatedProfileData = {
          ...profileData,
          careerEducation: {
            ...profileData.careerEducation,
            education: editFormData.education,
            occupation: editFormData.occupation,
            income: editFormData.income,
            employmentStatus: editFormData.employmentStatus,
          },
        };
      }

      await updateDoc(doc(db, "userProfileData", user.uid), updatedProfileData);
      setProfileData(updatedProfileData);
      setIsEditing(false);
      setEditFormData({});
      setEditingTab("");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <AuthenticatedHeader />
      <div
        className="min-h-screen bg-gray-50 py-8 px-4"
        onClick={() => setShowVisibilityDropdown(false)}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {loading ? (
              <LoadingSpinner message="Loading profile..." />
            ) : (
              <div className="flex flex-col xs:flex-row items-center xs:items-start xs:space-x-6 gap-4 xs:gap-0">
                {/* Profile Image */}
                <div className="flex flex-col items-center w-24">
                  <span className="mb-1 text-xl font-bold text-[#DC2626] tracking-wide">
                    Profile
                  </span>
                  <div className="w-24 h-24  rounded-full flex-shrink-0 relative overflow-hidden mb-4 xs:mb-0">
                    {getProfileImage() ? (
                      <img
                        src={getProfileImage()}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-full h-full text-white"
                        >
                          <path
                            d="M50 10 C35 10 25 25 25 40 C25 50 30 58 38 62 L38 70 C38 80 42 85 50 85 C58 85 62 80 62 70 L62 62 C70 58 75 50 75 40 C75 25 65 10 50 10 Z"
                            fill="currentColor"
                            opacity="0.6"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {/* Profile Info */}
                <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                        {profileData?.personalInfo?.firstName}{" "}
                        {profileData?.personalInfo?.lastName || "User"}
                      </h1>
                      <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                        {profileData?.personalInfo?.dateOfBirth
                          ? `${
                              new Date().getFullYear() -
                              new Date(
                                profileData?.personalInfo?.dateOfBirth
                              ).getFullYear()
                            } years old`
                          : "Age not provided"}
                      </p>
                      <div className="flex items-center text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        <span>
                          {profileData?.familyBackground?.city &&
                          profileData?.familyBackground?.country
                            ? `${profileData?.familyBackground?.city}, ${profileData?.familyBackground?.country}`
                            : "Location not provided"}
                        </span>
                      </div>
                    </div>
                    {/* Status Badges */}
                    <div className="flex flex-row sm:flex-col items-end sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                      <span className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded-full">
                        {profileData?.personalInfo?.gender || "Not specified"}
                      </span>
                      <span className="px-3 py-1 text-xs text-gray-700">
                        {profileData?.familyBackground?.maritalStatus ||
                          "Not specified"}
                      </span>
                    </div>
                  </div>
                  {/* Additional Info Icons */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 mt-2">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-red-500" />
                      <span>
                        {profileData?.careerEducation?.occupation ||
                          "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-red-500" />
                      <span>
                        {profileData?.careerEducation?.education ||
                          "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div
              className="flex justify-between overflow-x-auto border-b scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {TAB_TYPES.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
              ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-red-500 bg-white"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
                  style={{ minWidth: 90 }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
