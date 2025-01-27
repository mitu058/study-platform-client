import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSession = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  // const { user, loading } = useAuth();
  const { data: sessions = [], isLoading: loadingSessions, refetch } = useQuery({
    queryKey: ["sessions"], // Include user email in queryKey                                                                                                                   
    queryFn: async () => {
      const res = await axiosSecure.get('/session')
      return res.data;
    },
  });

  return [sessions, loadingSessions, refetch];
};

export default useSession;
