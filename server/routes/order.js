const router = require("express").Router();
const Order = require("../models/Order");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", async (req, res) => {
  const newItem = new Order(req.body);

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (e) {
    console.log(e)
    res.status(400).json(e);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedItem = await Order.findByIdAndUpdate(
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
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const item = await Order.findById(req.params.id);
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find", async (req, res) => {
  try {
    let item = await Order.find();
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ e: "no orders" });
  }
});

module.exports = router;
