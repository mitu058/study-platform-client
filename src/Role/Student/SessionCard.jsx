import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SessionCard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch approved sessions using useEffect
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/session");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();

        // Ensure the data is an array and filter approved sessions
        if (Array.isArray(data)) {
          const approvedSessions = data.filter(
            (session) => session.status === "approved"
          );
          // console.log("Approved sessions:", approvedSessions);

          // Slice the approved sessions to get the first 6
          const slicedSessions = approvedSessions.slice(0, Math.min(approvedSessions.length, 6));
          // console.log("Sliced sessions:", slicedSessions);

          setSessions(slicedSessions);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []); // Empty dependency array ensures this runs once on component mount

  const getSessionBadge = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate < start) {
      return { label: "Upcoming", color: "bg-orange-200 text-orange-500 px-5" };
    } else if (currentDate >= start && currentDate <= end) {
      return { label: "Ongoing", color: "bg-green-200 text-green-600 px-5" };
    } else {
      return { label: "Closed", color: "bg-red-200 text-red-500 px-5" };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (sessions.length === 0) {
    return <div>No approved sessions available.</div>;
  }

  return (
    <div className="w-[80%] mx-auto">
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Explore, Enroll, Excel – Your Journey Awaits!</h1>
        <p className="text-lg text-gray-600 mt-2">
          
Explore and view details of the sessions you've booked with our expert tutors <br /> and take a step closer to achieving your goals.
        </p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
      {sessions.map((session) => {
        const badge = getSessionBadge(
          session.registrationStartDate,
          session.registrationEndDate
        );

        return (
          <div
            key={session._id}
            className=" border rounded-lg p-4 shadow-md"
          >
            <img
              src={session.sessionImage}
              alt={session.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{session.title}</h3>
            <p className="text-gray-600 mt-2">{session.description}</p>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${badge.color}`}
              >
                {badge.label}
              </span>
              <button
                className="btn btn-sm bg-blue-900 text-white hover:bg-blue-600"
                onClick={() => {
                  if (!user) {
                    navigate("/login"); // Redirect to login if not logged in
                  } else {
                    navigate(`/sessionDetails/${session._id}`); // Navigate to session details
                  }
                }}
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default SessionCard;
