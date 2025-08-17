import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    pages: { type: Number, required: true },
    description: { type: String },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Ongoing", "Completed", "Delivered"],
    },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
