import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams(); // Extract user ID from URL
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing user details
  useEffect(() => {
    fetch(`http://localhost:4000/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFirstname(data.firstname || "");
        setLastname(data.lastname || "");
        setEmail(data.email || "");
        setMobile(data.mobile || "");
      })
      .catch((err) => {
        setError("Failed to load user data.");
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstname || firstname.trim().length < 3) {
      setError("Firstname must be at least 3 characters long.");
      return;
    }

    if (!lastname || lastname.trim().length < 3) {
      setError("Lastname must be at least 3 characters long.");
      return;
    }

    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
      setError("Mobile number must be exactly 10 numeric digits.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");

    const userData = {
      firstname,
      lastname,
      email,
      mobile,
    };

    fetch(`http://localhost:4000/api/user/${id}`, {
      method: "PUT", // Use PUT or PATCH for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/userList"); // Navigate to users list or another page
        }, 1000);
      })
      .catch((err) => {
        setError("Failed to update user.");
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
            Edit User
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={firstname}
                placeholder="Firstname"
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <input
                type="text"
                value={lastname}
                placeholder="Lastname"
                onChange={(e) => setLastname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <input
                type="text"
                value={mobile}
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
