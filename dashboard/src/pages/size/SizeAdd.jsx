import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SizeAdd = () => {
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!size || size.trim().length < 1) {
      setError("size must be at least 1 characters long.");
      return;
    }

    setError("");

    const sizeData = {
      size,
    };

    fetch("http://localhost:4000/api/sizes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sizeData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("Size created successfully!");
        setSize("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/sizeList");
        }, 1000);
      })
      .catch((error) => {
        setError("Failed to create Size.");
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
            Add Size
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={size}
                placeholder="Enter size"
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SizeAdd;
