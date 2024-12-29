const mongoose = require("mongoose");
const colorSchema = new mongoose.Schema(
  {
    colorname: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Color", colorSchema);
