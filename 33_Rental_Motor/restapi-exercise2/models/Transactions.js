const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  /*  subtraction: {
    type: Number,
  },
*/
  created_at: {
    type: Date,
    defalut: Date.now,
  },
});

module.exports = mongoose.model("transaction", schema);
