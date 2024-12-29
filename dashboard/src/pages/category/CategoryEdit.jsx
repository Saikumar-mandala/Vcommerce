import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryEdit = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Define the loading state
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/categories/${id}`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch category data.");
        }

        const data = await response.json();
        setCategoryName(data.categoryName || "");
      } catch (err) {
        setError("Failed to load category data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace and validate category name length
    const trimmedCategoryName = categoryName.trim();

    console.log("Entered category name:", trimmedCategoryName); // Log the category name

    if (!trimmedCategoryName || trimmedCategoryName.length < 3) {
      setError("Category name must be at least 3 characters long.");
      return;
    }

    setError("");

    const categoryData = { categoryName: trimmedCategoryName }; // Ensure the data sent is trimmed

    fetch(`http://localhost:4000/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update category.");
        }
        return res.json();
      })
      .then(() => {
        setSuccessMessage("Category updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/categoryList");
        }, 1000);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Edit Category
          </h1>

          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={categoryName}
                  placeholder="Category Name"
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Update Category
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
