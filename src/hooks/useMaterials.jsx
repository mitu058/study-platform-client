import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMaterials = () => {
    const axiosPublic = useAxiosPublic()
     
    const {data: materials = [], isLoading: loading, refetch} = useQuery({
       queryKey: ['materials'], 
       queryFn: async() =>{
           const res = await axiosPublic.get('/materials');
           return res.data;
       }
   })
   
    return [materials, loading, refetch] ;
   
};

export default useMaterials;