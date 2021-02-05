const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("transaction", PostSchema);
