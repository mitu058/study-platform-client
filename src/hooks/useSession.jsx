import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth'; // Assuming useAuth provides the logged-in user's email

const useSession = () => {
    const { user } = useAuth(); // Get the current user's email and role
    const axiosPublic = useAxiosPublic();
    
    const { data: session = [], isLoading:loading, refetch } = useQuery({
      queryKey: ['sessions', user?.email, user?.role],
      queryFn: async () => {
        const res = await axiosPublic.get('/session', {
          params: { email: user?.email, role: user?.role },
        });
        return res.data;
      },
    });
    

  return [session, loading, refetch];
};

export default useSession;
