import { ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
// import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is Marrying Muslims?",
    answer: "Marrying Muslims is an Islamic matrimonial platform dedicated to helping practicing Muslims find their life partners in alignment with Islamic principles. Our focus is on upholding Islamic values, encouraging family involvement, and ensuring guardian supervision in all interactions."
  },
  {
    id: 2,
    question: "Who can join Marrying Muslims?",
    answer: "Practicing Sunni Muslims who are serious about marriage in line with Islamic principles are welcome. We embrace both reverts and those born into the faith, as long as they are dedicated to upholding Islamic values."
  },
  {
    id: 3,
    question: "How does guardian (Wali) involvement work?",
    answer: "The Wali can communicate with the third-party Wali by making a respectful introduction."
  },
  {
    id: 4,
    question: "How do I create a profile?",
    answer: "Click Sign Up and fill out our comprehensive Islamic-focused form. You’ll need to provide personal details, Islamic background, Wali (guardian) contact details, and your expectations for marriage. You must use the Wali contact details when signing up with us, this is to ensure we are doing things the correct way when contact is made."
  },
  {
    id: 5,
    question: "Why do I need guardian information?",
    answer: "Islamic marriage requires guardian (wali) involvement, especially for women. This ensures proper Islamic procedures are followed and maintains the dignity and protection that Islam provides in the marriage process."
  },
  {
    id: 6,
    question: "How long does profile approval take?",
    answer: "Profile approval usually takes 24–48 hours. We manually review each profile to ensure authenticity and sincerity in line with Islamic values."
  },
  {
    id: 7,
    question: "How do I contact someone I'm interested in?",
    answer: "Once you have created a profile and it has been approved, you will need to make your payment to access the Wali contact details and reach out to potential matches."
  },
  {
    id: 8,
    question: "Can I talk directly to potential matches?",
    answer: "Direct communication between non-mahram without guardian supervision is not permitted to maintain Islamic guidelines. All initial contact and arrangements are made through guardians to ensure proper Islamic conduct."
  },
  {
    id: 9,
    question: "What if I don't have a guardian?",
    answer: "If you don’t have a natural guardian, you can appoint a trusted Islamic scholar, imam, or righteous male relative."
  },
  {
    id: 10,
    question: "What behavior is not allowed?",
    answer: "Prohibited: Non-Islamic behavior, inappropriate messages, bypassing guardian involvement, false information, non-serious intentions, requesting photos before proper introduction, and any conduct that violates Islamic principles."
  },
  {
    id: 11,
    question: "What happens if Islamic guidelines are violated?",
    answer: "Profiles violating Islamic guidelines will be immediately suspended or permanently banned. We take Islamic compliance very seriously and have zero tolerance for inappropriate behavior."
  },
  {
    id: 12,
    question: "How much does Marrying Muslims cost?",
    answer: "Creating and listing your profile on our site is free. However, to view more information about potential matches and their contact details, you must pay a one-time fee of £50. This fee ensures that all profiles represent real individuals."
  },
  {
    id: 13,
    question: "Is there a refund policy?",
    answer: 'You are free to browse the site and understand our platform. Once payment is made, there are no refunds. This policy ensures commitment and prevents misuse, so please make sure you understand this before proceeding with your payment. If you have any questions, please contact us at <a class="text-red-600" href="mailto:help@marryingmuslims.com">help@marryingmuslims.com</a>.'
  },
  {
    id: 14,
    question: "What payment methods are accepted?",
    answer: 'We accept PayPal, bank transfers, and all major credit and debit cards. Before we list your profile live on our site, you may be required to provide evidence of your email address, personal credentials, and bank history for confirmation purposes or in the event of a dispute. If you have questions, please reach out to us at <a class="text-red-600" href="mailto:help@marryingmuslims.com">help@marryingmuslims.com</a>'
  },
 
 {
    id: 17,
    question: "How can I get help?",
  answer: 'For assistance, please contact <a class="text-red-600" href="mailto:help@marryingmuslims.com">help@marryingmuslims.com</a>. We are here to help with profile setup, technical issues, payment problems and general platform questions. Our typical response time is 24–48 hours.'
  },
  {
    id: 18,
    question: "Online Nikah Service",
    answer: 'We may be able to offer an online Nikah service, depending on availability. For more information, please email us at <a class="text-red-600" href="mailto:help@marryingmuslims.com">help@marryingmuslims.com</a>.'
  }
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(prev => (prev === id ? null : id));
  };

  return (
    <>
    <div id='faq' className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div  className="bg-[#C31F1F] rounded-lg p-4 text-center shadow-lg mb-6">
          <div className="flex items-center justify-center mb-1">
            <HelpCircle className="w-6 h-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">FAQ</h1>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-5 text-left bg-[#C31F1F] hover:bg-red-700 text-white font-medium transition-colors duration-200 flex items-center justify-between group focus:outline-none focus-visible:outline-none focus:ring-0 rounded-lg text-base"
                aria-expanded={openItem === item.id}
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                    openItem === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-400 ease-in-out px-4 bg-gray-50 text-gray-700 ${openItem === item.id ? 'py-4 max-h-96 opacity-100' : 'py-0 max-h-0 opacity-0 pointer-events-none'}`}
                style={{overflow: 'hidden'}}
              >
                {/* Render HTML if answer contains HTML, else render as text */}
                {/<[a-z][\s\S]*>/i.test(item.answer) ? (
                  <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                ) : (
                  <span>{item.answer}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;
