import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [loginUser,isLoading] = useLoginUser();


    if(loading || isLoading) {
        return (
            <div className='flex h-screen justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        )
    }

    if (user || loginUser) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;