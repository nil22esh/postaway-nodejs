import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import userSchema from "../models/user.schema.js";
const UserModel = mongoose.model("User", userSchema);

export const getAllUsersDetails = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const signUpUser = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  // validate the input fields
  if (!name || !email || !phone || !role || !password) {
    res.status(401).json({
      sucess: false,
      msg: "Please provide all the required fields!",
    });
  }
  try {
    // check if the user is already exists or not
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        sucess: false,
        msg: "Email already exists! Please Login!",
      });
    }
    // creating hashed password
    const hashedPassword = await bcrypt.hash(password, 12);
    // create a new user and save it to the database
    const user = new UserModel({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "User Registerd Successfully!", user: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  // validate the input fields
  if (!email || !password) {
    res.status(401).json({
      sucess: false,
      msg: "Please provide all required fields!",
    });
  }
  try {
    // check if the user is already exists or not
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      res.status(401).json({
        sucess: false,
        msg: "Invalid user credentials, please signup!",
      });
    }

    // checking user credentials with password
    const isPasswordMatched = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: "Invalid user credentials provided!",
      });
    } else {
      // Successful login: Store session data
      req.session.userEmail = { email: isUser.email };

      // generate and send the JWT token to the user
      const token = JWT.sign(
        {
          userID: isUser._id,
          email: isUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: 1 * 24 * 60 * 60 * 1000 }
      );
      res.status(200).json({
        success: true,
        msg: "User signed in successfully!",
        user: isUser,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const signOutUser = (req, res) => {
  try {
    // remove user session
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ success: false, error: err.message });
      } else {
        res
          .status(200)
          .json({ success: true, msg: "User signed out successfully!" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  // validate the input fields
  if (!id) {
    res.status(401).json({
      sucess: false,
      msg: "Please provide user ID!",
    });
  }
  try {
    // find user details by ID
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      res
        .status(404)
        .json({ success: false, msg: "User not found with this ID!" });
    } else {
      res.status(200).json({ success: true, user: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  // validate the input fields
  if (!id) {
    res.status(401).json({
      sucess: false,
      msg: "Please provide user ID!",
    });
  }
  const { name, email, phone, role } = req.body;
  try {
    // find user details by ID
    const user = await UserModel.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ success: false, msg: "User not found with this ID!" });
    } else {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, phone, role },
        { new: true }
      ).select("-password");
      res.status(200).json({ success: true, user: updatedUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
