import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

// 🔑 PhonePe credentials from .env
const clientId = process.env.PHONEPE_CLIENT_ID;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
const phonePeBaseUrl = "https://api-preprod.phonepe.com";

// 🔐 Function to generate Access Token
async function getAccessToken() {
  try {
    const res = await axios.post(`${phonePeBaseUrl}/oauth/token`, {
      clientId,
      clientSecret,
      grantType: "client_credentials",
    });
    return res.data.accessToken;
  } catch (err) {
    console.error(
      "Error generating PhonePe token:",
      err.response?.data || err.message
    );
    throw new Error("Failed to generate PhonePe access token");
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/assignments", assignmentRoutes);

// 📌 Payment Initiation
app.post("/pay", async (req, res) => {
  console.log("📩 Payment Request:", req.body);
  try {
    const { amount, transactionId } = req.body;
    const token = await getAccessToken();

    const payload = {
      merchantTransactionId: transactionId,
      merchantUserId: "U123", // replace with actual user ID
      amount: amount * 100, // in paise
      redirectUrl: "https://roko.onrender.com/payment/callback",
      callbackUrl: "https://roko.onrender.com/status",
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const response = await axios.post(
      `${phonePeBaseUrl}/apis/pg-sandbox/v1/pay`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("📤 PhonePe Raw Response:", response.data);

    res.json(response.data);
  } catch (err) {
    console.error(
      "Payment initiation error:",
      err.response?.data || err.message
    );
    res.status(500).send("Payment initiation failed");
  }
});

// 📌 Payment Status Check
app.post("/status", async (req, res) => {
  try {
    const { transactionId } = req.body;
    const token = await getAccessToken();

    const response = await axios.get(
      `${phonePeBaseUrl}/apis/pg-sandbox/v1/status/${transactionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Status check error:", err.response?.data || err.message);
    res.status(500).send("Status check failed");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
