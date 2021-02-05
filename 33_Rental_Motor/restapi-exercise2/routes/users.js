const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A USER
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    permission: 3,
    coins: 0,
    date: Date.now(),
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a user
router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          password: req.body.password,
          permission: req.body.permission,
          coins: req.body.coins,
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
