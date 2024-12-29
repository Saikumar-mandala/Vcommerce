import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CouponEdit = () => {
  const { id } = useParams(); // Get coupon ID from URL
  const navigate = useNavigate();

  const [couponname, setCouponname] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/coupons/${id}`);
        const result = await response.json();

        if (response.ok) {
          // If response contains 'data' field
          setCouponname(result.data.couponname || "");
          setExpiry(result.data.expiry || "");
          setDiscount(result.data.discount || "");
        } else {
          setError(result.message || "Failed to fetch coupon data");
        }
      } catch (error) {
        setError("An error occurred while fetching coupon data");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!couponname || !expiry || !discount) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/coupons/${id}`, {
        method: "PUT",
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
        setSuccessMessage("Coupon updated successfully!");
        setTimeout(() => navigate("/coupons"), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Failed to update coupon");
      }
    } catch (err) {
      setError("An error occurred while updating the coupon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md mx-auto">
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
              Edit Coupon
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={couponname}
                  onChange={(e) => setCouponname(e.target.value)}
                  placeholder="Coupon Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Update Coupon
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponEdit;
