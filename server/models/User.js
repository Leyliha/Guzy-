const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    fname: String,
    lname: String,
    psw: { type: String, required: true },
    address: [
      {
        name: String,
        phone: String,
        email: String,
        row1: String,
        row2: String,
        comment: String,
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
