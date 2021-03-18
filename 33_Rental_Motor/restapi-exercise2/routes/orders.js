const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Transactions = require("../models/Transactions");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const verify = require("./verifyToken");

//Middlewares
router.use(cookieParser());

//Get Lasted Orders
router.get("/lasted", async (req, res) => {
  try {
    const orders = await Order.find();
    const lastedOrders = [];
    orders.reverse().forEach((value) => {
      let checkOrders = lastedOrders.findIndex(
        (order) => order.motor_id === value.motor_id
      );
      if (checkOrders < 0) {
        lastedOrders.push(value);
      }
    });
    res.json(lastedOrders);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get Orders by UserID
router.post("/userid", verify, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.body.user_id });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS An Order
router.post("/", async (req, res) => {
  const order = new Order({
    user_id: req.body.user_id,
    motor_id: req.body.motor_id,
    duration: req.body.duration,
    price: req.body.price,
  });
  try {
    const user = await User.findById(order.user_id);
    if (!user) {
      res.json({
        message: `User with id ${order.user_id} does not exist`,
      });
      return;
    }
    const newOrder = await order.save();
    const transaction = new Transactions({
      user_id: order.user_id,
      amount: -order.price,
      description: `Pay for order ${newOrder._id}`,
    });
    transaction.save();
    // update user
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
