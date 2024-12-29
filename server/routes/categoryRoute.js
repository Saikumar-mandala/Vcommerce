const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  updateCategory,
} = require("../controller/categoryController");
const router = express.Router();
router.post("/create", createCategory);
router.get("/allCategories", getAllCategories);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
module.exports = router;
