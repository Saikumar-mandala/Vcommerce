import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogCategoryAdd = () => {
  const [blogcategoryname, setBlogcategoryname] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!blogcategoryname || blogcategoryname.trim().length < 3) {
      setError("Blog Category name must be at least 3 characters long.");
      return;
    }

    setError("");

    const blogcategorynameData = {
      blogcategoryname,
    };

    fetch("http://localhost:4000/api/blogcategories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogcategorynameData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("blog category created successfully!");
        setBlogcategoryname("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/blogcategoryList");
        }, 1000);
      })
      .catch((error) => {
        setError("Failed to create blog Category.");
        console.log(error.message);
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
            Add Blog category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={blogcategoryname}
                placeholder="Colorname"
                onChange={(e) => setBlogcategoryname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryAdd;
