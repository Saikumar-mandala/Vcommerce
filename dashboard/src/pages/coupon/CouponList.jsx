import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coupons data
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/coupons/allCoupons");
        const result = await response.json();
        if (result.success) {
          setCoupons(result.data); // Set the coupons from 'data'
        } else {
          console.error("Failed to fetch coupons:", result.message);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:4000/api/coupons/${id}`, {
          method: "DELETE",
        });
        setCoupons(coupons.filter((coupon) => coupon._id !== id)); // Remove deleted coupon from state
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons List</h1>
        <Link to="/addcoupon">
          <button className="bg-black text-white px-4 py-2 min-w-[120px] rounded hover:bg-white hover:text-black focus:outline-none shadow-md mx-2">
            Go Back
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 min-w-[120px] rounded hover:bg-blue-600 focus:outline-none shadow-md">
            Add Coupon
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No</th>
              <th className="px-4 py-2 text-left text-gray-700">Coupon Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Expiry Date</th>
              <th className="px-4 py-2 text-center text-gray-700">Discount</th>
              <th className="px-4 py-2 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6">
                  Loading...
                </td>
              </tr>
            ) : coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <tr
                  key={coupon._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{coupon.couponname || "N/A"}</td> {/* Correct field name */}
                  <td className="px-4 py-2">{new Date(coupon.expiry).toLocaleDateString() || "N/A"}</td>
                  <td className="px-4 py-2 text-center">{coupon.discount}%</td>

                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link to={`/coupon-view/${coupon._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-green-600 focus:outline-none shadow-md">
                          View
                        </button>
                      </Link>
                      <Link to={`/coupon-edit/${coupon._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-yellow-600 focus:outline-none shadow-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(coupon._id)}
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
                <td colSpan="5" className="text-center px-4 py-6 text-gray-500 italic">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponList;
