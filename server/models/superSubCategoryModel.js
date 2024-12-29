const mongoose = require("mongoose");

const superSubCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});

module.exports = mongoose.model("SuperSubCategory", superSubCategorySchema);
