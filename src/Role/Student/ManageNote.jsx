import React, { useState } from "react";
import useNote from "../../hooks/useNote";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageNote = () => {
  const [note, refetch] = useNote();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

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
            Swal.fire("Deleted!", "Note has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error!", "Note not found or already deleted.", "error");
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

  const handleUpdateClick = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = currentNote;

    try {
      const response = await axiosPublic.put(`/update-note/${currentNote._id}`, {
        title,
        description,
      });

      if (response.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Note has been updated.", "success");
        setIsModalOpen(false);
        refetch();
      } else {
        Swal.fire("Error!", "No changes were made.", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "An error occurred during update.",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Manage Notes</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {note.map((item) => (
          <div key={item._id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-base font-bold text-gray-500 mb-4 text-center">
              {item.studentEmail}
            </p>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateClick(item)}
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

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Update Note</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentNote.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentNote.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNote;
