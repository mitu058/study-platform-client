import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSessionId = () => {
    const axiosPublic = useAxiosPublic();
 

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions",id], // Include user email in queryKey                                                                                                                   
    queryFn: async () => {
      const res = await axiosPublic.get(`/session/${id}`, {
       
      });
      return res.data;
    },
  });

  return [sessions, refetch];
};

export default useSessionId;