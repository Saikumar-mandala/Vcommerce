import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SuperSubCategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/subcategories/allSubcategories");
        if (!res.ok) throw new Error("Failed to fetch subcategories.");
        const data = await res.json();
        setSubCategories(data);
      } catch (error) {
        setError("Failed to load subcategories.");
      }
    };

    const fetchSuperSubCategoryDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/supersubcategories/${id}`);
        if (!res.ok) throw new Error("Failed to fetch super subcategory details.");
        const data = await res.json();
        setTitle(data.title);
        setSubCategory(data.subCategory?._id || "");
      } catch (error) {
        setError("Failed to load super subcategory details.");
      }
    };

    fetchSubCategories();
    fetchSuperSubCategoryDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    }

    if (!subCategory) {
      setError("Please select a valid subcategory.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/supersubcategories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, subCategory }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update super subcategory.");
      }

      setSuccessMessage("Super subcategory updated successfully!");
      setTimeout(() => navigate("/subcategories"), 1000);
    } catch (error) {
      setError(error.message || "Failed to update super subcategory.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Edit Super SubCategory
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                placeholder="Super SubCategory Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Select SubCategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Super Sub Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperSubCategoryEdit;
