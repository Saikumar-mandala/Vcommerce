const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vcommerce");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
module.exports = dbConnect;
