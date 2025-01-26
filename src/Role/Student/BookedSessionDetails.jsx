import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BookedSessionDetails = () => {
  const { id } = useParams(); // Session ID
  const [session, setSession] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { sessionId, studentEmail, studentName } = session;

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data } = await axiosPublic.get(`/booked-session/${id}`);
        setSession(data);
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSessionDetails();
  }, [id]);

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
      sessionId, // Link to the current session
      studentName,
      studentEmail,
      comment,
      rating: parseFloat(rating),
    };

    try {
      const { data } = await axiosPublic.post("/reviews", reviewData);
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Review Sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 my-14">
      {/* Session Details Section */}
      <div className="flex flex-col lg:flex-row items-start gap-10 mb-12">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            src={session.sessionImage}
            alt={session.title}
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{session.title}</h1>
          <p className="text-gray-700">{session.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
             
              <p>
                <strong>Student Name:</strong> {session.studentName}
              </p>
              <p>
                <strong>Student Email:</strong> {session.studentEmail}
              </p>
              <p>
                <strong>Class Start Time:</strong> {session.classStartTime}
              </p>
            </div>
            <div>
           
              <p>
                <strong>Tutor Name:</strong> {session.tutorName}
              </p>
              <p>
                <strong>Tutor Email:</strong> {session.tutorEmail}
              </p>
              <p>
                <strong>Class End Time:</strong> {session.classEndTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <form
        onSubmit={handlePostReview}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Post a Review</h2>
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
