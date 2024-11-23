import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Your Name!"],
      minLength: [3, "Please Enter At Least 3 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please Provide Your Email!"],
      validate: [validator.isEmail, "Please Provide A Valid Email!"],
    },
    phone: {
      type: Number,
      required: [true, "Please Provide Your phone Number!"],
    },
    role: {
      type: String,
      enum: ["JobSeeker", "Recruiter"],
    },
    password: {
      type: String,
      required: [true, "Please Provode Your Password"],
      minLength: [8, "Please Enter At Least 8 Characters Password!"],
    },
  },
  { timestamps: true }
);

export default userSchema;
