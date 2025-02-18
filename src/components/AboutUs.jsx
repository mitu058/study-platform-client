import React from 'react';
import onlineedu from '../assets/03-Do0Chsvx.jpg';

const AboutUs = () => {
  const features = [
    {
      icon: "👨‍🏫",
      title: "Learn with Experts",
      description: "Gain knowledge from industry leaders and experienced professionals who provide hands-on guidance.",
      bgColor: "bg-orange-100",
    },
    {
      icon: "📖",
      title: "Learn Anything",
      description: "Explore a variety of subjects with unlimited access to courses, from technology to creative arts.",
      bgColor: "bg-blue-100",
    },
    {
      icon: "⏳",
      title: "Flexible Learning",
      description: "Study at your own pace with courses designed for convenience, whether you're a beginner or an expert.",
      bgColor: "bg-green-100",
    },
    {
      icon: "🏛",
      title: "Industrial Standards",
      description: "Stay ahead with industry-recognized certifications and skills that employers value the most.",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center">
      {/* Left Side - Image */}
      <div className="lg:w-1/2">
      <h2 className="text-3xl pb-4 font-bold text-gray-900">
          Find Out More About us, <span className="text-yellow-500">Eduport insides.</span>
        </h2>
        <img
          src={onlineedu}
          alt="Online Learning"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Features */}
      <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
       
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              {/* Icon with background color, rounded and left aligned */}
              <div className={`inline-block p-3 rounded-full ${feature.bgColor} text-left w-16 h-16`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              
              {/* Title and Description */}
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
