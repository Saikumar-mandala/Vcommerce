import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubCategoryAdd = () => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/categories/allCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || title.trim().length < 3) {
      setError("SubCategory title must be at least 3 characters long.");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    setError("");

    const subcategoryData = {
      title,
      category: selectedCategory, // This should be the category's _id, not categoryname
    };

    fetch("http://localhost:4000/api/subcategories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subcategoryData),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("SubCategory created successfully!");
        setTitle("");
        setSelectedCategory("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/subCategoryList");
        }, 1000);
      })
      .catch((error) => {
        setError("Failed to create SubCategory.");
        console.error(error.message);
      });
  };

  const isFormValid = title.trim().length >= 3 && selectedCategory;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Add SubCategory
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                placeholder="SubCategory Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="SubCategory Title"
              />
            </div>
            <div>
              <label
                htmlFor="categorySelect"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Select Category
              </label>
              <div className="relative">
                <select
                  id="categorySelect"
                  className="block w-full p-3 border border-gray-300 bg-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  required
                >
                  <option value="" disabled>
                    {loading ? "Loading categories..." : "Select Category"}
                  </option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No categories available
                    </option>
                  )}
                </select>

                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryAdd;
