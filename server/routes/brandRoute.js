const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
} = require("../controller/brandController");
const router = express.Router();
router.post("/create", createBrand);
router.get("/allBrands", getAllBrands);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrandById);
router.put("/:id", updateBrand);
module.exports = router;
