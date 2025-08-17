import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverRole: { type: String, enum: ["writer"], required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Pehle check karo model already bana hua hai ya nahi
const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
