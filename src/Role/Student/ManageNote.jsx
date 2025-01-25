import React from "react";
import useNote from "../../hooks/useNote";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageNote = () => {
  const [note,refetch] = useNote();
  const axiosPublic = useAxiosPublic();
  console.log("all note", note);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/delete-note/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Material has been deleted.", "success");
            refetch(); // Refresh the materials list after deletion
          } else {
            Swal.fire("Error!", "Material not found or already deleted.", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "An error occurred during deletion.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Manage Notes</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {note.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-base font-bold text-gray-500 mb-4 text-center">
             {item.studentEmail}
            </p>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            
            <div className="flex gap-2">
              <button
                // onClick={() => handleUpdate(note.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNote;
