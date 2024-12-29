const BlogCategory = require("../models/blogCategoryModel");
const createBlogCategory = async (req, res) => {
  try {
    const { blogcategoryname } = req.body;
    // Validate required fields
    if (!blogcategoryname) {
      return res
        .status(400)
        .json({ message: "Blog Category Name field is required." });
    }

    // Save user data to MongoDB
    const newBlogcategory = new BlogCategory({ blogcategoryname });
    await newBlogcategory.save();
    res
      .status(201)
      .json({
        message: "blog category created successfully",
        blogCategory: newBlogcategory,
      });
  } catch (error) {
    console.error("Error creating blog category:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory)
      return res.status(404).json({ message: "Blog Category not found" });
    const updateData = { ...req.body };

    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    res.json({
      message: "Blog Category updated successfully",
      BlogCategory: updatedBlogCategory,
    });
  } catch (error) {
    console.error("Error updating Blog Category:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
const deleteBlogCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const BlogCategoryToDelete = await BlogCategory.findById(id);
    if (!BlogCategoryToDelete) {
      return res.status(404).json({ message: "Blog Category not found." });
    }

    // Delete the user from the database
    await BlogCategory.findByIdAndDelete(id);

    res.json({
      message: "Blog Category and associated files deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Blog Category:", error.message);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
const getAllBlogCategories = async (req, res) => {
  try {
    const BlogCategories = await BlogCategory.find();
    if (!BlogCategories || BlogCategories.length === 0) {
      return res.status(404).json({ message: "No BlogCategories found." });
    }
    res.json(BlogCategories); // respond with users data
  } catch (err) {
    console.error("Error fetching BlogCategories:", err);
    res
      .status(500)
      .json({ message: "Server error. Unable to fetch BlogCategories." });
  }
};

const getBlogCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) {
      return res.status(404).json({ message: "Blog Category not found" });
    }
    res.status(200).json(blogCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
};
