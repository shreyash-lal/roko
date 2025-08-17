import Assignment from "../models/Assignment.js"; // <-- ye line zaroori hai

export const getPendingAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ status: "Pending" });
    res.json(assignments);
  } catch (err) {
    console.error(err); // error ko print karo
    res.status(500).json({ message: "Server error" });
  }
};
