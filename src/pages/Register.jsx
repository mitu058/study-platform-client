import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Register = () => {
  const { setUser, updateUserProfile, creatUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const provider = new GoogleAuthProvider();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const role = form.role.value;

    // Validate password
    if (password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "Password should be at least 6 characters long",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Error!",
        text: 'Password should have at least one uppercase, one lowercase, one number, and one special character',
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    creatUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo });
        const userInfo = { name, email, role, photo };

        axiosPublic.post("/user", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Successfully Registered",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch(() => {
        toast.error("Failed to register");
      });
  };

  // Google Login
  const googleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "student", // Default role
      };
      // Post new user data to the backend
      axiosPublic.post("/user", newUser)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Successfully Registered with Google",
              showConfirmButton: false,
              timer: 1500,
            })     
          }
          navigate("/");
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    })
    .catch(() => {
      Swal.fire({
        title: "Error!",
        text: "Google login failed!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
  };

  return (
    <div className="flex justify-center px-4 lg:w-[70%] mx-auto my-12">
      <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
        <div className="mb-6">
          <h2 className="text-center pb-2 text-3xl font-semibold tracking-tight">
            Register Now
          </h2>
          <p className="text-center">Please fill in the form to create an account.</p>
        </div>
        <form onSubmit={handleRegister} className="w-full space-y-4">
          {/* Name Field */}
          <div className="space-y-2 text-sm">
            <label className="block font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="name"
              placeholder="Your Name"
              name="name"
              type="text"
              required
            />
          </div>
          {/* Email Field */}
          <div className="space-y-2 text-sm">
            <label className="block font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="email"
              placeholder="Your Email"
              name="email"
              type="email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="space-y-2 text-sm relative">
            <label className="block font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {/* Photo Field */}
          <div className="space-y-2 text-sm">
            <label className="block font-medium" htmlFor="photo">
              Photo URL
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              placeholder="Photo URL"
              name="photo"
              type="url"
              required
            />
          </div>
          {/* Role Field */}
          <div className="space-y-2 text-sm">
            <label className="block font-medium" htmlFor="role">
              Role
            </label>
            <select
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              name="role"
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              {/* <option value="admin">Admin</option> */}
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-blue-950 text-white"
          >
            Register
          </button>
        </form>
        <p className="text-center pt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-400" />
          <span className="mx-4 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-400" />
        </div>
        {/* Social Buttons */}
        <div className="mt-4 flex justify-evenly">
          <button
            onClick={googleLogin}
            className="flex items-center bg-blue-950 text-white space-x-2 btn btn-sm"
          >
            <FaGoogle />
            <span>Google</span>
          </button>
          <button className="flex bg-blue-950 text-white items-center space-x-2 btn btn-sm">
            <FaGithub />
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
