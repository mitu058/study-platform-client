import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SessionDetails = () => {
  const { id } = useParams(); // Session ID from route
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth()

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/session/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }
        const data = await response.json();
        setSession(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session details:', error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login'); // Redirect to login page
    } else {
      console.log('Proceed to booking process...');
      // Implement booking logic here
    }
  };

  if (loading) {
    return <div>Loading session details...</div>;
  }

  if (!session) {
    return <div>Session not found!</div>;
  }

  const currentDate = new Date();
  const registrationStart = new Date(session.registrationStartDate);
  const registrationEnd = new Date(session.registrationEndDate);

  const isRegistrationOpen = currentDate >= registrationStart && currentDate <= registrationEnd;

  const isAdminOrTutor = user?.role === 'admin' || user?.role === 'tutor';

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
      <p className="text-gray-600 mb-4">Tutor: {session.tutorName}</p>
      <p className="text-gray-600 mb-4">Average Rating: {session.averageRating || 'No reviews yet'}</p>
      <p className="text-gray-600 mb-4">{session.description}</p>
      <p className="text-gray-600 mb-4">Registration Fee: {session.registrationFee || 'Free'}</p>
      <p className="text-gray-600 mb-4">Start Date: {new Date(session.registrationStartDate).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">End Date: {new Date(session.registrationEndDate).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Class Time: {session.classStartTime} - {session.classEndTime}</p>
      <p className="text-gray-600 mb-4">Session Duration: {session.sessionDuration}</p>
      <h2 className="text-2xl font-bold mt-6 mb-4">Reviews</h2>
      {session.reviews && session.reviews.length > 0 ? (
        <ul>
          {session.reviews.map((review, index) => (
            <li key={index} className="mb-2 border-b pb-2">
              <p className="font-semibold">{review.studentName}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      <div className="mt-6">
        {isAdminOrTutor || !isRegistrationOpen ? (
          <button className="btn bg-gray-400 text-white cursor-not-allowed" disabled>
            Registration Closed
          </button>
        ) : (
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
