import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; // Import notification routes
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
path.dirname(__filename);
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/notifications", notificationRoutes); // Use notification routes
app.use("/api/assignments", assignmentRoutes);

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// app.post("/create-order", async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // Amount in paise
//       currency: "INR",
//       receipt: "receipt_order_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// });

// const order = razorpay.orders.create({
//   amount: 50000, // Amount in paise
//   currency: "INR",
//   receipt: "receipt_order_" + Date.now(),
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
