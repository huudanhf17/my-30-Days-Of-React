const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  plus: {
    type: Number,
  },
  subtraction: {
    type: Number,
  },
  updated_at: {
    type: Date,
    defalut: Date.now(),
  },
});

module.exports = mongoose.model("transaction", schema);
