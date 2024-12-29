const express = require("express");
const {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  getUserById,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/allUsers", getAllUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

module.exports = router;
//CHAT GPT
// HUM BOT 
// GPT ZERO 