const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    supersubcategory: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
