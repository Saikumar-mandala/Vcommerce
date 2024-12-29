const Enquiry = require("../models/enquiryModel");

// Create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, mobile, comment } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = new Enquiry({ name, email, mobile, comment });
    await enquiry.save();

    res.status(201).json({ success: true, message: "Enquiry created successfully", data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create enquiry", error: error.message });
  }
};

// Get all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch enquiries", error: error.message });
  }
};

// Get a single enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch enquiry", error: error.message });
  }
};

// Update an enquiry
const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, comment, status } = req.body;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    // Update fields
    if (name) enquiry.name = name;
    if (email) enquiry.email = email;
    if (mobile) enquiry.mobile = mobile;
    if (comment) enquiry.comment = comment;
    if (status) enquiry.status = status;

    await enquiry.save();

    res.status(200).json({ success: true, message: "Enquiry updated successfully", data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update enquiry", error: error.message });
  }
};

// Delete an enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete enquiry", error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
