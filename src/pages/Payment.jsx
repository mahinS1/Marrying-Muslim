
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Payment = () => {
  const handlePayment = () => {
    // Placeholder for payment gateway integration (e.g., Stripe)
    alert('Redirecting to payment gateway...');
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Lifetime Deal: £50</h1>
              <p className="text-center text-gray-600 mb-8">
                Unlock full access to all features forever with a one-time payment.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Free Members</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Create, edit, and upload your profile.</li>
                      <li>Your contact details will not be visible to other members.</li>
                      <li>View basic information of other non-paying members.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Paid Members (£50)</h3>
                    <ul className="list-disc list-inside text-green-600 space-y-2">
                      <li>Upload your profile to the site.</li>
                      <li>View other member's full details, including contact information.</li>
                      <li>Get your profile highlighted to other members.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Important Information</h2>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>
                    The lifetime deal is restricted to a single email address, meaning that once you register, the deal is permanently linked to that address. You will not be able to change your email after registration.
                  </p>
                  <p>
                    Furthermore, sharing email addresses to manipulate the system is strictly prohibited. Each email address may only have one profile associated with it.
                  </p>
                  <p className="font-semibold text-red-600">
                    To maintain the integrity of our site, we actively monitor profiles for misuse. Creating a profile solely to pass the email address to a friend or family member after using our services to find a partner is prohibited. Any account found engaging in such practices will be permanently banned.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handlePayment}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
