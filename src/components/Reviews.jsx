import React from 'react'

const Reviews = () => {
  return (
    <div className='px-6'>
      {/* Our Vision Section */}
      <div id='ourvision' className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Vision
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Box 1 */}
          <div className='flex flex-col items-center'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>In
            </h3>
          <div className="bg-[#FEF3F3] rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-sm leading-relaxed">
              Joining Marrying Muslims offers a safe and respectful space for Muslims seeking meaningful connections. Our platform helps you explore potential partners who share your values and beliefs, prioritising privacy and open communication to support lasting partnerships in line with our faith.
            </p>
          </div>
          </div>

          {/* Box 2 */}
          <div className='flex flex-col items-center'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Helping
            </h3>
          
          <div className="bg-[#FEF3F3] rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-sm leading-relaxed">
              Explore detailed profiles that go beyond basic information. 
              Our profiles include insights into likes, values, and relationship aspirations, 
              allowing you to connect on a deeper level. Engage with potential partners 
              through our platform to discover your ideal match.
            </p>
          </div>
</div>
          {/* Box 3 */}
          <div className='flex flex-col items-center'>
<h3 className='text-xl font-semibold text-gray-800 mb-4'>You
            </h3>
         
          <div className="bg-[#FEF3F3] rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-sm leading-relaxed">
              We are committed to providing a 100% Shariah-compliant platform that ensures all user interactions are respectful 
              and appropriate. Our guidelines promote meaningful connections while upholding Islamic values, 
              encouraging users to engage in respectful dialogue.
            </p>
          </div>
 </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
