const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  last: {
    type: String,
  },
  buy: {
    type: String,
  },
  sell: {
    type: String,
  },
  volume: {
    type: String,
  },
  base_unit: {
    type: String,
  },
});

const Coin = mongoose.model("Coin", coinSchema);
module.exports = Coin;
