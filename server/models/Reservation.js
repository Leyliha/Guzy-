const mongoose = require("mongoose");
const ReservationSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    datetime: { type: Date, required: true },
    qty: { type: Number, required: true },
    specs: { type: String, required: false },
    code: {type: Number, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
