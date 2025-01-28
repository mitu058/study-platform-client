import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAllUser from "../../hooks/useAllUser";
import axios from "axios";

const SessionDetails = () => {
  const { id } = useParams(); // Session ID from route
  const navigate = useNavigate();
  const [session, setSession] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isAllUser] = useAllUser();
 
  const {
    sessionImage,
    description,
    tutorName,
    tutorEmail,
    _id,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    classStartTime,
    classEndTime,
    sessionDuration,
    title,
  } = session;

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://study-platform-server-mu.vercel.app/session/details/${id}`
        );
        // console.log("Fetched session data:", data);
        setSession(data[0]);
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    const fetchReviews = async () => {
      // console.log("Session ID being used to fetch reviews:", id);
      try {
        const { data } = await axiosPublic.get(`/reviews/${id}`);
        // console.log("Fetched Reviews:", data);
        setReviews(data);
      } catch (error) {
        // console.error("Error fetching reviews:", error);
      }
    };

    fetchSessionDetails();
    fetchReviews();
  }, [id]);

  const handleBookNow = async () => {
    if (registrationFee === 0) {
      // Book session directly for free
      const bookData = {
        sessionId: _id,
        studentName: user?.displayName,
        studentEmail: user?.email,
        registrationFee,
        classStartTime,
        classEndTime,
        sessionDuration,
        tutorName,
        tutorEmail,
        title,
        sessionImage,
        description,
      };

      try {
        const { data } = await axiosPublic.post("/book-session", bookData);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Session booked successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Navigate to the booked session route after success
            navigate("/dashboard");
          });
        }
      } catch (error) {
        console.error("Error booking session:", error);
      }
    } else {
      // Redirect to payment page if fee is not free
      navigate(`/payment/${id}`);
    }
  };

  const currentDate = new Date();
  const registrationStart = new Date(registrationStartDate);
  const registrationEnd = new Date(registrationEndDate);

  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;

  return (
    <div className="container mx-auto p-6 my-14">
      {/* Flex Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Image + Title/Description/Reviews */}
        <div className="w-full md:w-1/2">
          {/* Image */}
          <img
            src={sessionImage}
            alt={title}
            className="rounded-lg w-full  h-auto object-cover mb-6"
          />

          {/* Description */}
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Reviews */}
          <h2 className="text-2xl font-bold mt-6 mb-3">
            Reviews and Rating :{" "}
          </h2>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review._id} className="mb-2 border-b pb-2">
                  <p className="font-semibold mb-3">
                    Reviewer : {review.studentName}
                  </p>
                  <p>{review.comment}</p>
                  <p className="text-lg text-gray-700">
                    Rating: {review.rating}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Right Side: Session Details */}
        <div className="w-full md:w-1/2 ml-5 space-y-3">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-gray-600">Tutor Name: {tutorName}</p>
          <p className="text-gray-600">
            Registration Fee: {registrationFee || "Free"}
          </p>
          <p className="text-gray-600">
            Registration Start Date:{" "}
            {new Date(registrationStartDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            Registration End Date:{" "}
            {new Date(registrationEndDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Class Start Time: {classStartTime}</p>
          <p className="text-gray-600">Class End Time: {classEndTime}</p>
          <p className="text-gray-600">
            Session Duration: {sessionDuration} hours
          </p>

          {/* Action Button */}
          <div>
            {!isRegistrationOpen ? (
              // Registration is closed
              <button className="btn btn-sm bg-red-200 text-red-500 cursor-not-allowed">
                Registration Closed
              </button>
            ) : (
              // Show enabled Book Now button for students
              <button
                disabled={
                  isAllUser[0]?.role === "tutor" || isAllUser[0]?.role === "admin"
                }
                className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
