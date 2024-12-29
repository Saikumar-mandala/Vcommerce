const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory, 
} = require("../controller/subCategoryController");

router.post("/create", createSubCategory);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);
router.get("/allSubcategories", getAllSubCategories);
router.get("/:id", getSubCategoryById);
router.get("/category/:categoryId", getSubCategoriesByCategory); 
module.exports = router;
