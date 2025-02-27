import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import onlineedu from "../assets/03-Do0Chsvx.jpg";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, mirror:true, once: false }); // Initialize AOS with settings
  }, []);

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
    <div className="container mx-auto px-6 mb-20">
      <h2 className="text-3xl text-center pb-8 font-bold text-gray-900">
        Learn More About SkilStack: Inside Our Online Teaching Platform
      </h2>
      <div className="flex flex-col lg:flex-row items-center">
        
        {/* Left Side - Image */}
        <div className="lg:w-1/2" data-aos="fade-right">
          <img
            src={onlineedu}
            alt="Online Learning"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Features */}
        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0" data-aos="fade-left">
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className={`inline-block p-3 rounded-full ${feature.bgColor} text-left w-16 h-16`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;
