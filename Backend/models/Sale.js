// import mongoose from 'mongoose';

// const saleSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   quantity: { type: Number, required: true }, // liters sold
//   buyer: { type: String }, // customer or distributor
//   pricePerLiter: { type: Number, required: true },
//   totalAmount: { type: Number, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Sale', saleSchema);

import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customerName: { type: String },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    pricePerLitre: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
