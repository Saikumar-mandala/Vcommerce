import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLaylout";

import UserAdd from "./pages/user/UserAdd";
import UserEdit from "./pages/user/UserEdit";
import UserList from "./pages/user/UserList";
import UserDetails from "./pages/user/UserDetails";

import ColorAdd from "./pages/color/ColorAdd";
import ColorEdit from "./pages/color/ColorEdit";
import ColorList from "./pages/color/ColorList";
import ColorDetails from "./pages/color/ColorDetails";

import BlogCategoryAdd from "./pages/blogCategory/BlogCategoryAdd";
import BlogCategoryList from "./pages/blogCategory/BlogCategoryList";
import BlogCategoryEdit from "./pages/blogCategory/BlogCategoryEdit";
import BlogCategoryDetails from "./pages/blogCategory/BlogCategoryDetails";

import BrandAdd from "./pages/brand/BrandAdd";
import BrandEdit from "./pages/brand/BrandEdit";
import BrandList from "./pages/brand/BrandList";
import BrandDetails from "./pages/brand/BrandDetails";

import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryEdit from "./pages/category/CategoryEdit";
import CategoryList from "./pages/category/CategoryList";
import CategoryDetails from "./pages/category/CategoryDetails";

import CouponAdd from "./pages/coupon/CouponAdd";
import CouponEdit from "./pages/coupon/CouponEdit";
import CouponList from "./pages/coupon/CouponList";
// import CategoryDetails from "./pages/category/CategoryDetails";

import SizeAdd from "./pages/size/SizeAdd";
import SizeEdit from "./pages/size/SizeEdit";
import SizeList from "./pages/size/SizeList";
// import SizeDetails from "./pages/size/CategoryDetails";

import SubCategoryAdd from "./pages/subCategory/SubCategoryAdd";
import SubCategoryEdit from "./pages/subCategory/SubCategoryEdit";
import SubCategoryList from "./pages/subCategory/SubCategoryList";
// import SizeDetails from "./pages/size/CategoryDetails";

import SuperSubCategoryAdd from "./pages/superSubCategory/SuperSubCategoryAdd";
import SuperSubCategoryEdit from "./pages/superSubCategory/SuperSubCategoryEdit";
import SuperSubCategoryList from "./pages/superSubCategory/SuperSubCategoryList";

import ProductAdd from "./pages/product/ProductAdd";
import ProductEdit from "./pages/product/ProductEdit";
import ProductList from "./pages/product/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define MainLayout as a parent route */}
        <Route path="login" element={<Login />} />
        <Route path="adduser" element={<UserAdd />} />
        <Route path="/" element={<MainLayout />}>
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="/user-edit/:id" element={<UserEdit />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/user-view/:id" element={<UserDetails />} />

          <Route path="addcolor" element={<ColorAdd />} />
          <Route path="/color-edit/:id" element={<ColorEdit />} />
          <Route path="/colorList" element={<ColorList />} />
          <Route path="/color-view/:id" element={<ColorDetails />} />

          <Route path="addBlogCategory" element={<BlogCategoryAdd />} />
          <Route path="/blogCategory-edit/:id" element={<BlogCategoryEdit />} />
          <Route path="/blogCategoryList" element={<BlogCategoryList />} />
          <Route
            path="/blogCategory-view/:id"
            element={<BlogCategoryDetails />}
          />

          <Route path="addbrand" element={<BrandAdd />} />
          <Route path="/brand-edit/:id" element={<BrandEdit />} />
          <Route path="/brandList" element={<BrandList />} />
          <Route path="/brand-view/:id" element={<BrandDetails />} />

          <Route path="addcategory" element={<CategoryAdd />} />
          <Route path="/category-edit/:id" element={<CategoryEdit />} />
          <Route path="/categoryList" element={<CategoryList />} />
          <Route path="/category-view/:id" element={<CategoryDetails />} />

          <Route path="addcoupon" element={<CouponAdd />} />
          <Route path="/coupon-edit/:id" element={<CouponEdit />} />
          <Route path="/couponList" element={<CouponList />} />

          <Route path="addsize" element={<SizeAdd />} />
          <Route path="/size-edit/:id" element={<SizeEdit />} />
          <Route path="/sizeList" element={<SizeList />} />

          <Route path="addsubcategory" element={<SubCategoryAdd />} />
          <Route path="/subcategory-edit/:id" element={<SubCategoryEdit />} />
          <Route path="/SubCategoryList" element={<SubCategoryList />} />

          <Route path="addsuperSubcategory" element={<SuperSubCategoryAdd />} />
          <Route
            path="/superSubcategory-edit/:id"
            element={<SuperSubCategoryEdit />}
          />
          <Route
            path="/superSubCategoryList"
            element={<SuperSubCategoryList />}
          />

          <Route path="addproduct" element={<ProductAdd />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
          <Route path="/productList" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
