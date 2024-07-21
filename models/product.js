const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  status: { type: String, default: 'available' }
});

module.exports = mongoose.model('Product', productSchema);
