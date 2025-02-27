import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);

  const links = (
    <div className="space-x-7">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-bold text-base ${isActive ? "text-[#e91e63]" : "hover:text-warning"}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `font-bold text-base ${isActive ? "text-[#e91e63]" : "hover:text-warning"}`
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/contactUs"
        className={({ isActive }) =>
          `font-bold text-base ${isActive ? "text-[#e91e63]" : "hover:text-warning"}`
        }
      >
        Contact Us
      </NavLink>
    </div>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="text-white lg:px-12 navbar bg-blue-950">
        {/* Left Side - Logo */}
        <div className="navbar-start">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-red-500 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <span className="text-2xl font-bold hidden md:block">SkillStack</span>
          </Link>
        </div>

        {/* Center - Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 font-bold">{links}</ul>
        </div>

        {/* Right Side - Login/Register or Profile Dropdown */}
        <div className="navbar-end space-x-4">
          {user && user.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-pink-700 space-y-1"
              >
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/tutors">Tutors</NavLink>
                </li>
                <li>
                  <button className="btn btn-sm bg-pink-600  text-white" onClick={userLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full bg-[#e91e63] hover:bg-[#d81b60] px-5 py-2 text-white transition-all duration-300 hover:scale-90"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#e91e63] hover:bg-[#d81b60] px-4 py-2 text-white transition-all duration-300 hover:scale-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
