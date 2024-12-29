const mongoose = require("mongoose");
var brandSchema = new mongoose.Schema(
  {
    brandname: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
