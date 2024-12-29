const express = require("express");
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controller/enquiryController");

const router = express.Router();

router.post("/create", createEnquiry); 
router.get("/allEnquiries", getAllEnquiries);
router.get("/:id", getEnquiryById); 
router.put("/:id", updateEnquiry); 
router.delete("/:id", deleteEnquiry); 

module.exports = router;
