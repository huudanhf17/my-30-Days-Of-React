const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Order = require("../models/Order");

//Get Lasted Orders
//https://stackoverflow.com/questions/43374112/filter-unique-values-from-an-array-of-objects
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    const lastedOrders = [];
    orders.reverse().forEach((value) => {
      if (!lastedOrders.includes({ motor_id: value.motor_id })) {
        lastedOrders.push(value);
      }
    });
    res.json(lastedOrders);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get Orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

//SUBMITS An Order
router.post("/", async (req, res) => {
  const order = new Order({
    user_id: req.body.user_id,
    motor_id: req.body.motor_id,
    duration: req.body.duration,
    price: req.body.price,
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

//Ban an order
router.patch("/ban", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.body.orderId },
      {
        $set: {
          isBanned: "yes",
        },
      }
    );
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update an order
router.patch("/after", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.body.orderId },
      {
        $set: {
          isBanned: "after",
        },
      }
    );
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
