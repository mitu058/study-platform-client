import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookedSession from '../../hooks/useBookedSession';

const ViewBookedSession = () => {
    const [bookedSessions] = useBookedSession();
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {bookedSessions.map(session => (
                <div key={session._id} className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold">{session.title}</h3>
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
    );
};

export default ViewBookedSession;
