import React from 'react';
import mentorImage from '../assets/one-to-one.jpg'        

const Mentorship = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Centered Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">One-to-One Mentorship</h2>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Teaching Benefits & Guidance */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Why Personalized Mentorship?</h3>
          <p className="mt-4 text-lg text-gray-600">
            Personalized mentorship ensures focused learning, allowing students to progress at their own pace with individual attention. This approach builds confidence and improves understanding effectively.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-6">How We Guide Students?</h3>
          <p className="mt-4 text-lg text-gray-600">
            Our mentors provide step-by-step guidance, customized study plans, and real-time feedback. With a supportive learning environment, students gain clarity, stay motivated, and develop essential skills. Whether it's academic support, skill development, or career guidance, our mentors ensure a supportive and engaging learning experience. 
          </p>
        </div>

        {/* Right Side - Image */}
        <div>
          <img 
            src={mentorImage} 
            alt="Mentor teaching a student" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
