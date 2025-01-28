import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ViewAllMaterials = () => {
  const [product, setProduct] = useState([]);
  const [count, totalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [item, setItem] = useState(6);
  const axiosPublic = useAxiosPublic();

  const numberOfpage = Math.ceil(count / item);
  const pages = [...Array(numberOfpage).keys()];

  // Fetching materials
  useEffect(() => {
    fetch(`https://study-platform-server-mu.vercel.app/viewAll?page=${currentPage}&size=${item}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [currentPage, item]);

  // Fetching total count for pagination
  useEffect(() => {
    fetch("https://study-platform-server-mu.vercel.app/viewAllCount")
      .then((res) => res.json())
      .then((data) => totalCount(data.result));
  }, []);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItem(val);
    setCurrentPage(0);
  };

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
          Swal.fire({
            title: "Deleting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await axiosPublic.delete(`/material-delete/${id}`);

          if (response.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Material has been deleted.", "success");
            // Directly update the state to remove the deleted material
            setProduct((prevProducts) =>
              prevProducts.filter((material) => material._id !== id)
            );
          } else {
            Swal.fire("Error!", "Material could not be found.", "error");
          }
        } catch (error) {
          console.error("Deletion Error:", error);
          Swal.fire("Error!", "An error occurred during deletion.", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((material) => (
          <div
            key={material._id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <img
              src={material.sessionImage}
              alt={material.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{material.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Tutor Email:</strong> {material.tutorEmail}
            </p>
            <a
              href={material.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block mb-4"
            >
              View Material
            </a>
            <button
              onClick={() => handleDelete(material._id)}
              className="btn btn-sm bg-red-600 hover:bg-red-500 text-white w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="my-10 flex justify-center">
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`bg-sky-400 px-4 mx-3`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <select value={item} onChange={handleItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default ViewAllMaterials;
