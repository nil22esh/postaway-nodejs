import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: [true, "Please provide the user ID"],
  },
  email: { type: "String" },
  otp: {
    type: "String",
    required: [true, "Please provide the OTP"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

export default otpSchema;
