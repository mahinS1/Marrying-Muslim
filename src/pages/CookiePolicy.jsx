import React, { useEffect } from "react";
import {Cookie, HelpCircle, Target, Settings, Shield, Phone} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CookiePolicy = () => {
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
            Cookie Policy
          </h1>

          {/* Our Use of Cookies */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Cookie className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Our Use of Cookies
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how Marrying Muslims uses cookies and
              similar tracking technologies to recognise you when you visit our
              website. It explains what these technologies are, why we use them,
              and your rights to control their use.
            </p>
          </div>

          {/* What Are Cookies? */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                What Are Cookies?
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small data files placed on your device that help
              enhance your browsing experience by remembering your preferences,
              login information, and browsing activity.
            </p>
          </div>

          {/* Why We Use Cookies */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Why We Use Cookies
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To remember your login details and preferences
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To improve website performance and speed
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To understand user interactions and improve user experience
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To show relevant content and match suggestions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To ensure the website functions properly and securely
              </li>
            </ul>
          </div>

          {/* Types of Cookies We Use */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Types of Cookies We Use
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Essential Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Required for core functionalities like secure login and
                  account management.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Help us understand how users interact with the site.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Preference Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Remember your settings and customization preferences.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Third-Party Cookies
                </h3>
                <p className="text-gray-700 text-sm">
                  Used by third-party services integrated into our site (e.g.,
                  Google, social login).
                </p>
              </div>
            </div>
          </div>

          {/* How to Manage Cookies */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                How to Manage Cookies
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You have the right to accept or reject cookies. Most browsers
              automatically accept cookies, but you can usually modify your
              settings to decline them. However, doing so may impact the
              functionality of certain parts of the platform.
            </p>
          </div>

          {/* Contact Us */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-6">
              <Phone className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Us
              </h2>
            </div>
            <p className="text-gray-700">
              For more information about our use of cookies, feel free to
              contact us at{" "}
              <a
                href="mailto:help@marryingmuslims.com"
                className="text-red-500 hover:text-red-600"
              >
                help@marryingmuslims.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy;
