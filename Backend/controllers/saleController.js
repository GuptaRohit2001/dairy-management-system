import Sale from "../models/Sale.js";

export const getSales = async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
};

export const addSale = async (req, res) => {
  const { customerName, date, quantity, pricePerLitre } = req.body;
  const sale = await Sale.create({ customerName, date, quantity, pricePerLitre });
  res.status(201).json(sale);
};
