import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import {  useState } from "react";

const ViewAllUser = () => {
const [search , setSearch] = useState("")
  const axiosPublic = useAxiosPublic();
  const [user, loading, refetch] = useRole(search);
 

  const handleUpdateRole = async (id, role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
      cancelButtonText: "Cancle",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosPublic.patch(`/update-role/${id}`, {
          role,
        });

        if (data.modifiedCount) {
          Swal.fire("Success!", "User role updated successfully.", "success");

          // Invalidate the 'user' query to refetch data.
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to update user role.", "error");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched.
  }


  return (
    <div className="my-10">
      <div className="mb-10 flex justify-between">
        <h2>All User: {user.length}</h2>
        <input
          type="text"
          placeholder="Search by name..."
          onBlur={(e) => setSearch(e.target.value)}
         
          className="input input-bordered input-info w-full max-w-xs focus:placeholder-transparent"
        />
      </div>
      {user.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-start border-b">SL</th>
                <th className="py-3 px-6 text-center border-b">Image</th>
                <th className="py-3 px-6 text-center border-b">Name</th>
                <th className="py-3 px-6 text-start border-b">Role</th>
                <th className="py-3 px-6 text-start border-b">Email</th>
                <th className="py-3 px-6 text-center border-b">Update Role</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-start border-b">{index + 1}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">{item.name}</td>
                  <td className="py-4 px-6 text-start border-b">{item.role}</td>
                  <td className="py-4 px-6 text-start border-b">
                    {item.email}
                  </td>
                  <td className="py-4 px-4 text-center border-b">
                    <div className="justify-center items-center flex">
                      <button
                        onClick={() => handleUpdateRole(item._id, "admin")}
                        className="hover:text-blue-600 flex space-x-1 justify-center items-center bg-blue-200 rounded-lg btn btn-sm"
                      >
                        <FaEdit></FaEdit>
                        <h3>Update</h3>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default ViewAllUser;
