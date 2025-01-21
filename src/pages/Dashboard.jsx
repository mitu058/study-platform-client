import {
  FaAd,
  FaBook,
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
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";
import { MdManageHistory } from "react-icons/md";

const Dashboard = () => {
  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [isStudent] = useStudent()

  return (
    <div className="flex container mx-auto">
      {/* dashboard side bar */}
      <div className="w-72  bg-orange-400 my-8">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
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
                <NavLink to="/dashboard/addItems">
                 <FaEye></FaEye>
                  View all study sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                <FaUpload></FaUpload>
                  Upload materials 
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
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
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
