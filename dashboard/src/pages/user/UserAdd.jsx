import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserAdd = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    const userData = {
      firstname,
      lastname,
      email,
      mobile,
      password,
    };

    fetch("http://localhost:4000/api/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("User created successfully!");
        setFirstname("");
        setLastname("");
        setMobile("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setError("Failed to create user.");
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
            Registration
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
            <div>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
