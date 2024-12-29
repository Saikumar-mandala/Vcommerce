import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/subcategories/allSubcategories")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setSubcategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch subcategories.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:4000/api/subcategories/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else {
            setSubcategories(
              subcategories.filter((subcategory) => subcategory._id !== id)
            );
          }
        })
        .catch(() => setError("Failed to delete subcategory."));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sub Category List</h1>
        <div className="space-x-2">
          <button
            className="bg-black text-white px-4 py-2 min-w-[120px] rounded hover:bg-white hover:text-black focus:outline-none shadow-md"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
          <Link to="/addsubcategory">
            <button className="bg-blue-500 text-white px-4 py-2 min-w-[120px] rounded hover:bg-blue-600 focus:outline-none shadow-md">
              Add Sub Category
            </button>
          </Link>
        </div>
      </div>
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-4 rounded">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No</th>
              <th className="px-4 py-2 text-left text-gray-700">Sub Category Name</th>
              <th className="px-4 py-2 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center px-4 py-6">
                  Loading...
                </td>
              </tr>
            ) : subcategories.length > 0 ? (
              subcategories.map((subcategory, index) => (
                <tr
                  key={subcategory._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{subcategory.title || "N/A"}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link to={`/subcategory-view/${subcategory._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          View
                        </button>
                      </Link>
                      <Link to={`/subcategory-edit/${subcategory._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(subcategory._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
                  colSpan="3"
                  className="text-center px-4 py-6 text-gray-500 italic"
                >
                  No subcategories found. Add a new one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategoryList;
