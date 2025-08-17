// backend/routes/notificationRoutes.js
import { Router } from "express";
import Notification from "../models/notification.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

// ✅ Writer notifications fetch route
router.get("/writer", verifyToken, async (req, res) => {
  console.log("📩 GET writer notifications hit"); // Debug log

  try {
    const notifications = await Notification.find({
      receiverRole: "writer",
    })
      .populate("senderId", "name")
      .populate("assignmentId", "title")
      .sort({ createdAt: -1 });

    console.log("📩 Notifications fetched:", notifications); // Debug log

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching notifications" });
  }
});

export default router;
