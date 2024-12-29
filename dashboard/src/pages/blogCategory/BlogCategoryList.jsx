import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogCategoryList = () => {
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:4000/api/blogcategories/allBlogCategories";
  const apiUrl2 = "http://localhost:4000/api/blogcategories";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blog categories");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched blog categories:", data);
        setBlogCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching blog categories:", error.message);
        alert("Failed to fetch blogcategories. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this blog Categories?")
    ) {
      fetch(`${apiUrl2}/${id}`, { method: "DELETE" })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to delete blog Categories.");
          }
          return res.json();
        })
        .then((response) => {
          console.log("Delete response:", response);
          if (response.message === "blog Categories deleted successfully") {
            setColors(colors.filter((color) => color._id !== id));
            alert("blog Category deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error during deletion:", error.message);
          alert(
            "An error occurred while deleting the color. Please try again."
          );
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Color List</h1>
        <Link to="/addBlogCategory">
          <button
            className="bg-black text-white px-4 py-2 min-w-[120px] rounded hover:bg-white hover:text-black focus:outline-none shadow-md mx-2"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 min-w-[120px] rounded hover:bg-blue-600 focus:outline-none shadow-md">
            Add Blog Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No</th>
              <th className="px-4 py-2 text-left text-gray-700">
                Blog Category Name
              </th>
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
            ) : blogCategories.length > 0 ? (
              blogCategories.map((blogCategory, index) => (
                <tr
                  key={blogCategory._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{blogCategory.blogcategoryname}</td>

                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link to={`/blogCategory-view/${blogCategory._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-green-600 focus:outline-none shadow-md">
                          View
                        </button>
                      </Link>
                      <Link to={`/blogCategory-edit/${blogCategory._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-yellow-600 focus:outline-none shadow-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blogCategory._id)}
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
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogCategoryList;
