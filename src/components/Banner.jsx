import React from "react";
import banner from "../assets/group-2.jpg";
// import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[650px]  mb-20"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay for blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-70  flex items-center justify-center">
        <div className="text-center p-8 rounded-lg ">
          {/* Highlighted text */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Learn, Achieve, Succeed – Start Today!
          </h1>
          <p className="text-white pb-4">Empower your learning journey with expert resources, interactive courses, and tools designed <br /> to help you achieve your goals and succeed in your career.</p>
          {/* <Link to={"/availableCar"}>
            <button className="bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-600 hover:to-orange-800 text-white text-lg font-medium btn rounded-lg px-6 py-2 transition duration-300">
              View Available Cars
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
