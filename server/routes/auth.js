const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    psw: CryptoJS.AES.encrypt(
      req.body.psw,
      process.env.CRYPT_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});
const isEmail = (email) => {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== "" && email.match(emailFormat)) {
    return true;
  }

  return false;
};

router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    let user;
    if (isEmail(email)) {
      user = await User.findOne({ email: email });
    } else {
      user = await User.findOne({ phone: email });
    }
    if (!user) {
      res.status(401).json("User does not exist in the DB");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.psw,
      process.env.CRYPT_SECRET
    );
    const RealPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    RealPassword !== req.body.psw &&
      res.status(401).json("Wrong login or password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_JWT,
      { expiresIn: "30d" }
    );

    const { psw, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;