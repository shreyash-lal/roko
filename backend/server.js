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
import bodyParser from "body-parser";
import crypto from "crypto";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
path.dirname(__filename);
dotenv.config();
connectDB();
const merchantId = "YOUR_TEST_MERCHANT_ID";
const saltKey = "YOUR_TEST_SALT_KEY";
const saltIndex = 1; // from dashboard
const phonePeBaseUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/notifications", notificationRoutes); // Use notification routes
app.use("/api/assignments", assignmentRoutes);

app.post("/pay", async (req, res) => {
  try {
    const { amount, transactionId } = req.body;

    const payload = {
      merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID123",
      amount: amount * 100, // in paise
      redirectUrl: "https://roko.onrender.com/payment/callback", // frontend redirect url
      redirectMode: "POST",
      callbackUrl: "https://roko.onrender.com//status", // backend callback
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payloadString = JSON.stringify(payload);
    const payloadBase64 = Buffer.from(payloadString).toString("base64");

    const stringToHash = payloadBase64 + "/pg/v1/pay" + saltKey;
    const sha256 = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");
    const checksum = sha256 + "###" + saltIndex;

    const options = {
      method: "POST",
      url: `${phonePeBaseUrl}/pg/v1/pay`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payloadBase64 },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment initiation failed");
  }
});

app.post("/status", async (req, res) => {
  const { transactionId } = req.body;

  const stringToHash = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
  const checksum = sha256 + "###" + saltIndex;

  const response = await axios.get(
    `${phonePeBaseUrl}/pg/v1/status/${merchantId}/${transactionId}`,
    { headers: { "X-VERIFY": checksum, "X-MERCHANT-ID": merchantId } }
  );

  res.json(response.data);
});

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
