import React from "react";

const DashboardContent = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 w-[300px] h-[200px] text-white p-5 rounded shadow">
          Total Users: 120
        </div>



       <div className="bg-red-500 w-[300px] h-[200px] text-white p-5 rounded shadow">
          Total Users: 120
        </div>

        <div className="bg-green-500 w-[300px] h-[200px] text-white p-5 rounded shadow">
          Total Users: 120
        </div>

        <div className="bg-yellow-500 w-[300px] h-[200px] text-white p-5 rounded shadow">
          Total Users: 120
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
