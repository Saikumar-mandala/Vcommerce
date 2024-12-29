const Color = require("../models/colorModel");
const createColor = async (req, res) => {
  try {
    const { colorname } = req.body;
    if (!colorname) {
      return res.status(400).json({ message: "Color name is required." });
    }
    const existingColor = await Color.findOne({ colorname });
    if (existingColor) {
      return res.status(409).json({ message: "Color already exists." });
    }
    const newColor = new Color({ colorname });
    await newColor.save();
    res.status(201).json({ message: "Color created successfully", color: newColor });
  } catch (error) {
    console.error("Error creating color:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findById(id);
    if (!color) {
      return res.status(404).json({ message: "Color not found." });
    }
    const { colorname } = req.body;
    if (!colorname) {
      return res.status(400).json({ message: "Color name is required for update." });
    }

    color.colorname = colorname;
    const updatedColor = await color.save();

    res.json({ message: "Color updated successfully", color: updatedColor });
  } catch (error) {
    console.error("Error updating color:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const colorToDelete = await Color.findById(id);
    if (!colorToDelete) {
      return res.status(404).json({ message: "Color not found." });
    }
    await Color.findByIdAndDelete(id);
    res.json({ message: "Color deleted successfully." });
  } catch (error) {
    console.error("Error deleting color:", error.message);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find(); // Retrieve all colors
    res.json(colors); // Return an empty array if no colors exist
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    res.status(500).json({ message: "Server error. Unable to fetch colors." });
  }
};
const getColorById = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findById(id);
    if (!color) {
      return res.status(404).json({ message: "Color not found." });
    }
    res.status(200).json(color);
  } catch (error) {
    console.error("Error fetching color by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getAllColors,
  getColorById,
};
