import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-5 w-64">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">Dashboard</li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="userList">
              <span>Users</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="categoryList">
              <span>Categories</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="SubCategoryList">
              <span>Sub Categories</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="superSubCategoryList">
              <span>Super Sub Categories</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="colorList">
              <span>Colors</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="blogCategoryList">
              <span>Blog Category</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="brandList">
              <span>Brands</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="couponList">
              <span>Coupons</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="sizeList">
              <span>Sizes</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <Link to="productList">
              <span>Products</span>
            </Link>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
