import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useBookedSession = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
  
    const { data: bookedSession = [],  refetch } = useQuery({
      queryKey: ["bookedSession", user?.email], // Include user email in queryKey, // Ensure the user is loaded
      queryFn: async () => {
        const res = await axiosPublic.get(`/booked-session/${user?.email}`);
        return res.data;
      },
    });
  
    return [bookedSession,  refetch];
};

export default useBookedSession;