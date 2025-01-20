import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const Register = () => {
  const { setUser, updateUserProfile, creatUser, userLogOut } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPasswoed, setShowPassword] = useState(false);

  const handelRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const role = form.role.value;
    const newUser = { name, email, password, photo,role };
    console.log(newUser)

    // password validation
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
        text: ' "password should be at least one upperCase, one lowerCase, one number, one special charecter"',
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    creatUser(email, password)
      .then((result) => {
        toast.success("Successfully registered");
        navigate("/login");
        userLogOut();
        const user = result.user;
        setUser(user);

        updateUserProfile({ displayName: name, photoURL: photo });
      })
      .catch((error) => {
        toast.error("Failed to register");
      });
  };

  return (
    <div className="flex justify-center px-4 lg:w-[70%] mx-auto my-12">
      <div></div>
      <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
        <div className="mb-6">
          <h2 className="text-center pb-2 text-3xl font-semibold tracking-tight">
            Register Now
          </h2>
          <p className="text-center">
            Please fill in the form to create an account.
          </p>
        </div>
        <form onSubmit={handelRegister} className="w-full space-y-2">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
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
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="_email">
              Email
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="_email"
              placeholder="Your Email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2 text-sm relative">
            <label
              className="text-base font-medium leading-none text-zinc-700 dark:text-zinc-300"
              htmlFor="password_"
            >
              Password
            </label>
            <input
              className="flex text-base h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
              type={showPasswoed ? "text" : "password"}
              placeholder="password"
              name="password"
            />

            <div
              onClick={() => setShowPassword(!showPasswoed)}
              className="btn btn-xs absolute right-3 top-7"
            >
              {showPasswoed ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </div>
          </div>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="_email">
              Photo
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              placeholder="Your photo"
              name="photo"
              type="url"
              required
            />
          </div>
          <div className="space-y-2 text-sm pb-2 text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="role">
              Role
            </label>
            <select
              className="h-10 w-full rounded border  px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              name="role"
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="rounded-md w-full  py-3 bg-gradient-to-r from-orange-700 to-orange-500 hover:from-orange-500 hover:to-orange-700 text-white">
            Register
          </button>
        </form>
        <p className="text-center pt-4 text-sm text-zinc-700 dark:text-zinc-300">
          Already have an account?
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
        <div className="my-3 flex items-center">
          <hr className="flex-1 border-gray-400" />
          <div className="mx-4 text-gray-400">OR</div>
          <hr className="flex-1 border-gray-400" />
        </div>
        <div className="mt-4 flex justify-evenly">
          <button className="flex justify-center items-center space-x-3 btn btn-sm">
            <FaGoogle></FaGoogle>
            <h1>Google</h1>
          </button>
          <button className="flex justify-center items-center space-x-3 btn btn-sm">
            <FaGithub></FaGithub>
            <h1>Github</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
