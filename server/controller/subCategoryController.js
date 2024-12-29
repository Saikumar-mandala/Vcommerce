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
// General Error Handler
const handleError = (res, error, statusCode = 500) => {
  console.error("Error:", error);
  res
    .status(statusCode)
    .json({ message: "An error occurred", error: error.message });
};
// Create SubCategory
const createSubCategory = async (req, res) => {
  try {
    const { title, category } = req.body;

    // Validate Category ID
    if (!validateObjectId(category))
      return sendErrorResponse(res, "Invalid category ID.");

    const foundCategory = await Category.findById(category);
    if (!foundCategory)
      return sendErrorResponse(res, "Category not found.", 404);

    if (!title || title.trim().length < 3)
      return sendErrorResponse(res, "Title must be at least 3 characters.");

    const newSubCategory = new SubCategory({ title, category });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const { title, category } = req.body;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID format" });
    }

    // Find the subcategory by ID
    const subcategory = await SubCategory.findById(id);

    // Check if subcategory exists
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Validate category ID if provided
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: "Invalid category ID format" });
    }

    // If category is provided, ensure that the category exists
    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    // Validate title if provided
    if (title && title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    // Update the subcategory
    if (title) subcategory.title = title;
    if (category) subcategory.category = category;

    const updatedSubCategory = await subcategory.save();

    // Return the updated subcategory
    res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory: updatedSubCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error.message);
    res.status(500).json({
      message: "Server error. Unable to update subcategory.",
      error: error.message,
    });
  }
};
const deleteSubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID format" });
    }

    // Find and delete the subcategory by ID
    const subcategory = await SubCategory.findByIdAndDelete(id);

    // Check if the subcategory was found and deleted
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Return a success message after deletion
    res.status(200).json({
      message: "Subcategory deleted successfully",
      subcategory: subcategory,
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error.message);
    res.status(500).json({
      message: "Server error. Unable to delete subcategory.",
      error: error.message,
    });
  }
};
const getAllSubCategories = async (req, res) => {
  try {
    // Fetch all subcategories, populating the associated category field
    const subcategories = await SubCategory.find().populate(
      "category",
      "title"
    );

    // If no subcategories are found, return a 404 response
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found" });
    }

    // Return the list of subcategories
    res.status(200).json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch subcategories.",
      error: error.message,
    });
  }
};
const getSubCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID" });
    }

    // Fetch the subcategory by ID, populating the associated category information
    const subcategory = await SubCategory.findById(id).populate(
      "category",
      "title"
    );

    // If subcategory is not found, return a 404 response
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Return the subcategory with the populated category data
    res.status(200).json(subcategory);
  } catch (error) {
    console.error("Error fetching subcategory:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch subcategory.",
      error: error.message,
    });
  }
};
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    console.log("Fetching subcategories for Category ID:", categoryId);

    // Find subcategories associated with the given category ID
    const subcategories = await SubCategory.find({ category: categoryId });

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found for this category." });
    }

    return res.status(200).json(subcategories);
  } catch (error) {
    console.error("Error in getSubCategoriesByCategory:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};





module.exports = {
  handleError,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory,
};
