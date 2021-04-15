// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// dotenv.config();
const verifyAd = async (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    const user = await User.findById(verified._id);
    if (user.type !== "admin") {
      res.status(401).json({
        message: "You don't have permission!",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(400).send("Invaild Token");
  }
};

module.exports = verifyAd;
