const router = require("express").Router();
const Reservation = require("../models/Reservation");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", async (req, res) => {
  const fields = Object.keys(req.body)
  const code = Date.now()
  const object = { code: code }
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    object[element] = req.body[element]
  }
  const newItem = new Reservation(object);
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedItem = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been deleted");
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const item = await Reservation.findById(req.params.id);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e);
  }
});
router.get("/find/code/:code", async (req, res) => {
  try {
    const item = await Reservation.find({ code: req.params.code });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e);
  }
});


router.post("/find", async (req, res) => {
  const { time } = req.body
  try {
    let items;
    if (time) {
      var now = new Date(time);
      var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      items = await Reservation.find({ datetime: { $gte: startOfToday, $lte: startOfTomorrow } })
    } else {
      items = await Reservation.find();
    }
    res.status(200).json(items);
  } catch (e) {
    res.status(404).json({ e: "no reservations" });
  }
});

module.exports = router;
