import { useEffect } from "react";
import { Shield, FileText, Eye, Lock, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-pink-50 py-8 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <a
              href="/"
              className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back To Home
            </a>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          {/* Your Privacy Matters To Us */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Your Privacy Matters To Us
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              At Marrying Muslims, we are dedicated to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy outlines how we collect, use, disclose, and
              safeguard your information when you use our Islamic matrimonial
              platform. Last updated: January 2024.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Information We Collect
              </h2>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Full name, age, and date of birth
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Contact information (email, phone number, address)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Profile photos and personal descriptions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Religious preferences and practices
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Educational and professional background
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Family information and marital history
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Partner preferences and requirements
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Other relevant data that may be collected.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                How We Use Your Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Profile Matching
                </h3>
                <p className="text-gray-700 text-sm">
                  To connect you with compatible matches based on your
                  preferences and Islamic values.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Communication
                </h3>
                <p className="text-gray-700 text-sm">
                  To facilitate respectful communication between potential
                  matches.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Safety & Security
                </h3>
                <p className="text-gray-700 text-sm">
                  To verify profiles, prevent fraud and maintain a safe
                  environment.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Service Improvement
                </h3>
                <p className="text-gray-700 text-sm">
                  To enhance our platform features and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Information Sharing And Disclosure */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Information Sharing And Disclosure
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              We may share information under the following circumstances:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>
                  <strong>With Other Users:</strong> Profile information you
                  choose to make visible
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>
                  <strong>Service Providers:</strong>Trusted partners who assist
                  in operating our platform
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect safety
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>
                  <strong>Business Transfers:</strong> In case of merger or
                  acquisition
                </span>
              </li>
            </ul>
          </div>

          {/* Security Measures */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Security Measures
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your
              personal information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Technical Safeguards
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Data Protection
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Robust Hosting Infrastructure
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Continuous Security Evaluations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enhanced Authentication Methods
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Administrative Safeguards
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Restricted Data Access
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Third-Party Risk Assessments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Information Security Awareness
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Crisis Management
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights and Choices */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Your Rights And Choices
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              You have the following rights regarding your personal information:
            </p>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Access and Update
              </h3>
              <p className="text-gray-700 text-sm">
                You can view and modify your profile information at any time. To
                request the deletion of your data, please contact us at:
                <a
                  href="mailto:help@marryingmuslims.com"
                  className="text-red-500 hover:text-red-600 ml-1"
                >
                  help@marryingmuslims.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
