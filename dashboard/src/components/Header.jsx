import React from "react";

const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span>Welcome, Admin</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
