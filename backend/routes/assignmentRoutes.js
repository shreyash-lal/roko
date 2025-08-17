// backend/routes/assignmentRoutes.js
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  uploadAssignment,
  acceptAssignment,
} from "../controller/assignmentController.js";
import { getPendingAssignments } from "../controller/getPendingAssignmentsController.js";
import Assignment from "../models/Assignment.js";

const router = Router();

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF/Word/Image allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

/* ---------------------- ROUTES ---------------------- */

// ✅ Upload assignment
router.post(
  "/upload-assignment",
  verifyToken,
  upload.single("file"),
  uploadAssignment
);

// ✅ Get all pending assignments
router.get("/pending", getPendingAssignments);

// ✅ Accept an assignment (writer)
router.put("/:id/accept", verifyToken, acceptAssignment);

// ✅ Get ongoing assignments for logged-in writer
router.get("/ongoing", verifyToken, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      acceptedBy: req.user._id,
      status: "Ongoing",
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Mark assignment as completed
router.put("/:id/complete", verifyToken, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ msg: "Assignment not found" });

    assignment.status = "Completed";
    await assignment.save();

    // 🔔 Notify user
    res.json({ msg: "Assignment marked as completed ✅", assignment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
