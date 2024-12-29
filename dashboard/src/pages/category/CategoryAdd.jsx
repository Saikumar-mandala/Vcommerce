import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryAdd = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || categoryName.trim().length < 3) {
      setError("Category name must be at least 3 characters long.");
      return;
    }
    setError("");
    setIsLoading(true); // Set loading state to true

    const categoryData = { categoryName };

    try {
      const res = await fetch("http://localhost:4000/api/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Category created successfully!");
        setCategoryName("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/categoryList");
        }, 1000);
      } else {
        setError(data.error || "Failed to create Category.");
      }
    } catch (error) {
      setError("Failed to create Category.");
      console.error(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
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
            Add Category
          </h1>
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
              disabled={isLoading} // Disable button while loading
              className={`w-full py-3 rounded-lg focus:outline-none ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isLoading ? "Creating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
