const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  plus: {
    type: Number,
    required: true,
  },
  /*  subtraction: {
    type: Number,
  },
*/
  created_at: {
    type: Date,
    defalut: Date.now(),
  },
});

module.exports = mongoose.model("transaction", schema);
