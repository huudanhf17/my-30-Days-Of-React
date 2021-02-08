const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
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
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", PostSchema);
