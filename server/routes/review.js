const router = require("express").Router();
const Review = require("../models/Review");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", async (req, res) => {
  const newRev = new Review(req.body);

  try {
    const savedRev = await newRev.save();
    res.status(200).json(savedRev);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedRev = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRev);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const rev = await Review.findById(req.params.id);
    res.status(200).json(rev);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find", async (req, res) => {
  try {
    const Rev = await Review.find();
    res.status(200).json(Rev);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
