import React, {useEffect} from "react";
import { FileText, Users, Shield, Globe, Copyright, AlertTriangle, Phone, Lock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsConditions = () => {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
    <>
    <Header />
  <div className="min-h-screen bg-pink-50 py-8 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <a href="/" className="inline-flex items-center text-red-600 hover:text-red-800 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back To Home
          </a>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Privacy</h1>

        {/* Agreement to Our Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Agreement To Our Terms</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These Terms and Conditions outline the rules and regulations for the use of the Marrying Muslims Islamic Matrimonial Platform. By accessing this platform, you agree to these terms. Please refrain from using Marrying Muslims if you do not accept all the terms stated on this page.
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">User Responsibilities</h2>
          </div>
          <p className="text-gray-700 mb-4">As a user of our platform, you are expected to:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Provide accurate, honest and complete information when creating a profile.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use the platform respectfully and solely for lawful matrimonial purposes.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Avoid sharing or promoting any offensive, misleading, or inappropriate content.
            </li>
          </ul>
        </div>

        {/* Protective Measures for Our Business */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-2">
            <Shield className="w-6 h-6 text-red-500 mr-0 sm:mr-3 mb-2 sm:mb-0" />
            <h2 className="text-xl font-semibold text-gray-900">Protective Measures For Our Business</h2>
          </div>
          <p className="text-gray-700 mb-6 text-base leading-relaxed">To protect our business and its owners from liability, harm, loss, and potential prosecution, we have established the following measures:</p>
          <ul className="space-y-4 text-gray-700 pl-2 sm:pl-4">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>User Profile Verification:</strong> We maintain a stringent verification process for user profiles to ensure authenticity and reduce fraudulent activity on the platform.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Content Moderation:</strong> Our team actively monitors and reviews content to promptly remove any offensive or inappropriate material, safeguarding our community standards.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Account Termination:</strong> We reserve the right to remove any account or profile without warning or explanation if we believe it violates our terms or poses a risk to the platform.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Exclusion of Liability Claims:</strong> The owner, business, or brand of Marrying Muslims is not liable for any disputes arising from interactions between users, including emotional distress or financial loss. Marrying Muslims shall not be held responsible for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform.</span>
            </li>
          </ul>
        </div>

        {/* Platform Usage */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Platform Usage</h2>
          </div>
          <p className="text-gray-700 mb-4">We reserve the right to restrict or terminate accounts that violate our terms. All interactions and communications on the platform must remain respectful and align with Islamic principles.</p>
          <p className="text-gray-700">
           Marrying Muslims is not responsible for the accuracy of user-generated content or the outcomes of any matches made.
          </p>
        </div>

        {/* Privacy & Data Use */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy & Data Use</h2>
          </div>
          <p className="text-gray-700 mb-4">Your use of the platform is also governed by our Privacy Policy. We collect and use your data as outlined there, with appropriate safeguards in place to protect your privacy and security.</p>
          <p className="text-gray-700">
            By using Marrying Muslims, you consent to our data collection and use practices.
          </p>
        </div>

        {/* Intellectual Property Rights */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Copyright className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Intellectual Property Rights</h2>
          </div>
          <p className="text-gray-700">
            Unless otherwise stated, Marrying Muslims and/or its licensors own the intellectual property rights for all material on the platform. You may access this for personal use, but you must not republish, sell, or exploit content without permission.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Limitation Of Liability</h2>
          </div>
          <p className="text-gray-700">
            While we strive to provide a safe and secure experience, the owner, business, or brand of Marrying Muslims shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform.
          </p>
        </div>

       

        {/* Your Privacy Matters To Us */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Your Privacy Matters To Us</h2>
          </div>
          <p className="text-gray-700 mb-6">
            At Marrying Muslims, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Islamic matrimonial platform. Last updated: August 2025.
          </p>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Information We Collect:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
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
              Other relevant data that may be collected
            </li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mb-4">How We Use Your Information:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To connect you with compatible matches based on your preferences and Islamic values.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To facilitate respectful communication between potential matches.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To verify profiles, prevent fraud, and maintain a safe environment.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To enhance our platform features and user experience.
            </li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Information Sharing And Disclosure:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>With Other Users:</strong> Profile information you choose to make visible.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>Service Providers:</strong> Trusted partners who help operate our platform.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>Legal Requirements:</strong> When required by law or to protect safety.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>Business Transfers:</strong> In case of merger or acquisition.
            </li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Measures:</h3>
          <p className="text-gray-700 mb-4">We implement industry-standard security measures to protect your personal information:</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>Technical Safeguards:</strong> Data Protection, Robust Hosting Infrastructure, Continuous Security Evaluations, Enhanced Authentication Methods
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <strong>Administrative Safeguards:</strong> Restricted Data Access, Third-Party Risk Assessments, Information Security Awareness, Crisis Management
            </li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Rights And Choices:</h3>
          <p className="text-gray-700 mb-4">You can view and modify your profile information at any time. To request the deletion of your data, please contact us at <a href="mailto:help@marryingmuslims.com" className="text-red-500 hover:text-red-600">help@marryingmuslims.com</a></p>

          <p className="text-gray-700 mb-4"><strong>Limitation of Liability:</strong> Marrying Muslims and its owners shall not be liable for any damages arising from the use of your personal information or from any interactions between users. By using our platform, you acknowledge that you understand and agree to this Privacy Policy.
</p>

          <p className="text-gray-700">
            <strong>Indemnification:</strong> You agree to indemnify and not to hold Marrying Muslims, its owners, and its affiliates from any claims, losses, liabilities, damages, costs, or expenses, including reasonable solicitor fees, arising out of or relating to your use of the platform or your violation of this Privacy Policy.
          </p>
        </div>
         {/* Contact Us */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <Phone className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-gray-700">
            If you have any questions about these Terms & Conditions, please reach out to us at{' '}
            <a href="mailto:help@marryingmuslims.com" className="text-red-500 hover:text-red-600">
              help@marryingmuslims.com
            </a>
          </p>
        </div>
      
      </div>
       
    </div>
     <Footer/>
    </>
  );
};

export default TermsConditions;