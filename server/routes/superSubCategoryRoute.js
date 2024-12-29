const express = require("express");
const router = express.Router();
const {
  createSuperSubCategory,
  updateSuperSubCategory,
  deleteSuperSubCategory,
  getAllSuperSubCategories,
  getSuperSubCategoryById,
  getSuperSubCategoriesBySubCategory,
} = require("../controller/superSubCategoryController");
router.post("/create", createSuperSubCategory);
router.put("/:id", updateSuperSubCategory);
router.delete("/:id", deleteSuperSubCategory);
router.get("/allSuperSubcategories", getAllSuperSubCategories);
router.get("/:id", getSuperSubCategoryById);
router.get(
  "/subcategory/:subcategoryId",
  getSuperSubCategoriesBySubCategory
);
module.exports = router;
