import Farmer from "../models/Farmer.js";

export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFarmer = async (req, res) => {
  try {
    const { farmerId, name, phone, address } = req.body;
    if (!farmerId) {
      return res.status(400).json({ message: "farmerId is required" });
    }

    const farmer = await Farmer.create({ farmerId, name, phone, address });
    res.status(201).json(farmer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFarmer = async (req, res) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id);
    res.json({ message: "Farmer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
