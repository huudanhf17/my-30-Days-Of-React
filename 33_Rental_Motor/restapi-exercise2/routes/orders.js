const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

//Get Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A Order
router.post("/", async (req, res) => {
  const order = new Order({
    status: req.body.status,
    user_id: req.body.user_id,
    motor_id: req.body.motor_id,
    duration: req.body.duration,
  });
  try {
    const newOrder = await order.save();
    res.json(newOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//Specific order
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete order
router.delete("/:orderId", async (req, res) => {
  try {
    const removedOrder = await Order.deleteOne({ _id: req.params.orderId });
    res.json(removedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a order
router.patch("/:orderId", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          status: req.body.status,
          user_id: req.body.user_id,
          motor_id: req.body.motor_id,
          duration: req.body.duration,
        },
      }
    );
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;