import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import otpSchema from "../models/otp.schema.js";
import userSchema from "../models/user.schema.js";
import { sendEmailMiddleware } from "../middlewares/sendEmail.middleware.js";
const UserModel = mongoose.model("User", userSchema);
const OtpModel = mongoose.model("OTP", otpSchema);

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  // validate the input fields
  if (!email) {
    res.status(400).json({ success: false, msg: "Please provide email!" });
  }
  try {
    // Check if the user is already registered or not
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User not found with this email!" });
    }
    // Generate a random 6-digit OTP with the help of crypto
    const otp = crypto.randomInt(100000, 999999).toString();
    // Save the OTP in the database
    const newOtp = new OtpModel({ user: user._id, email, otp });
    await newOtp.save();
    // Send the OTP to the user's email using email service
    sendEmailMiddleware(req, res);
    res
      .status(200)
      .json({ success: true, msg: "OTP sent successfully!", otp: newOtp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  // validate the input fields
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide email and OTP!" });
  }
  try {
    // Find the user's OTP in the database
    const otpRecord = await OtpModel.findOne({ email });
    console.log(otpRecord);
    if (!otpRecord) {
      return res.status(400).json({ success: false, msg: "Invalid OTP!" });
    }
    // Check if the entered OTP matches the stored OTP
    if (otpRecord.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid OTP you entered!" });
    }
    // Delete the used OTP from the database
    await OtpModel.findByIdAndDelete(otpRecord._id);
    res.status(200).json({ success: true, msg: "OTP verified successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password: newPassword } = req.body;
  // validate the input fields
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide email and new password!" });
  }
  try {
    // Find the user in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User not found with this email!" });
    }
    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      msg: "Password reset successfully!",
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
