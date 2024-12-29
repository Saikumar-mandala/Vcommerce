import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubCategoryEdit = () => {
  const { id } = useParams(); // Get the SubCategory ID from the URL params
  const navigate = useNavigate(); // Navigate to other pages after a successful update
  const [title, setTitle] = useState(""); // State for SubCategory title
  const [category, setCategory] = useState(""); // State for Category ID
  const [categories, setCategories] = useState([]); // State for available categories
  const [error, setError] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setLoading(true);
    // Fetch categories and subcategory details simultaneously
    Promise.all([
      fetch("http://localhost:4000/api/categories/allCategories").then((res) =>
        res.json()
      ),
      fetch(`http://localhost:4000/api/subcategories/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      }),
    ])
      .then(([categoriesData, subcategoryData]) => {
        setCategories(categoriesData);
        setTitle(subcategoryData.title);
        setCategory(subcategoryData.category?._id || "");
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data. Please try again.");
        setLoading(false);
        console.error("Error:", err);
      });
  }, [id]);

  const validateForm = () => {
    if (!title || title.trim().length < 3) {
      setError("Subcategory title must be at least 3 characters long.");
      return false;
    }
    if (!category) {
      setError("Please select a category.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError(""); // Clear any previous errors

    const subcategoryData = {
      title,
      category,
    };

    fetch(`http://localhost:4000/api/subcategories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subcategoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccessMessage("Subcategory updated successfully!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/subcategories"); // Redirect to subcategories list page after 1 second
          }, 1000);
        }
      })
      .catch((err) => {
        setError("Failed to update subcategory.");
        console.error("Error updating subcategory:", err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Edit SubCategory
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <input
                type="text"
                value={title}
                placeholder="SubCategory Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update SubCategory
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryEdit;
