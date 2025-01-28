import React, { useEffect, useState } from "react";
import useBookedSession from "../../hooks/useBookedSession";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BookMaterials = () => {
  const [bookedSession] = useBookedSession(); // Fetch booked sessions
  const [selectedSessionId, setSelectedSessionId] = useState(null); // Track selected session ID
  const [materials, setMaterials] = useState([]); // Store materials for the selected session
  const [loading, setLoading] = useState(false); // Manage loading state
  const [modalOpen, setModalOpen] = useState(false); // Manage modal visibility
  const axiosPublic = useAxiosPublic();

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSessionId(null); // Reset the session ID
  };

  useEffect(() => {
    if (selectedSessionId) {
      const fetchMaterials = async () => {
        setLoading(true);
        try {
          // Fetch materials for the selected session only
          const res = await axiosPublic.get(`/materials/specific/${selectedSessionId}`);
          setMaterials(res.data); // Update materials state with fetched data
        } catch (error) {
         
        } finally {
          setLoading(false);
        }
      };
      fetchMaterials();
    }
  }, [selectedSessionId, axiosPublic]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold  mb-4">Booked Sessions Materials</h1>
      {bookedSession.length === 0 ? (
        <p className="  text-xl text-gray-700">No Materials found.</p>
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
              <h2 className="text-lg font-semibold">{session.title}</h2>
              <p>{session.description}</p>
              <button
                onClick={() => {
                  setSelectedSessionId(session.sessionId); // Set the session ID
                  setModalOpen(true); // Open the modal
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
                    </a>
                    <button
                      onClick={() => {
                        fetch(material.sessionImage)
                          .then((response) => response.blob())
                          .then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download =
                              material.title || "downloaded-image.jpg";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          })
                          .catch((error) =>
                            console.error("Error downloading image:", error)
                          );
                      }}
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
