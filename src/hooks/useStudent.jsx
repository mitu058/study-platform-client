import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useStudent = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic()
     const { data: isStudent, isPending: isStudentLoading } = useQuery({
         queryKey: [user?.email, 'isStudent'],
         enabled: !loading,
         queryFn: async () => {
             console.log('asking or checking is student', user)
             const res = await axiosPublic.get(`/user/student/${user.email}`);
             // console.log(res.data);
             return res.data?.student;
         }
     })
     return [isStudent, isStudentLoading]
 
};

export default useStudent;