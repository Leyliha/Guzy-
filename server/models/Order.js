const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    products: { type: Array, required: true },
    stripeid: { type: String, required: false },
    address: { type: String, required: true },
    name: { type: String, required: true },
    sum: { type: Number, required: true },
    method: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
