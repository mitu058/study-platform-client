import React, { useEffect, useState } from "react";
import useBookedSession from "../../hooks/useBookedSession";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BookMaterials = () => {
  const [bookedSession] = useBookedSession(); // Fetch booked sessions
  const [selectedSessionId, setSelectedSessionId] = useState(null); // Track selected session ID
  const [materials, setMaterials] = useState([]); // Store materials for the selected session
  const [loading, setLoading] = useState(false); // Manage loading state
  const [modalOpen, setModalOpen] = useState(false); // Manage modal visibility
  const [error, setError] = useState(""); // Handle errors
  const axiosPublic = useAxiosPublic();

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSessionId(null); // Reset the session ID
    setMaterials([]);
    setError("");
  };

  useEffect(() => {
    if (selectedSessionId) {
      const fetchMaterials = async () => {
        setLoading(true);
        setError("");
        try {         
          const res = await axiosPublic.get(`/book-material/${selectedSessionId}`);
          setMaterials(res.data || []);
        } catch (error) {
          console.error("Error fetching materials:", error);
          setError("No materials found for this session.");
        } finally {
          setLoading(false);
        }
      };
      fetchMaterials();
    }
  }, [selectedSessionId, axiosPublic]);
  

  const handleDownloadImage = async (imageUrl, title) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title || "downloaded-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All study session materials provide tutor.</h1>
      {bookedSession.length === 0 ? (
        <p className="text-xl text-gray-700">No materials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookedSession.map((session) => (
            <div
              key={session._id}
              className="border w-[310px] p-4 rounded-md shadow-md"
            >
              <img
                className="h-44 w-full object-cover rounded-md"
                src={session.sessionImage}
                alt={session.title}
              />
              <h2 className="text-lg font-semibold mt-2">{session.title}</h2>
              <p>{session.description}</p>
              <button
                onClick={() => {
                  console.log("Selected sessionId:", session.sessionId); // Log sessionId
                  setSelectedSessionId(session.sessionId);
                  setModalOpen(true);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                View Materials
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Materials for Session</h2>
            {loading ? (
              <p>Loading materials...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : materials.length === 0 ? (
              <p>No materials available for this session.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((material) => (
                  <div
                    key={material._id}
                    className="border rounded-lg p-4 shadow-md"
                  >
                    <img
                      src={material.sessionImage}
                      alt={material.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="text-lg font-semibold">{material.title}</h3>
                    <a
                      href={material.googleDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      Open Material
                    </a> <br />
                    <button
                      onClick={() =>
                        handleDownloadImage(material.sessionImage, material.title)
                      }
                      className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Download Image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMaterials;
