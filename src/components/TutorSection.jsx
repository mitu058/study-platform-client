import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorSection = () => {
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users"); // Fetch all users
        const tutorUsers = response.data.filter((user) => user.role === "tutor"); // Filter tutors
        setTutors(tutorUsers);
        // console.log('all tutors found',tutors)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load tutors.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <p>Loading tutors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meet Our Tutors</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore our experienced tutors who are here to guide you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div key={tutor._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={tutor.photo}
                alt={tutor.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="text-start mt-4">
                <h2 className="text-xl font-semibold">Tutor Name : {tutor.name}</h2>
                <p className="text-gray-600">Tutor Email :  {tutor.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tutors available.</p>
        )}
      </div>
    </div>
  );
};

export default TutorSection;
