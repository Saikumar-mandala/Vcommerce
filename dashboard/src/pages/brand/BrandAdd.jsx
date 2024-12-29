import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandAdd = () => {
  const [brandname, setBrandname] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brandname || brandname.trim().length < 3) {
      setError("brand name must be at least 3 characters long.");
      return;
    }
    setError("");
    const brandData = { brandname };

    fetch("http://localhost:4000/api/brands/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("Color created successfully!");
        setBrandname("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/brandList");
        }, 1000);
      })
      .catch((error) => {
        setError("Failed to create brand.");
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
            Add Brand
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={brandname}
                placeholder="Brand Name"
                onChange={(e) => setBrandname(e.target.value)}
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

export default BrandAdd;
