// backend/controller/assignmentController.js
import Assignment from "../models/Assignment.js";
import Notification from "../models/notification.js";

// 📌 Upload Assignment
export const uploadAssignment = async (req, res) => {
  try {
    const { title, subject, description, deadline, pages } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File is required" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      deadline,
      fileUrl,
      pages,
      userId: req.user._id,
    });

    // 🔔 Notify writers
    await Notification.create({
      senderId: req.user._id,
      receiverRole: "writer",
      assignmentId: assignment._id,
      message: `New assignment uploaded: ${title}`,
    });

    res.status(201).json({ success: true, assignment });
  } catch (err) {
    console.error("❌ Error uploading assignment:", err);
    res.status(500).json({
      success: false,
      message: "Error uploading assignment",
    });
  }
};

// 📌 Accept Assignment (Writer)
export const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    assignment.status = "Ongoing";
    assignment.acceptedBy = req.user._id; // Writer id
    await assignment.save();

    // 🔔 Notify user that writer accepted
    await Notification.create({
      senderId: req.user._id,
      receiverId: assignment.userId,
      assignmentId: assignment._id,
      message: `Your assignment "${assignment.title}" has been accepted by a writer.`,
    });

    res.json({ success: true, message: "Assignment accepted", assignment });
  } catch (err) {
    console.error("❌ Error accepting assignment:", err);
    res.status(500).json({
      success: false,
      message: "Error accepting assignment",
    });
  }
};
