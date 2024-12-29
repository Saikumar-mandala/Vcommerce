import React, { useState } from "react";

const CreateCoupon = () => {
  const [couponname, setCouponname] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!couponname || !expiry || !discount) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/coupons/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponname,
          expiry,
          discount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setCouponname("");
        setExpiry("");
        setDiscount("");
      } else {
        setError(data.message || "Failed to create coupon");
      }
    } catch (err) {
      setError("An error occurred while creating the coupon");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
              Add Coupon
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Coupon Name Input */}
              <div>
                <label htmlFor="couponname" className="text-sm text-gray-600">Coupon Name</label>
                <input
                  type="text"
                  id="couponname"
                  value={couponname}
                  placeholder="Coupon Name"
                  onChange={(e) => setCouponname(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Expiry Date Input */}
              <div>
                <label htmlFor="expiry" className="text-sm text-gray-600">Expiry Date</label>
                <input
                  type="date"
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Discount Input */}
              <div>
                <label htmlFor="discount" className="text-sm text-gray-600">Discount Percentage</label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Discount"
                  min="0"
                  max="100"
                />
              </div>

              {/* Submit Button */}
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
    </>
  );
};

export default CreateCoupon;
