import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register

import Otp from "../models/Otp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role, college, collegeId } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const allowedRoles = ["user", "writer", "admin"];
    if (!allowedRoles.includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendEmail(email, `Your OTP is: ${otp}`);

    // Send back all form data so we can save later
    res
      .status(200)
      .json({
        message: "OTP sent to email",
        userData: { name, email, password, role, college, collegeId },
      });
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      msg: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
        collegeId: user.collegeId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error Logging In" });
  }
};
