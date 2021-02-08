const mongoose = require("mongoose");

const schema = mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  motor_id: {
    type: String,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
  },
  start: {
    type: Date,
    default: Date.now(),
  },
  end: {
    type: Date,
    default: this.start + this.duration,
  },
  price: {
    type: Number,
    default: this.duration,
  },
});

module.exports = mongoose.model("order", schema);
