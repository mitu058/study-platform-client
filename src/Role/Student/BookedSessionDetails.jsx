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
      sessionId: id, // Link to the current session
      studentName: user.displayName,
      studentEmail: user.email,
      comment,
      rating: parseFloat(rating),
    };

    try {
      const { data } = await axiosPublic.post("/reviews", reviewData);
      if (data.insertedId) {
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
    }
  };

  return (
    <div className="container mx-auto p-6 my-14">
      <h1 className="text-2xl font-bold mb-6">{session.title}</h1>
      <p>{session.description}</p>
      <h2 className="text-xl font-bold mt-8 mb-4">Post a Review</h2>
      <form onSubmit={handlePostReview} className="space-y-4">
        <textarea
          name="comment"
          placeholder="Write your review here..."
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          className="w-full p-2 border rounded"
          min="1"
          max="5"
          required
        />
        <button
          type="submit"
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Post Review
        </button>
      </form>
    </div>
  );
};

export default BookedSessionDetails;
