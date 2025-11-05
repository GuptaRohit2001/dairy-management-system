import MilkCollection from "../models/MilkCollection.js";

export const getMilkRecords = async (req, res) => {
  const records = await MilkCollection.find().populate("farmer");
  res.json(records);
};

export const addMilkRecord = async (req, res) => {
  const { farmer, date, quantity, fatContent } = req.body;
  const qualityGrade = fatContent >= 4 ? "A" : fatContent >= 3 ? "B" : "C";
  const record = await MilkCollection.create({ farmer, date, quantity, fatContent, qualityGrade });
  res.status(201).json(record);
};
