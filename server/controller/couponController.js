const Coupon = require("../models/couponModel");

const createCoupon = async (req, res) => {
  try {
    const { couponname, expiry, discount } = req.body;

    // Validate input fields
    if (!couponname || !expiry || !discount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save the coupon
    const coupon = await Coupon.create({
      couponname,
      expiry,
      discount,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Coupon name must be unique",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while creating the coupon",
      error: error.message,
    });
  }
};
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation
    });

    if (!updatedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: updatedCoupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the coupon",
      error: error.message,
    });
  }
};
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the coupon",
      error: error.message,
    });
  }
};
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving coupons",
      error: error.message,
    });
  }
};
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the coupon",
      error: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById
};
