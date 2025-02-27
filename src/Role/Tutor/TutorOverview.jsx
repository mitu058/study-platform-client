import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const TutorOverview = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: tutorSession = [] } = useQuery({
        queryKey: ["tutorSession", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosPublic.get(`/session/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    // Transform session data for the chart
    const data = tutorSession.map(session => ({
        name: session.title,
        fee: session.registrationFee
    }));

    return (
        <div className="p-6 bg-white my-16 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4"> Sessions Fee Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                        dataKey="fee" 
                        fill="#8884d8" 
                        stroke="#8884d8"
                        barSize={40}
                        shape={(props) => {
                            const { x, y, width, height, payload } = props;
                            return (
                                <rect 
                                    x={x} 
                                    y={y} 
                                    width={width} 
                                    height={height} 
                                    fill={payload.fee === 0 ? '#d1d5db' : '#8884d8'} // Gray for 0, Blue for others
                                />
                            );
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TutorOverview;
