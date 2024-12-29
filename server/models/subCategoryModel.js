const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
