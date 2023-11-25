const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

router.put("/:id", verifyTokenAndAuthor, async (req, res) => {
  if (req.body.psw) {
    req.body.psw = CryptoJS.AES.encrypt(
      req.body.psw,
      process.env.CRYPT_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id/address", verifyTokenAndAuthor, async (req, res) => {
  try {
    const addAddress = await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          address: req.body.address,
        },
      },
      { new: true }
    );
    res.status(200).json(addAddress);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put(
  "/:id/address/:addressid",
  verifyTokenAndAuthor,
  async (req, res) => {
    try {
      const addExAddress = await User.findOneAndUpdate(
        { _id: req.params.id, "address._id": req.params.addressid },
        {
          $set: {
            "address.$": req.body.address,
          },
        }
      );
      res.status(200).json(addExAddress);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

router.delete("/:id", verifyTokenAndAuthor, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get("/find/:id/address/:addressid", verifyToken, async (req, res) => {
  try {
    const userAddress = await User.findById(
      {
        _id: req.params.id,
      },
      { "address._id": req.params.addressid }
    );
    res.status(200).json(userAddress);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(15)
      : await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
