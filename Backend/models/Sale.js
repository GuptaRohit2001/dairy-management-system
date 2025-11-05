import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customerName: { type: String },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    pricePerLitre: { type: Number, required: true },
    totalAmount: { type: Number }, // optional helper field
  },
  { timestamps: true }
);

// Auto-calculate totalAmount before saving (optional safety)
saleSchema.pre("save", function (next) {
  if (this.quantity && this.pricePerLitre) {
    this.totalAmount = this.quantity * this.pricePerLitre;
  }
  next();
});

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;

