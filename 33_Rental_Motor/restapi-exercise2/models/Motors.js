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
  company: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    defalut: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("motor", PostSchema);
