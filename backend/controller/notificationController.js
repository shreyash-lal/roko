// controllers/notificationController.js

import Notification from "../models/notification.js";

const getWriterNotifications = async (req, res) => {
  const notifications = await Notification.find({ receiverRole: "writer" })
    .populate("senderId", "name")
    .populate("assignmentId", "title")
    .sort({ createdAt: -1 });

  res.status(200).json(notifications);
};

export { getWriterNotifications };
