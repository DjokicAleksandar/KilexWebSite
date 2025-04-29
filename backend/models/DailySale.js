const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const DailySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  products: [ProductSchema]
})

module.exports = mongoose.model('DailySale', DailySchema);