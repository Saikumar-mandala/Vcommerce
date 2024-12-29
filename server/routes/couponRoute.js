const express = require("express");
const router = express.Router();
const { createCoupon, updateCoupon, deleteCoupon, getAllCoupons, getCouponById,
} = require("../controller/couponController");

router.post("/create", createCoupon);
router.get("/allCoupons", getAllCoupons);
router.delete("/:id", deleteCoupon);
router.get("/:id", getCouponById);
router.put("/:id", updateCoupon);

module.exports = router;
