const express = require("express");
const {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
} = require("../controller/blogCategoryController");

const router = express.Router();

router.post("/create", createBlogCategory);
router.get("/allBlogCategories", getAllBlogCategories);
router.delete("/:id", deleteBlogCategory);
router.get("/:id", getBlogCategoryById);
router.put("/:id", updateBlogCategory);
module.exports = router;
