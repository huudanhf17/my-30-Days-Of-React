const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
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
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    defalut: "ready",
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
  creat_date: {
    type: Date,
    defalut: Date.now(),
  },
  updated_at: {
    type: Date,
    defalut: Date.now(),
  },
});

module.exports = mongoose.model("motor", PostSchema);
