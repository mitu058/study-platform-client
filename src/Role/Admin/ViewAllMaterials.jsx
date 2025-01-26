import React, { useEffect, useState } from "react";
import useMaterials from "../../hooks/useMaterials";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ViewAllMaterials = () => {
 const [product, setProduct] = useState([]);
 // for set total data count
 const [count, totalCount] = useState(0);
 // for update current page data
 const [currentPage, setCurrentPage] = useState(0);
 // for set how many item we want to show
 const [item, setItem] = useState(3);

 // for calculate total number of page
 const numberOfpage = Math.ceil(count / item);

 // for looping all pagination items
 const pages = [...Array(numberOfpage).keys()];

 // for get data fetching
 useEffect(() => {
   fetch(`http://localhost:5000/viewAll?page=${currentPage}&size=${item}`)
     .then((res) => res.json())
     .then((data) => setProduct(data));
 }, [currentPage, item]);

 // for get total count of data
 useEffect(() => {
   fetch("http://localhost:5000/viewAllCount")
     .then((res) => res.json())
     .then((data) => totalCount(data.result));
 }, []);

 // handel drop down item
 const handleItemsPerPage = (e) => {
   const val = parseInt(e.target.value);
   setItem(val);
   setCurrentPage(0);
 };

 

  // Handle deleting a material
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

          const response = await useAxiosPublic().delete(`/material-delete/${id}`);
          console.log("Delete Response:", response.data);

          if (response.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Material has been deleted.", "success");
            // Optional: Refetch data to sync with server
            // refetch();
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
      {/* Materials List */}
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
            {page+1}
          </button>
        ))}
        <select value={item} onChange={handleItemsPerPage} name="" id="">
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
