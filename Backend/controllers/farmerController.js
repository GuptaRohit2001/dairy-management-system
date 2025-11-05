import Farmer from "../models/Farmer.js";

export const getFarmers = async (req, res) => {
  const farmers = await Farmer.find();
  res.json(farmers);
};

export const addFarmer = async (req, res) => {
  const { name, contact, address } = req.body;
  const farmer = await Farmer.create({ name, contact, address });
  res.status(201).json(farmer);
};

export const updateFarmer = async (req, res) => {
  const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(farmer);
};

export const deleteFarmer = async (req, res) => {
  await Farmer.findByIdAndDelete(req.params.id);
  res.json({ message: "Farmer deleted" });
};
