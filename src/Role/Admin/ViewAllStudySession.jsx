import React, { useState } from "react";
import Swal from "sweetalert2";
import useSession from "../../hooks/useSession";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ViewAllStudySession = () => {
  const [session, loading, refetch] = useSession();
  const axiosPublic = useAxiosPublic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleUpdateStatus = async (id, status, fee = 0) => {
    try {
      const response = await axiosPublic.patch(`/update-status/${id}`, { status, registrationFee: fee });
      if (response.modifiedCount) {
        Swal.fire("Success!", "Session status updated successfully.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error updating session status:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update session status.",
        text: error.message,
      });
    }
  };

  const openModal = (session) => {
    setCurrentSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSession(null);
    setIsPaid(false);
    setAmount(0);
  };

  const handleApprove = async () => {
    try {
      const fee = isPaid ? amount : 0;
      const status = "approved";
      await handleUpdateStatus(currentSession._id, status, fee);
      closeModal();
    } catch (error) {
      console.error("Error approving session:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await handleUpdateStatus(id, "rejected");
    } catch (error) {
      console.error("Error rejecting session:", error);
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  const pendingSessions = session.filter((item) => item.status === "pending");
  const approvedSessions = session.filter((item) => item.status === "approved");
  const rejectedSessions = session.filter((item) => item.status === "rejected");

  return (
    <div className="my-10">
      <h2 className="pb-5">Pending Study Sessions: {pendingSessions.length}</h2>
      {pendingSessions.length > 0 && (
        <div className="overflow-x-auto mb-5">
          <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-start border-b">SL</th>
                <th className="py-3 px-6 text-center border-b"> Image</th>
                <th className="py-3 px-6 text-start border-b">Title</th>
                <th className="py-3 px-6 text-start border-b">Tutor Name</th>
                <th className="py-3 px-6 text-start border-b">Tutor Email</th>
                <th className="py-3 px-6 text-start border-b">Status</th>
                <th className="py-3 px-6 text-center border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingSessions.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-start border-b">{index + 1}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={item.sessionImage}
                      alt={item.title}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">{item.title}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorName}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorEmail}</td>
                  <td className="py-4 px-6 text-start border-b">{item.status}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openModal(item)}
                        className="bg-blue-300 rounded-lg btn btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        className="bg-red-300 rounded-lg btn btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Approved Sessions Table */}
      <h2 className="pb-5">Approved Study Sessions: {approvedSessions.length}</h2>
      {approvedSessions.length > 0 && (
        <div className="overflow-x-auto mb-5">
          <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-start border-b">SL</th>
                <th className="py-3 px-6 text-center border-b"> Image</th>
                <th className="py-3 px-12 text-start border-b">Title</th>
                <th className="py-3 px-3 text-start border-b">Tutor Name</th>
                <th className="py-3 px-6 text-start border-b">Tutor Email</th>
                <th className="py-3 px-6 text-start border-b">Status</th>
                <th className="py-3 px-14 text-start border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {approvedSessions.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-start border-b">{index + 1}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={item.sessionImage}
                      alt={item.title}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">{item.title}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorName}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorEmail}</td>
                  <td className="py-4 px-6 text-start border-b">{item.status}</td>
                  <td className="py-4 px-6 text-start border-b  space-x-3">
                    <button className="btn btn-sm btn-primary">update</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejected Sessions Table */}
      <h2 className="pb-5">Rejected Study Sessions: {rejectedSessions.length}</h2>
      {rejectedSessions.length > 0 && (
        <div className="overflow-x-auto mb-5">
          <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-start border-b">SL</th>
                <th className="py-3 px-6 text-center border-b">Image</th>
                <th className="py-3 px-6 text-start border-b">Title</th>
                <th className="py-3 px-6 text-start border-b">Tutor Name</th>
                <th className="py-3 px-6 text-start border-b">Tutor Email</th>
                <th className="py-3 px-6 text-start border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedSessions.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-start border-b">{index + 1}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={item.sessionImage}
                      alt={item.title}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">{item.title}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorName}</td>
                  <td className="py-4 px-6 text-start border-b">{item.tutorEmail}</td>
                  <td className="py-4 px-6 text-start border-b">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Approve Session</h3>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="mr-2"
              />
              Is this session paid?
            </label>
            {isPaid && (
              <div className="mb-4">
                <label className="block mb-2">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input input-bordered w-full"
                  placeholder="Enter amount"
                />
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-300 rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySession;
