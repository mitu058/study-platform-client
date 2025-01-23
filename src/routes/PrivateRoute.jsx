import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return (
            <div className='flex h-screen justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        )
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;