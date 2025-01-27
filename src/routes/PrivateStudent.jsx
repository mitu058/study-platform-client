import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useLoginUser from "../hooks/useLoginUser";
import Swal from "sweetalert2";

const PrivateStudent = ({ children }) => {
  const { user, loading } = useAuth();
  const [loginUser] = useLoginUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user || loginUser?.role !== "student") {
    Swal.fire({
      title: "Access Denied!",
      text: "You do not have permission to access this page.",
      icon: "error",
    });

    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};

export default PrivateStudent;
