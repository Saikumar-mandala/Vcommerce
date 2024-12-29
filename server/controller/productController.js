const Product = require("../models/productModel");
const uploadFile = require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subcategory,
      supersubcategory,
      brand,
      color,
      size,
      quantity,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !subcategory ||
      !supersubcategory ||
      !brand ||
      !color ||
      !size ||
      !quantity
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      supersubcategory,
      brand,
      color,
      size,
      quantity,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createProduct,
};
