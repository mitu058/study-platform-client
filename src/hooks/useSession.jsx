import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSession = () => {
 const axiosPublic = useAxiosPublic()
     
 const {data: session = [], isPending: loading} = useQuery({
    queryKey: ['session'], 
    queryFn: async() =>{
        const res = await axiosPublic.get('/session');
        return res.data;
    }
})

 return [session, loading] ;
};

export default useSession;
