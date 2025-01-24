import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useMaterials = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const { data: materials = [], isLoading: loadingMaterials, refetch } = useQuery({
    queryKey: ["materials", user?.email], // Include user email in queryKey
    enabled: !loading, // Ensure the user is loaded
    queryFn: async () => {
      const res = await axiosPublic.get(`/materials`, {
        params: { email: user?.email }, // Send user email as query parameter
      });
      return res.data;
    },
  });

  return [materials, loadingMaterials, refetch];
};

export default useMaterials;
