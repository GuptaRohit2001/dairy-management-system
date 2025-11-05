import Sale from "../models/Sale.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales", error: error.message });
  }
};

export const addSale = async (req, res) => {
  try {
    const { customerName, date, quantity, pricePerLitre } = req.body;

    if (!date || !quantity || !pricePerLitre) {
      return res.status(400).json({ message: "Date, quantity, and pricePerLitre are required." });
    }

    const sale = await Sale.create({
      customerName,
      date,
      quantity,
      pricePerLitre,
      totalAmount: quantity * pricePerLitre,
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: "Error adding sale", error: error.message });
  }
};

// ✅ New function for daily summary
export const getDailySalesSummary = async (req, res) => {
  try {
    const dateQuery = req.query.date;
    if (!dateQuery) return res.status(400).json({ message: "Date is required" });

    const start = new Date(dateQuery);
    const end = new Date(dateQuery);
    end.setDate(end.getDate() + 1);

    const sales = await Sale.find({ date: { $gte: start, $lt: end } });

    if (!sales.length) return res.json({ totalSold: 0, totalAmount: 0 });

    const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);
    const totalAmount = sales.reduce((sum, s) => sum + (s.totalAmount || s.quantity * s.pricePerLitre), 0);

    res.json({ totalSold, totalAmount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales summary", error: error.message });
  }
};
