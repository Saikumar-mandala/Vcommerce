import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuperSubCategoryAdd = () => {
  const [title, setTitle] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/subcategories/allSubCategories"
        );
        if (!response.ok) throw new Error("Failed to load subcategories.");
        const data = await response.json();
        setSubCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || title.trim().length < 3 || !selectedSubCategory) {
      setError("Title must be at least 3 characters long and Subcategory must be selected.");
      return;
    }

    const data = { title, subcategory: selectedSubCategory };

    try {
      const response = await fetch("http://localhost:4000/api/supersubcategories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create Super Sub Category.");

      setSuccessMessage("Super Sub Category created successfully!");
      setTimeout(() => navigate("/superSubCategoryList"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Add Super Sub Category</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Super Sub Category Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-600 mb-2">Select Sub Category</label>
              <select
                id="categorySelect"
                onChange={(e) => {
                  setSelectedSubCategory(e.target.value);
                  setError("");
                }}
                value={selectedSubCategory}
                className="block w-full p-3 border border-gray-300 bg-white rounded-lg"
                disabled={loading}
              >
                <option value="" disabled>{loading ? "Loading..." : "Select Sub Category"}</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>{subCategory.title}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperSubCategoryAdd;
