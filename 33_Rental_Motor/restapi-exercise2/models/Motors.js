const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    defalut: "ready",
  },
  is_refresh: {
    type: Boolean,
    default: true,
  },
  price_oneday: {
    type: Number,
    required: true,
  },
  price_oneweek: {
    type: Number,
    required: true,
  },
  price_onemonth: {
    type: Number,
    required: true,
  },
  create_at: {
    type: Date,
    defalut: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = mongoose.model("motor", schema);
