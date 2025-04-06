const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
 product_id: { type: String, unique: true, required: true },
 name: { type: String, unique: true, required: true },
 description: { type: String, required: true },
 creation_date: { type: Date },
 status: {
    type: Boolean,
    default: false,
  },
current_stock_level: { type: Number },
  
 });
module.exports = mongoose.model('Product', productSchema);    