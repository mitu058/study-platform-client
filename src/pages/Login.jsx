import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Swal from "sweetalert2"; // Import SweetAlert

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handelLogin = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success("Successfully logged in");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed to login!");
        Swal.fire({
          title: "Error!",
          text: "Failed to login with provided credentials.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // After successful Google login
        toast.success("Successfully logged in with Google");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/"); // Redirect after sweet alert
        });
      })
      .catch((error) => {
        toast.error("Google login failed!");
        Swal.fire({
          title: "Error!",
          text: "Google login failed. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center container mx-auto px-4 lg:px-8 min-h-screen">
      <div className="w-full lg:w-1/2 flex justify-center p-4">
        <div className="my-8 w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
          <h1 className="text-3xl font-semibold tracking-tight text-center">
            Log In
          </h1>
          <form onSubmit={handelLogin} className="space-y-6">
            <div className="space-y-2 text-sm">
              <label
                htmlFor="username"
                className="block text-base text-zinc-700 dark:text-zinc-300 font-medium"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                placeholder="Enter email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="space-y-2 text-sm relative">
              <label
                htmlFor="password"
                className="block text-base text-zinc-700 dark:text-zinc-300 font-medium"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="password"
                placeholder="Enter password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <div className="flex justify-end text-xs">
                <a
                  href="#"
                  className="text-zinc-700 hover:underline text-base dark:text-zinc-300"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button className="rounded-md w-full bg-blue-950 px-4 text-xl py-2 text-white transition-colors">
              Login
            </button>
          </form>
          <p className="text-center text-base text-zinc-700 dark:text-zinc-300">
            Don&apos;t have an account?
            <Link to="/register" className="font-semibold underline">
              Register
            </Link>
          </p>
          <div className="my-8 flex items-center">
            <hr className="flex-1 border-gray-400" />
            <div className="mx-4 text-gray-400">OR</div>
            <hr className="flex-1 border-gray-400" />
          </div>
          <div className="mt-4">
            <button onClick={googleLogin} className="flex w-1/2 mx-auto justify-center items-center bg-blue-950 text-white space-x-3 btn btn-sm">
              <FaGoogle /> <h1>Google</h1>
            </button>
            {/* <button className="flex bg-blue-950 text-white justify-center items-center space-x-3 btn btn-sm">
              <FaGithub /> <h1>Github</h1>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
