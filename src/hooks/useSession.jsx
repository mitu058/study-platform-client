import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSession = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth();

  const { data: sessions = [], isLoading: loadingSessions, refetch } = useQuery({
    queryKey: ["sessions", user?.email], // Include user email in queryKey
    enabled: !loading,                                                                                                                    
    queryFn: async () => {
      const res = await axiosSecure.get(`/session`, {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  return [sessions, loadingSessions, refetch];
};

export default useSession;
