import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useBookedSession from '../../hooks/useBookedSession';

const StudentOverview = () => {
    const [bookedSession] = useBookedSession();

    // Transform bookedSession data for the chart
    const data = bookedSession.map(session => ({
        name: session.title,
        fee: session.registrationFee
    }));

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Booked session Fees Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fee" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StudentOverview;
