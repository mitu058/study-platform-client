import React from "react";
import useLoginUser from "../hooks/useLoginUser";

const Profile = () => {
  const [loginUser] = useLoginUser();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img
          src={loginUser.photo}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800 mb-1">
          {loginUser.name}
        </h2>
        <p className="text-gray-500 mb-3">{loginUser.email}</p>
        <span className="py-1 px-8  rounded-lg bg-blue-200 font-semibold text-blue-600">{loginUser.role}</span>
      </div>
    </div>
  );
};

export default Profile;
