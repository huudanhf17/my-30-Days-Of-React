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
  type: {
    type: String,
    defalut: "unactivate",
  },
  coins: {
    type: Number,
    defalut: 0,
  },
  created_at: {
    type: Date,
    defalut: Date.now(),
  },
  updated_at: {
    type: Date,
    defalut: Date.now(),
  },
});

module.exports = mongoose.model("user", PostSchema);
