import express from "express";
import {
  getAllUsersDetails,
  getUserDetails,
  signInUser,
  signOutUser,
  signUpUser,
  updateUserDetails,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/get-all-details", getAllUsersDetails);
userRouter.post("/signup", signUpUser);
userRouter.post("/signin", signInUser);
userRouter.post("/signout", signOutUser);
userRouter.get("/get-details/:id", getUserDetails);
userRouter.put("/update-details/:id", updateUserDetails);

export default userRouter;
