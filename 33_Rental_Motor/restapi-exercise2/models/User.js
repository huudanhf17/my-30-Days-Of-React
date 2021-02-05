const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permission: {
    type: Number,
    defalut: 3,
  },
  coins: {
    type: Number,
    defalut: 0,
  },
  date: {
    type: Date,
    defalut: Date.now(),
  },
});

module.exports = mongoose.model("user", PostSchema);
