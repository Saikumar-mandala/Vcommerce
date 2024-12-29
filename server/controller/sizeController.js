const Size = require("../models/sizeModel");

// Create a new size
const createSize = async (req, res) => {
  try {
    const { size } = req.body;
    if (!size) {
      return res.status(400).json({ success: false, message: "Size is required" });
    }
    const newSize = new Size({ size });
    await newSize.save();
    res.status(201).json({success: true,message: "Size created successfully", size: newSize,});
  } catch (error) {
    res.status(500).json({success: false,message: "Failed to create size",error: error.message});
  }
};

// Get all sizes
const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ createdAt: -1 }); 
    res.status(200).json({ success: true, size: sizes });
  } catch (error) {
    res.status(500).json({success: false,message: "Failed to fetch sizes",error: error.message});
  }
};

// Get a size by ID
const getSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await Size.findById(id);

    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }

    res.status(200).json({ success: true, size: size });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch size", error: error.message,
      });
  }
};

// Update a size
const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await Size.findById(id);
    if (!size) return res.status(404).json({ message: "Size not found" });
    const updateData = { ...req.body };

    const updatedSize = await Size.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({ message: "Size updated successfully", size: updatedSize });
  } catch (error) {
    console.error("Error updating Size:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete a size
const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSize = await Size.findByIdAndDelete(id);

    if (!deletedSize) {
      return res
        .status(404)
        .json({ success: false, message: "Size not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Size deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete size",
        error: error.message,
      });
  }
};

module.exports = {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
};
