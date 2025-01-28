import React from "react";
import { useNavigate } from "react-router-dom";
import useBookedSession from "../../hooks/useBookedSession";

const ViewBookedSession = () => {
  const [bookedSessions] = useBookedSession();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Show a message if no booked sessions */}
      {bookedSessions.length === 0 ? (
        <div className="text-center  text-xl text-gray-700">
          You have no booked sessions yet. Please book a session.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {bookedSessions.map((session) => (
            <div key={session._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                className="w-full h-48 object-cover rounded-md"
                src={session.sessionImage}
                alt=""
              />
              <div className="flex justify-between pt-4 pb-2">
                <h2>Tutor Name: {session.tutorName}</h2>
                <h2>$ {session.registrationFee}</h2>
              </div>
              <h3 className="text-xl font-semibold pb-2">{session.title}</h3>
              <p>{session.description}</p>
              <button
                onClick={() => navigate(`/booked-session-details/${session._id}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookedSession;
