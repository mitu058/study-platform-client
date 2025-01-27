import React, { useState } from "react";
import useMaterials from "../../hooks/useMaterials";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ViewMaterials = () => {
  // const [materials, loading, refetch] = useMaterials();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [file, setFile] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()

  const { data: tutorMaterials = [], refetch } = useQuery({
    queryKey: ["tutorMaterials", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/materials/${user?.email}`);
      return res.data;
    },
  });

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

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
          const response = await axiosPublic.delete(`/material-delete/${id}`);
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

  const handleUpdate = async (id) => {
    try {
  // Show loading alert
  Swal.fire({
    title: "Updating...",
    text: "Please wait while the material is being updated.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

      let sessionImage = selectedMaterial.sessionImage; // Default to the existing image

      // If a new file is selected, upload it to the image hosting service
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const imgResponse = await fetch(imageHostingApi, {
          method: "POST",
          body: formData,
        });

        const imgData = await imgResponse.json();
        if (imgData.success) {
          sessionImage = imgData.data.url; // Update sessionImage with the new URL
        }
      }

      // Update the material directly with the modified fields
      const response = await axiosPublic.put(`/update-material/${id}`, {
        sessionImage, 
        googleDriveLink, 
      });

      if (response.data.success) {
        Swal.fire("Updated!", "Material has been updated successfully.", "success");
        refetch(); // Refresh materials list
        handleCloseModal(); // Close modal after updating
      } 
    } catch (error) {
      Swal.fire("Error!", "An error occurred during the update.", "error");
    }
  };

  const handleOpenModal = (material) => {
    setSelectedMaterial(material);
    setGoogleDriveLink(material.googleDriveLink);
  };

  const handleCloseModal = () => {
    setSelectedMaterial(null);
    setGoogleDriveLink("");
    setFile(null);
  };



  return (
    <div>
      <h1 className="text-center text-xl font-bold my-4">All Uploaded Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorMaterials.map((material) => (
          <div
            key={material._id}
            className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <img
              src={material.sessionImage}
              alt={material.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-3">{material.title}</h2>
            <p className="text-gray-600">{material.tutorEmail}</p>
            <a
              href={material.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block mt-2"
            >
              Material Link
            </a>
            <div className="flex justify-between pt-3">
              <button
                className="btn btn-sm bg-blue-900 hover:bg-blue-500 text-white"
                onClick={() => handleOpenModal(material)}
              >
                Update
              </button>
              <button
                className="btn btn-sm bg-red-600 hover:bg-red-400 text-white"
                onClick={() => handleDelete(material._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/6">
            <div className="text-center space-y-1">
              <p>
                <strong>Material Name:</strong> {selectedMaterial.title}
              </p>
              <h3 className="text-lg font-bold mb-4">Update Material</h3>
            </div>

            <div className="mt-4">
              <label className="block mb-2">Upload Image:</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input input-bordered pt-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2">Google Drive Link:</label>
              <input
                type="url"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter Google Drive link"
              />
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Close
              </button>
              <button
                onClick={() => handleUpdate(selectedMaterial._id)} // Directly pass the ID to the update function
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                Update Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMaterials;
