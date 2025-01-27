import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMaterials = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const { data: materials = [], isLoading: loadingMaterials, refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials');
      return  res.data 
    },
  });

  return [materials, loadingMaterials, refetch];
};

export default useMaterials;
