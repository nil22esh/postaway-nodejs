import express from "express";
import {
  addNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePostById,
} from "../controllers/posts.controller.js";

const postRouter = express.Router();

postRouter.post("/", addNewPost);
postRouter.put("/:id", updatePostById);
postRouter.delete("/:id", deletePostById);
postRouter.get("/all", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.get("/user/:id", getUserPosts);

export default postRouter;
