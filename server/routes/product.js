const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newItem = new Product(req.body);

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedItem = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let item;

    if (qNew) {
      item = await Product.find().sort({ createdAt: -1 }).limit(50);
    } else if (qCategory) {
      item = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      item = await Product.find();
    }

    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ e: "no products" });
  }
});

module.exports = router;
