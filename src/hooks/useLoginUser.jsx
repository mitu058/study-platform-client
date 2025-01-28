import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useLoginUser = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic()
     const { data: loginUser } = useQuery({
         queryKey: [user?.email, 'loginUser'],
         enabled: !loading,
         queryFn: async () => {
             const res = await axiosPublic.get(`/alluser/${user?.email}`);
             // console.log(res.data);
             return res.data[0]
         }
     })
     return [loginUser]
};

export default useLoginUser;