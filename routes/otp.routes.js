import express from "express";
import {
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../controllers/otp.controller.js";

const otpRouter = express.Router();

otpRouter.post("/send", sendOtp);
otpRouter.post("/verify", verifyOtp);
otpRouter.post("/reset-password", resetPassword);

export default otpRouter;
