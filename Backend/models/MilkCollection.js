import mongoose from "mongoose";

const milkSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    fatContent: { type: Number },
    qualityGrade: { type: String },
  },
  { timestamps: true }
);

const MilkCollection = mongoose.model("MilkCollection", milkSchema);
export default MilkCollection;
