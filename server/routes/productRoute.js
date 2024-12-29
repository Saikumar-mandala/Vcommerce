const express = require("express");
const { createProduct } = require("../controller/productController");
const router = express.Router();

router.post("/create", createProduct);
module.exports = router;














































// router.get("/allProducts", getAllUser);
// router.delete("/:id", deleteUser);
// router.get("/userId/:id", getUserById);
// router.put("/:id", userProfile.single("imageUrl"), updateUser);