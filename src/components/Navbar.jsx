import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const links = (
    <div className="space-x-7">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "text-[#e91e63]" : "hover:text-warning"
          }`
        }
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/Reviews"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "text-[#e91e63]" : "hover:text-warning"
          }`
        }
      >
        <span>All Reviews</span>
      </NavLink>
      <NavLink
        to="/aboutUs"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "text-[#e91e63]" : "hover:text-warning"
          }`
        }
      >
        <span>About Us</span>
      </NavLink>
    </div>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="text-white navbar bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
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
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <a className="text-2xl font-bold md:block lg:block hidden">
            SkillStack
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 font-bold">{links}</ul>
        </div>
        <div className="navbar-end space-x-4">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
