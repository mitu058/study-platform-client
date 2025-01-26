import React, { useState } from "react";
import useMaterials from "../../hooks/useMaterials";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ViewAllMaterials = () => {
  const [materials] = useMaterials();
  const [localMaterials, setLocalMaterials] = useState(materials);
  const axiosPublic = useAxiosPublic();
  

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
          // Show loading alert
          Swal.fire({
            title: "Deleting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await axiosPublic.delete(`/material-delete/${id}`);
          console.log("Delete Response:", response.data); // Debug API response

          if (response.data?.deletedCount > 0) {
            // Optimistically update local state
            const updatedMaterials = localMaterials.filter(
              (material) => material._id !== id
            );
            setLocalMaterials(updatedMaterials);

            Swal.fire("Deleted!", "Material has been deleted.", "success");

            // Optional: Refetch to sync with server
            // refetch();
          } else {
            Swal.fire("Error!", "Material could not be found.", "error");
          }
        } catch (error) {
          console.error("Deletion Error:", error); // Debug API error
          Swal.fire("Error!", "An error occurred during deletion.", "error");
        }
      }
    });
  };

 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {localMaterials.map((material) => (
        <div
          key={material._id}
          className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
        >
          {/* Session Image */}
          <img
            src={material.sessionImage}
            alt={material.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />

          {/* Title */}
          <h2 className="text-lg font-semibold mb-2">{material.title}</h2>

          {/* Tutor Email */}
          <p className="text-gray-600 mb-2">
            <strong>Tutor Email:</strong> {material.tutorEmail}
          </p>

          {/* Google Drive Link */}
          <a
            href={material.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline block mb-4"
          >
            View Material
          </a>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(material._id)}
            className="btn btn-sm bg-red-600 hover:bg-red-500 text-white w-full"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewAllMaterials;
