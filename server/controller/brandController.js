const Brand = require("../models/brandModel");
const createBrand = async (req, res) => {
  try {
    const { brandname } = req.body;
    // Validate required fields
    if (!brandname) {
      return res
        .status(400)
        .json({ message: "Brand Name field is required." });
    }

    // Save user data to MongoDB
    const newBrand = new Brand({ brandname });
    await newBrand.save();
    res
      .status(201)
      .json({
        message: "Brand created successfully",
        brand: newBrand,
      });
  } catch (error) {
    console.error("Error creating Brand:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    const updateData = { ...req.body };

    const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    console.error("Error updating Brand:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user to be deleted
    const brandToDelete = await Brand.findById(id);
    if (!brandToDelete) {
      return res.status(404).json({ message: "Brand not found." });
    }
    // Delete the user from the database
    await Brand.findByIdAndDelete(id);
    res.json({ message: "Brand and associated files deleted successfully." });
  } catch (error) {
    console.error("Error deleting Brand:", error.message);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found." });
    }
    res.json(brands); // respond with users data
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Server error. Unable to fetch brands." });
  }
};
const getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
};
