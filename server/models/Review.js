const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
    {
        user: { type: String, required: true, trim: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true },
        tags: [{ type: String, required: false }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
