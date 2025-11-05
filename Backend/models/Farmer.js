// import mongoose from 'mongoose';

// const farmerSchema = new mongoose.Schema({
//   farmerId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   phone: String,
//   address: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Farmer', farmerSchema);


import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    farmerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: String,
    address: String,
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
