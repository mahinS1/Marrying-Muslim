import React from 'react'
import { Link } from 'react-router-dom'

const Calltoaction = () => {
  return (
    <div>
      {/* Call to Action Section */}
    <div className="bg-[#DC2626] text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Life Partner?</h2>
        <p className="text-xl mb-8 text-red-100">Join A Diverse Community of Muslims Who Are Looking For Their Perfect Match.</p>
        <Link to="/signup" className="bg-white text-[#DC2626] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          Ready To Find Your Life Partner?
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Calltoaction
