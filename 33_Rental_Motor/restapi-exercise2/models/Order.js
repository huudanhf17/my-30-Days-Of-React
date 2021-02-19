const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  motor_id: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  start: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("order", schema);
