const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Product = new mongoose.Schema({
    images: { type: [String], default: [] }, // Đặt mặc định là một mảng rỗng
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'available' },
}, {
    timestamps: true
});


module.exports = mongoose.model('product', Product)