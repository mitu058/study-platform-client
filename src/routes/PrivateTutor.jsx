import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';
import Swal from 'sweetalert2';

const PrivateTutor = ({ children }) => {
    const { user, loading, userLogOut } = useAuth();
    const [loginUser] = useLoginUser();
    const location = useLocation();

    if (loading) {
        return (
            <div className='flex h-screen justify-center items-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // if (!user) {
    //     Swal.fire({
    //         title: "Authentication Required",
    //         text: "You need to log in to access this page.",
    //         icon: "error",
    //     });
    //     userLogOut(); // Only logout if there is no user
    //     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    // }

    if (!user || loginUser?.role !== "tutor") {
        Swal.fire({
            title: "Access Denied",
            text: "You do not have permission to access this page.",
            icon: "error",
        });
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default PrivateTutor;
