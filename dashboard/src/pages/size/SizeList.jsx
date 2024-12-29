import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SizeList = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:4000/api/sizes/allSizes";
  const apiUrl2 = "http://localhost:4000/api/sizes";
  const navigate = useNavigate();
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch sizes");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched sizes:", data);
        setSizes(data.size || []); // Use the 'size' property from the response
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error.message);
        alert("Failed to fetch sizes. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);
  
  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this size ?")) {
      fetch(`${apiUrl2}/${id}`, { method: "DELETE" })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to delete size.");
          }
          return res.json();
        })
        .then((response) => {
          console.log("Delete response:", response);
          if (response.message === "Size deleted successfully") {
            setSizes(sizes.filter((size) => size._id !== id));
            alert("Size deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error during deletion:", error.message);
          alert("An error occurred while deleting the size. Please try again.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">size List</h1>
        <Link to="/addsize">
          <button
            className="bg-black text-white px-4 py-2 min-w-[120px] rounded hover:bg-white hover:text-black focus:outline-none shadow-md mx-2"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 min-w-[120px] rounded hover:bg-blue-600 focus:outline-none shadow-md">
            Add Size
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No</th>
              <th className="px-4 py-2 text-left text-gray-700">Sizes</th>
              <th className="px-4 py-2 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center px-4 py-6">
                  Loading...
                </td>
              </tr>
            ) : sizes.length > 0 ? (
              sizes.map((size, index) => (
                <tr
                  key={size._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{size.size || "N/A"}</td>

                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link to={`/size-view/${size._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-green-600 focus:outline-none shadow-md">
                          View
                        </button>
                      </Link>
                      <Link to={`/size-edit/${size._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-yellow-600 focus:outline-none shadow-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(size._id)}
                        className="bg-red-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-red-600 focus:outline-none shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center px-4 py-6 text-gray-500 italic"
                >
                  No Sizes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeList;
