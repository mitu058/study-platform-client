import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Form = ({id}) => {
 const [session, setSession] = useState([]);
 const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchSessionDetails = async () => {
          try {
            const { data } = await axiosPublic.get(`/session/${id}`);
            setSession(data);
            console.log(data)
          } catch (error) {
            console.error("Error fetching session details:", error);
          }
        };
    
        fetchSessionDetails();
      }, [id]);
    return (
        <div>
           {session.registrationFee} 
        </div>
    );
};

export default Form;