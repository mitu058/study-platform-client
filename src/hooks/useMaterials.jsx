import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth'; 

const useMaterials = () => {
  const { user } = useAuth(); // Get the current user's email and role
  const axiosPublic = useAxiosPublic();

  const { data: materials = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['materials', user?.email, user?.role],
    queryFn: async () => {
      const res = await axiosPublic.get('/materials', {
        params: { email: user?.email, role: user?.role },
      });
      return res.data;
    },
  });

  return [materials, loading, refetch];
};

export default useMaterials;
