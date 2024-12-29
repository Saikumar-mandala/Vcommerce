import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SizeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing size details
  useEffect(() => {
    fetch(`http://localhost:4000/api/sizes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.size && typeof data.size === "string") {
          setSize(data.size); // Set the string value of size
        } else if (data.size && typeof data.size === "object" && data.size.size) {
          setSize(data.size.size); // If 'size' is an object, extract the 'size' field
        } else {
          setError("Size not found.");
        }
      })
      .catch((err) => {
        setError("Failed to load size.");
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!size || size.trim().length < 1) {
      setError("Size must be at least 1 character long.");
      return;
    }
    setError(""); // Clear any previous errors
  
    const sizeData = { size };
  
    fetch(`http://localhost:4000/api/sizes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sizeData),
    })
      .then((res) => {
        console.log("Response Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Response Data:", data);
        
        // Check for 'message' field instead of 'success'
        if (data.message === "Size updated successfully") {
          setSuccessMessage("Size updated successfully!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/sizeList");
          }, 1000);
        } else {
          setError("Failed to update size. Please try again.");
        }
      })
      .catch((err) => {
        setError("An error occurred while updating the size.");
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
            Edit Size
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={size}
                placeholder="Size"
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Size
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SizeEdit;
