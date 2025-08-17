import Otp from "../models/Otp.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const verifyOtp = async (req, res) => {
  const { otp, email, name, password, role, college, collegeId } = req.body;

  try {
    const otpDoc = await Otp.findOne({ email });
    if (!otpDoc || otpDoc.otp !== otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      role,
      college,
      collegeId,
    });

    await Otp.deleteOne({ email }); // delete used OTP

    res
      .status(201)
      .json({ message: "User Registered Successfully", user: newUser });
  } catch (err) {
    console.error("OTP Verification Failed:", err.message);
    res.status(500).json({ message: "Verification Failed" });
  }
};
