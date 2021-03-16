const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { registerValidation, loginValidation } = require("../validation");

//Middlewares
router.use(cookieParser());

//api Register user
router.post("/register", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    type: "unactive",
    coins: 0,
    created_at: Date.now(),
  });
  try {
    const newUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.json({ message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists - change to PLAIN OBJECT
  const user = await User.findOne({ email: req.body.email }).lean();
  if (!user) return res.status(400).send("Email or password is wrong!");

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong!");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);
  res.cookie("token", token, {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + 7776000 * 1000),
    httpOnly: true,
    secure: true,
  });
  delete user.password;
  res.json(user);
});

//Logout
router.get("/logout", async (req, res) => {
  res.status(202).clearCookie("token").send("Clear Token");
});

module.exports = router;
