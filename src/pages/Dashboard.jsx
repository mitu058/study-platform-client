import React from 'react';
import { FaBookReader, FaEye, FaHome, FaRegEdit, FaUpload, FaUsers } from "react-icons/fa";
import { MdLogout, MdManageHistory } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLoginUser from "../hooks/useLoginUser";

const Dashboard = () => {
  const { userLogOut } = useAuth();
  const navigate = useNavigate();
  const [loginUser] = useLoginUser();

  const handleLogOut = () => {
    userLogOut();
    navigate('/login');
  };

  return (
    <div className="lg:flex flex-col lg:flex-row w-[95%] mx-auto">
      {/* Dashboard Sidebar */}
      <div className="w-72 h-96 bg-white shadow-md rounded-md my-8">
        <ul className="menu p-4">
          {loginUser?.role === 'admin' && (
            <>
              <h2 className="text-lg text-end">You are Admin</h2>
              <li>
                <NavLink to="/dashboard/View-all-users">
                  <FaUsers />
                  View all users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-all-study-session">
                  <FaBookReader />
                  View all study sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-all-materials">
                  <FaEye />
                  View all materials
                </NavLink>
              </li>
            </>
          )}

          {loginUser?.role === 'tutor' && (
            <>
              <h2 className="text-lg text-end">You are Tutor</h2>
              <li>
                <NavLink to="/dashboard/create-study-session">
                  <FaRegEdit />
                  Create study session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-study-sessions">
                  <FaEye />
                  View all study sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upload-materials">
                  <FaUpload />
                  Upload materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-materials">
                  <FaEye />
                  View all materials
                </NavLink>
              </li>
            </>
          )}

          {loginUser?.role === 'student' && (
            <>
              <h2 className="text-lg text-end">You are Student</h2>
              <li>
                <NavLink to="/dashboard/booked-session">
                  <FaEye />
                  View booked session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/creatNote">
                  <FaRegEdit />
                  Create note
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageNote">
                  <MdManageHistory />
                  Manage personal notes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/book-materials">
                  <FaEye />
                  View all study materials
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Navigation Links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>
              <MdLogout />
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 lg:ml-10 my-8">
        <h1 className="text-center text-2xl font-bold">Welcome to Your Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
