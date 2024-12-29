import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const blogCategoryEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blogcategoryname, setBlogcategoryname] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing user details
  useEffect(() => {
    fetch(`http://localhost:4000/api/blogcategories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogcategoryname(data.blogcategoryname || "");
      })
      .catch((err) => {
        setError("Failed to load Blog Category data.");
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blogcategoryname || blogcategoryname.trim().length < 3) {
      setError("blog Category name must be at least 3 characters long.");
      return;
    }
    setError("");
    const blogcategoryData = {blogcategoryname};

    fetch(`http://localhost:4000/api/blogcategories/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(blogcategoryData),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("blog category updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/blogcategoryList"); 
        }, 1000);
      })
      .catch((err) => {
        setError("Failed to update blog category.");
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
            Edit Blog Category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={blogcategoryname}
                placeholder="color"
                onChange={(e) => setBlogcategoryname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update blog category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default blogCategoryEdit;
