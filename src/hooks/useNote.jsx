import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useNote = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: note = [],  refetch } = useQuery({
    queryKey: ["note", user?.email], // Include user email in queryKey, // Ensure the user is loaded
    queryFn: async () => {
      const res = await axiosPublic.get(`/note/${user?.email}`);
      return res.data;
    },
  });

  return [note,  refetch];
};

export default useNote;
