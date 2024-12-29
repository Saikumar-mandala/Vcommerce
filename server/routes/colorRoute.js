const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getAllColors,
  getColorById,
} = require("../controller/colorController");

const router = express.Router();

router.post("/create", createColor);
router.get("/allColors", getAllColors);
router.delete("/:id", deleteColor);
router.get("/:id", getColorById);
router.put("/:id", updateColor);
module.exports = router;
