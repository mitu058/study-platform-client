import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const ViewAllUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(5);

  const numberOfPages = Math.ceil(count / items);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch data with search and pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/pagination?page=${currentPage}&size=${items}&searchParams=${search}`
        );
        const result = await res.json();
        setData(result.users);
        setCount(result.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, items, search]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  // Handle items per page
  const handleItemsPerPage = (e) => {
    setItems(parseInt(e.target.value));
    setCurrentPage(0);
  };

  // Handle role update
  const handleUpdateRole = async (id, role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make this user an ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/update-role/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });
        const data = await res.json();
        if (data.modifiedCount) {
          Swal.fire("Success!", "User role updated successfully.", "success");
          // Update local state to reflect the change
          setData((prevData) =>
            prevData.map((user) =>
              user._id === id ? { ...user, role } : user
            )
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to update user role.", "error");
      }
    }
  };
  

  return (
    <div className="my-10">
      <div className="mb-10 flex justify-between">
        <h2>All Users: {count}</h2>
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="input input-bordered input-info w-full max-w-xs focus:placeholder-transparent"
        />
      </div>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="lg:w-full mx-auto shadow-xl border border-gray-100">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-start border-b">SL</th>
                <th className="py-3 px-6 text-center border-b">Image</th>
                <th className="py-3 px-6 text-center border-b">Name</th>
                <th className="py-3 px-6 text-start border-b">Role</th>
                <th className="py-3 px-6 text-start border-b">Email</th>
                <th className="py-3 px-6 text-center border-b">Update Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-start border-b">{index + 1}</td>
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">{user.name}</td>
                  <td className="py-4 px-6 text-start border-b">{user.role}</td>
                  <td className="py-4 px-6 text-start border-b">{user.email}</td>
                  <td className="py-4 px-4 text-center border-b">
                    <button
                      onClick={() => handleUpdateRole(user._id, "admin")}
                      className="hover:text-blue-600 flex space-x-1 justify-center items-center bg-blue-200 rounded-lg btn btn-sm"
                    >
                      <FaEdit />
                      <span>Update</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users available</p>
      )}
      <div className="my-10 flex justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 mx-3 ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-sky-400"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <select value={items} onChange={handleItemsPerPage} className="ml-4">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default ViewAllUser;
