const express = require("express");
const {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
} = require("../controller/sizeController");

const router = express.Router();
router.post("/create", createSize); 
router.get("/allSizes", getAllSizes); 
router.get("/:id", getSizeById);
router.put("/:id", updateSize); 
router.delete("/:id", deleteSize);

module.exports = router;
