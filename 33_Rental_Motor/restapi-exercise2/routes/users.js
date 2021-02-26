const express = require("express");
const router = express.Router();
const User = require("../models/User");

//api Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//api Register user
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    type: "unactive",
    coins: 0,
    created_at: Date.now(),
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//api SignIn user
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const newUser = await User.findOne({ email: email });
    if (newUser.password === password) {
      res.json(newUser);
    } else {
      res.json("Email or password is not matched!");
    }
  } catch (err) {
    res.json("Email or password is not matched!");
  }
});

//api Specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//api Delete user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//api Active user
router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          type: req.body.type,
          updated_at: Date.now(),
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//api Change Type user
router.patch("/", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.body.userId },
      {
        $set: {
          type: req.body.type,
          updated_at: Date.now(),
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
