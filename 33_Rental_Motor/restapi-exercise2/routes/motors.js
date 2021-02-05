const express = require("express");
const router = express.Router();
const Motor = require("../models/Motors");

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
    company: req.body.company,
    price: req.body.price,
    status: 1,
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

//Update a Motor
router.patch("/:motorId", async (req, res) => {
  try {
    const updateMotor = await Motor.updateOne(
      { _id: req.params.motorId },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.json(updateMotor);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
