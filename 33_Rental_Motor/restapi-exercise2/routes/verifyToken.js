// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// dotenv.config();
const verify = async (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invaild Token");
  }
};

module.exports = verify;
