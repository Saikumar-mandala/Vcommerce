const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const SuperSubCategory = require("../models/superSubCategoryModel");
// Utility Function for ObjectId Validation
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// Centralized error response handler
const sendErrorResponse = (res, message, statusCode = 400) => {
  res.status(statusCode).json({ error: message });
};
// Create Category
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName)
      return sendErrorResponse(res, "Category Name is required.");
    const newCategory = new Category({ categoryName });
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
const getAllCategories = async (req, res) => {
  try {
    // Fetch categories from the database
    const categories = await Category.find();

    // Check if no categories were found
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    // Optionally, populate subcategories or any related data
    // const categories = await Category.find().populate("subcategories");

    res.status(200).json(categories); // Return categories
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch categories.",
      error: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the category to delete
    const categoryToDelete = await Category.findById(id);
    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Optionally, handle cascading deletions (e.g., delete related subcategories)
    await SubCategory.deleteMany({ category: id });
    await SuperSubCategory.deleteMany({ category: id });

    // Delete the category
    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Category and its related data deleted successfully." });
  } catch (error) {
    console.error("Error deleting Category:", error.message);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid category ID format" });
    }
    // Find the category by ID
    // optional
    // const category = await Category.findById(id).populate('subCategories');
    const category = await Category.findById(id);
    // Check if category is not found
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Return the found category
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch category.",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid category ID format" });
    }

    // Find the category by ID
    const category = await Category.findById(id);

    // Check if category is not found
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Validate required field 'categoryName'
    if (!categoryName || categoryName.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Category name must be at least 3 characters long" });
    }

    // Update the category data
    category.categoryName = categoryName; // Update the category name with the new one
    const updatedCategory = await category.save();

    // Return the updated category
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({
      message: "Server error. Unable to update category.",
      error: error.message,
    });
  }
};
module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  updateCategory,
};
