import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useSession = () => {
  const axiosPublic = useAxiosPublic();
  const { data: sessions = [], isLoading: loadingSessions, refetch } = useQuery({
    queryKey: ["sessions"], // Include user email in queryKey                                                                                                                   
    queryFn: async () => {
      const res = await axiosPublic.get('/session')
      return res.data;
    },
  });

  return [sessions, loadingSessions, refetch];
};

export default useSession;
