import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BookedSessionDetails = () => {
  const { id } = useParams(); // Extract ID from URL params
  const [sessionDetails, setSessionDetails] = useState(null); // Full session details
  const [sessionId, setSessionId] = useState(null); // Only sessionId
  const { user } = useAuth(); // User context
  const axiosPublic = useAxiosPublic(); // Axios instance

  // Fetch full session details
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data } = await axiosPublic.get(`/book-session/details/${id}`);
        setSessionDetails(data[0]); // Assuming the first object in the array is the session details
      } catch (error) {
        console.error("Error fetching session details:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch session details.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    fetchSessionDetails();
  }, [id, axiosPublic]);

  // Fetch sessionId from session details
  useEffect(() => {
    if (sessionDetails?.sessionId) {
      const fetchSessionId = async () => {
        try {
          const { data } = await axiosPublic.get(
            `/book-session/by-session-id/${sessionDetails.sessionId}`
          );
          setSessionId(data.sessionId); // Set the session ID
        } catch (error) {
          console.error("Error fetching session ID:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to fetch the session ID.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      };
      fetchSessionId();
    }
  }, [sessionDetails, axiosPublic]);

  // Handle posting the review
  const handlePostReview = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const rating = e.target.rating.value;

    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "You must be logged in to post a review.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const reviewData = {
      sessionId,
      studentName: user?.displayName,
      studentEmail: user?.email,
      comment,
      rating: parseFloat(rating),
    };

    try {
      const response = await axiosPublic.post("/reviews", reviewData);
      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Review posted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to post review. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 my-14">
      {/* Session Details */}
      {sessionDetails && (
        <div className="flex flex-col lg:flex-row items-start gap-10 mb-12">
          <div className="lg:w-1/2">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src={sessionDetails.sessionImage}
              alt={sessionDetails.title || "Session Image"}
            />
          </div>
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{sessionDetails.title}</h1>
            <p className="text-gray-700">{sessionDetails.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>
                  <strong>Student Name:</strong> {sessionDetails.studentName}
                </p>
                <p>
                  <strong>Student Email:</strong> {sessionDetails.studentEmail}
                </p>
                <p>
                  <strong>Class Start Time:</strong> {sessionDetails.classStartTime}
                </p>
              </div>
              <div>
                <p>
                  <strong>Tutor Name:</strong> {sessionDetails.tutorName}
                </p>
                <p>
                  <strong>Tutor Email:</strong> {sessionDetails.tutorEmail}
                </p>
                <p>
                  <strong>Class End Time:</strong> {sessionDetails.classEndTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      <form
        onSubmit={handlePostReview}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Post a Review
        </h2>
        <textarea
          name="comment"
          placeholder="Write your review here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          min="1"
          max="5"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Send Review
        </button>
      </form>
    </div>
  );
};

export default BookedSessionDetails;
