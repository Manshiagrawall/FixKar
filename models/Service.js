// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   category: { type: String, required: true }, 
//   location: { type: String, required: true }, 
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Service', serviceSchema);



const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Service', serviceSchema);
