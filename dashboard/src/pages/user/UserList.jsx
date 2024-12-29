import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:4000/api/user/allUsers";
  const apiUrl2 = "http://localhost:4000/api/user";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
        alert("Failed to fetch users. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`${apiUrl2}/${id}`, { method: "DELETE" })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to delete user.");
          }
          return res.json();
        })
        .then((response) => {
          console.log("Delete response:", response);
          if (response.message === "User deleted successfully") {
            setUsers(users.filter((user) => user._id !== id));
            alert("User deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error during deletion:", error.message);
          alert("An error occurred while deleting the user. Please try again.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User List</h1>
        
        <Link to="/adduser">
        <button
            className="bg-black text-white px-4 py-2 min-w-[120px] rounded hover:bg-white hover:text-black focus:outline-none shadow-md mx-2"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 min-w-[120px] rounded hover:bg-blue-600 focus:outline-none shadow-md">
            Add Color
          </button>
        </Link>
      
      
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No</th>
              <th className="px-4 py-2 text-left text-gray-700">First Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Last Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Mobile</th>
              <th className="px-4 py-2 text-left text-gray-700">Role</th>
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
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.firstname || "N/A"}</td>
                  <td className="px-4 py-2">{user.lastname || "N/A"}</td>
                  <td className="px-4 py-2">{user.email || "N/A"}</td>
                  <td className="px-4 py-2">{user.mobile || "N/A"}</td>
                  <td className="px-4 py-2">{user.role || "N/A"}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link to={`/user-view/${user._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-green-600 focus:outline-none shadow-md">
                          View
                        </button>
                      </Link>
                      <Link to={`/user-edit/${user._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 min-w-[80px] rounded hover:bg-yellow-600 focus:outline-none shadow-md">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
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

export default UserList;
