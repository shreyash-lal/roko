import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { verifyOtp } from "../controller/otpController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);

export default router;
