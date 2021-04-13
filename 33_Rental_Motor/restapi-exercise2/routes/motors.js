const express = require("express");
const { now } = require("mongoose");
const router = express.Router();
const Motor = require("../models/Motors");
const cookieParser = require("cookie-parser");
const verify = require("./verifyToken");

//Middlewares
router.use(cookieParser());

//Get Motor
router.get("/", async (req, res) => {
  try {
    const motors = await Motor.find();
    res.json(motors);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A Motor
router.post("/", async (req, res) => {
  const motor = new Motor({
    name: req.body.name,
    color: req.body.color,
    cc: req.body.cc,
    brand: req.body.brand,
    status: req.body.status,
    is_refresh: req.body.is_refresh,
    price_oneday: req.body.price_oneday,
    price_oneweek: req.body.price_oneweek,
    price_onemonth: req.body.price_onemonth,
    create_at: Date.now(),
  });
  try {
    const newMotor = await motor.save();
    res.json(newMotor);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific Motor
router.get("/:motorId", async (req, res) => {
  try {
    const motor = await Motor.findById(req.params.motorId);
    res.json(motor);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Motor
router.delete("/:motorId", async (req, res) => {
  try {
    const removedMotor = await Motor.remove({ _id: req.params.motorId });
    res.json(removedMotor);
  } catch (err) {
    res.json({ message: err });
  }
});

//Refresh a Motor
router.patch("/", verify, async (req, res) => {
  try {
    const updateMotor = await Motor.updateOne(
      { _id: req.body.motorId },
      {
        $set: {
          is_refresh: req.body.is_refresh,
          updated_at: Date.now(),
        },
      }
    );
    res.json(updateMotor);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Motor
router.patch("/update", async (req, res) => {
  try {
    const updateMotor = await Motor.updateOne(
      { _id: req.body.motorId },
      {
        $set: {
          name: req.body.name,
          cc: req.body.cc,
          price_oneday: req.body.price_oneday,
          price_oneweek: req.body.price_oneweek,
          price_onemonth: req.body.price_onemonth,
          status: req.body.status,
          is_refresh: req.body.is_refresh,
          updated_at: Date.now(),
        },
      }
    );
    res.json(updateMotor);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
