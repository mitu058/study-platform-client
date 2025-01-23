import React from 'react';
import useMaterials from '../../hooks/useMaterials';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ViewMaterials = () => {
  const [materials, loading, refetch] = useMaterials();
  const axiosPublic = useAxiosPublic();

const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete Materials?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/material-delete/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire(
              "Deleted!",
              "Delete Materials Successfully.",
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  if (loading) {
    return <p>Loading materials...</p>;
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold my-4">All Uploaded Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
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
            <div className='flex justify-between pt-3'>
              <button className='btn btn-sm bg-blue-900 hover:bg-blue-500 text-white'>Update</button>
              <button onClick={()=>handleDelete(material._id)} className='btn btn-sm bg-blue-900 hover:bg-red-500  text-white'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMaterials;
