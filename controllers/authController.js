const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/*************************** Register *********************/

exports.register = async (req, res) => {
  const new_user = new User({ ...req.body });
  const email = new_user.email;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({ msg: "user already exist" });
  }

  try {
    // Hashed password
    const hash = await CryptoJS.AES.encrypt(
      new_user.password,
      process.env.PASS_SEC
    ).toString();
    new_user.password = hash;
    await new_user.save();
    res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
    console.log("adding user failed", error);
    res.status(401).json({ msg: "Adding user failed" });
  }
};

/*************************** User Login *********************/
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
