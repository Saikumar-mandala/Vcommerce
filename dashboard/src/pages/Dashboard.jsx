import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
