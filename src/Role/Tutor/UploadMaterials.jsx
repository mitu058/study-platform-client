import React, { useState } from "react";
import useSession from "../../hooks/useSession";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";

const UploadMaterials = () => {
  const [session] = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [file, setFile] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleOpenModal = (session) => {
    setCurrentSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSession(null);
    setFile(null);
    setGoogleDriveLink("");
  };

  const handleUpload = async () => {
    if (!file || !googleDriveLink) {
      Swal.fire(
        "Error",
        "Please provide both the file and Google Drive link.",
        "error"
      );
      return;
    }

    // Close the modal immediately
    handleCloseModal();

    try {
      // Show a loading indicator
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while your materials are being uploaded.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // Upload the image to imgbb
      const imageFile = new FormData();
      imageFile.append("image", file);

      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (!imageRes.data.success) {
        throw new Error("Image upload failed.");
      }

      const uploadedImageUrl = imageRes.data.data.display_url;

      // Prepare data for MongoDB
      const materialData = {
        sessionId: currentSession._id,
        title: currentSession.title,
        tutorEmail: currentSession.tutorEmail,
        sessionImage: uploadedImageUrl,
        googleDriveLink,
      };

      // Save data to MongoDB
      const response = await axiosPublic.post(
        "/upload-materials",
        materialData
      );

      if (response.data.insertedId) {
        // Show success alert
        Swal.fire("Success", "Materials uploaded successfully.", "success");
      }
    } catch (error) {
      // Show error alert
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "An error occurred during upload. Please try again.",
        "error"
      );
    }
  };

  const approvedSessions = session.filter((item) => item.status === "approved");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload Materials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedSessions.map((item) => (
          <div key={item._id} className="border shadow-lg rounded-lg p-4">
            <img
              src={item.sessionImage}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>
              Status: <span className="text-green-500">{item.status}</span>
            </p>
            <button
              onClick={() => handleOpenModal(item)}
              className="bg-blue-900 text-white rounded-lg px-4 py-2 mt-4"
            >
              Upload Material
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 p-2 rounded-full bg-red-300"
            >
              <IoMdClose />
            </button>

            {/* Modal Content */}
            <div className="text-center space-y-2 sm:space-y-4">
              <p className="text-sm sm:text-base">
                <strong>Session Name:</strong> {currentSession.title}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Session ID:</strong> {currentSession._id}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Tutor Email:</strong> {currentSession.tutorEmail}
              </p>
              <h3 className="text-base sm:text-lg font-bold">
                Upload your Material
              </h3>
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <label className="block text-sm sm:text-base mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input input-bordered pt-2 w-full"
              />
            </div>

            {/* Google Drive Link */}
            <div className="mt-4">
              <label className="block text-sm sm:text-base mb-2">
                Google Drive Link:
              </label>
              <input
                type="url"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter Google Drive link"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleUpload}
                className="bg-blue-900 text-white text-sm sm:text-base rounded-lg px-4 py-2"
              >
                Upload Materials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
