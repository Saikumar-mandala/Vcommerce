const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const userRouter = require("./routes/authRoute");
const colorRouter = require("./routes/colorRoute");
const blogCategoriesRouter = require("./routes/blogCategoryRoute");
const brandsRouter = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const sizeRoute = require("./routes/sizeRoute");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subCategoryRoute");
const supersubcategoryRoute = require("./routes/superSubCategoryRoute");
const productRoute = require("./routes/productRoute");


require("dotenv").config();
const app = express();
const PORT = 4000;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true,}));
app.use("/api/user", userRouter);
app.use("/api/color", colorRouter);
app.use("/api/blogcategories", blogCategoriesRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/coupons", couponRoute);
app.use("/api/sizes", sizeRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subcategoryRoute);
app.use("/api/supersubcategories", supersubcategoryRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});