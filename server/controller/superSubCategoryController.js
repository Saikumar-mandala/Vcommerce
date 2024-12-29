const SubCategory = require("../models/subCategoryModel");
const SuperSubCategory = require("../models/superSubCategoryModel");
const mongoose = require("mongoose");
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
// Create Super Sub Category
const createSuperSubCategory = async (req, res) => {
  try {
    const { title, subcategory } = req.body;

    if (!validateObjectId(subcategory))
      return sendErrorResponse(res, "Invalid subcategory ID.");

    const foundSubCategory = await SubCategory.findById(subcategory);
    if (!foundSubCategory)
      return sendErrorResponse(res, "Subcategory not found.");

    if (!title || title.trim().length < 3)
      return sendErrorResponse(
        res,
        "Title must be at least 3 characters long."
      );

    const newSuperSubCategory = new SuperSubCategory({
      title,
      subcategory,
    });

    await newSuperSubCategory.save();
    res.status(201).json(newSuperSubCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateSuperSubCategory = async (req, res) => {
  const { subcategory, title } = req.body;

  try {
    // Check if the SuperSubCategory exists
    const superSubCategory = await SuperSubCategory.findById(req.params.id);

    if (!superSubCategory) {
      return res.status(404).json({ error: "Super Sub Category not found" });
    }

    // Validate subcategory ID if provided
    if (subcategory && !mongoose.Types.ObjectId.isValid(subcategory)) {
      return res.status(400).json({ error: "Invalid subcategory ID" });
    }

    // Check if the subcategory exists, if it's provided
    if (subcategory) {
      const foundSubCategory = await SubCategory.findById(subcategory);
      if (!foundSubCategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
    }

    // Update the SuperSubCategory
    const updatedSuperSubCategory = await SuperSubCategory.findByIdAndUpdate(
      req.params.id,
      {
        title: title || superSubCategory.title,
        subcategory: subcategory || superSubCategory.subcategory,
      },
      { new: true }
    );

    if (!updatedSuperSubCategory) {
      return res
        .status(404)
        .json({ error: "Super Sub Category update failed" });
    }

    res.status(200).json({
      message: "Super Sub Category updated successfully",
      superSubCategory: updatedSuperSubCategory,
    });
  } catch (error) {
    console.error("Error updating Super Sub Category:", error.message);
    res.status(500).json({
      message: "Server error. Unable to update Super Sub Category.",
      error: error.message,
    });
  }
};
const deleteSuperSubCategory = async (req, res) => {
  try {
    // Check if the SuperSubCategory exists
    const superSubCategory = await SuperSubCategory.findById(req.params.id);

    if (!superSubCategory) {
      return res.status(404).json({ error: "Super Sub Category not found" });
    }

    // Delete the SuperSubCategory
    await SuperSubCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Super Sub Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Super Sub Category:", error.message);
    res.status(500).json({
      message: "Server error. Unable to delete Super Sub Category.",
      error: error.message,
    });
  }
};
const getAllSuperSubCategories = async (req, res) => {
  try {
    // Retrieve all Super Sub Categories and populate subCategory and category data
    const superSubCategories = await SuperSubCategory.find().populate({
      path: "subcategory", // Populate the subcategory field
      populate: { path: "category" }, // Populate the category field inside subcategory
    });

    // If no super sub-categories are found
    if (!superSubCategories || superSubCategories.length === 0) {
      return res.status(404).json({ message: "No Super Sub Categories found" });
    }

    // Respond with the list of Super Sub Categories
    res.status(200).json(superSubCategories);
  } catch (error) {
    console.error("Error fetching Super Sub Categories:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch Super Sub Categories.",
      error: error.message,
    });
  }
};
const getSuperSubCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid super subcategory ID" });
    }

    // Find the Super Sub Category by ID and populate related fields
    const superSubCategory = await SuperSubCategory.findById(id).populate({
      path: "subcategory", // Populate the subcategory field
      populate: { path: "category" }, // Populate the category field inside subcategory
    });

    // If the Super Sub Category is not found
    if (!superSubCategory) {
      return res.status(404).json({ error: "Super Sub Category not found" });
    }

    // Return the found Super Sub Category
    res.status(200).json(superSubCategory);
  } catch (error) {
    console.error("Error fetching Super Sub Category:", error.message);
    res.status(500).json({
      message: "Server error. Unable to fetch the Super Sub Category.",
      error: error.message,
    });
  }
};
const getSuperSubCategoriesBySubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    // Validate if `subcategoryId` is provided
    if (!subcategoryId) {
      return res.status(400).json({ error: "Subcategory ID is required" });
    }

    // Fetch super subcategories by subcategory ID
    const supersubcategories = await SuperSubCategory.find({
      subcategory: subcategoryId,
    });

    // Return the result
    res.status(200).json(supersubcategories);
  } catch (error) {
    console.error("Error fetching super subcategories:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
module.exports = {
  handleError,
  createSuperSubCategory,
  updateSuperSubCategory,
  deleteSuperSubCategory,
  getAllSuperSubCategories,
  getSuperSubCategoryById,
  getSuperSubCategoriesBySubCategory,
};
