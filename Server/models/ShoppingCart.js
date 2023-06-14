const mongoose = require("mongoose");

const ShoppingCartSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  id: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  selectedColor: { type: String, required: true },
  selectedStorage: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("Cart", ShoppingCartSchema);
