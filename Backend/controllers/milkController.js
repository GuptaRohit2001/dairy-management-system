import MilkCollection from "../models/MilkCollection.js";

export const getMilkRecords = async (req, res) => {
  try {
    const records = await MilkCollection.find().populate("farmer");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching milk records", error: error.message });
  }
};

export const addMilkRecord = async (req, res) => {
  try {
    const { farmer, date, quantity, fatContent } = req.body;
    if (!farmer || !date || !quantity) {
      return res.status(400).json({ message: "Farmer, date, and quantity are required." });
    }
    const qualityGrade = fatContent >= 4 ? "A" : fatContent >= 3 ? "B" : "C";
    const record = await MilkCollection.create({ farmer, date, quantity, fatContent, qualityGrade });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error adding milk record", error: error.message });
  }
};

// ✅ New function for daily summary
export const getDailyMilkSummary = async (req, res) => {
  try {
    const dateQuery = req.query.date;
    if (!dateQuery) return res.status(400).json({ message: "Date is required" });

    const start = new Date(dateQuery);
    const end = new Date(dateQuery);
    end.setDate(end.getDate() + 1);

    const records = await MilkCollection.find({ date: { $gte: start, $lt: end } });

    if (!records.length) return res.json({ totalQuantity: 0, avgFat: 0 });

    const totalQuantity = records.reduce((sum, r) => sum + r.quantity, 0);
    const avgFat = records.reduce((sum, r) => sum + (r.fatContent || 0), 0) / records.length;

    res.json({ totalQuantity, avgFat });
  } catch (error) {
    res.status(500).json({ message: "Error fetching milk summary", error: error.message });
  }
};

