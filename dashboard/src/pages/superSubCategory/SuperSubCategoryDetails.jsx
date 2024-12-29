import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SubCategoryDetails = () => {
  const { id } = useParams();
  const [blogcategory, setBlogcategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/api/blogcategories/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching blog category details");
        }
        return res.json();
      })
      .then((data) => setBlogcategory(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!blogcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-4 text-blue-600">
          View Details of Blog Category ID: {id}
        </h3>
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">blog Category Name:</span>
            {blogcategory.blogcategoryname}
          </p>
         
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow-md"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default SubCategoryDetails;