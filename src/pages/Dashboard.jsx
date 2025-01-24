import {
  FaAd,
  FaBook,
  FaBookReader,
  FaCalendar,
  FaEnvelope,
  FaEye,
  FaHome,
  FaList,
  FaRegEdit,
  FaSearch,
  FaShoppingCart,
  FaUpload,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdLogout, MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";
import { MdManageHistory } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const {userLogOut} = useAuth()
  const navigate = useNavigate()
  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [isStudent] = useStudent()

  const handleLogOut = () =>{
    userLogOut()
    navigate('/login')
  }

  return (
    <div className="flex w-[95%] mx-auto">
      {/* dashboard side bar */}
      <div className="w-72 h-96 bg-white shadow-md rounded-md my-8">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
             <h2 className="text-lg text-end">You are Admin</h2>
              <li>
                <NavLink to="/dashboard/View-all-users">
                <FaUsers></FaUsers>
                  View all users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-all-study-session">
                  <FaBookReader></FaBookReader>
                  View all study session 
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-all-materials">
                  <FaEye></FaEye>
                  View all materials
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}

          {isTutor ? (
            <>
              <h2 className="text-lg text-end">You are Tutor</h2>
              <li>
                <NavLink to="/dashboard/create-study-session">
                  <FaRegEdit></FaRegEdit>
                  Create study session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-study-sessions">
                 <FaEye></FaEye>
                  View all study sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upload-materials">
                <FaUpload></FaUpload>
                  Upload materials 
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/view-materials">
                  <FaEye></FaEye>
                  View all materials
                </NavLink>
              </li>
            
            </>
          ) : (
            <></>
          )}

          {
            isStudent ? 
                <>      
              <h2 className="text-lg text-end">You are Student</h2>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaEye></FaEye>
                  View booked session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                <FaRegEdit></FaRegEdit>
                  Create note
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <MdManageHistory></MdManageHistory>
                  Manage personal notes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaEye></FaEye>
                  View all study materials
                </NavLink>
              </li>
             </>
             : 
              <></>
            
          }
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
            <MdOutlineDashboard></MdOutlineDashboard>
             Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>
          <MdLogout></MdLogout>
              LogOut
            </button>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 ml-10 my-8 ">
        <h1 className="text-center text-2xl font-bold">Welcome your Dashboard</h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
