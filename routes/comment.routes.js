import express from "express";
import {
  addCommentsByPostId,
  deleteCommentById,
  getCommentsByPostId,
  updateCommentById,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/:postId", getCommentsByPostId);
commentRouter.post("/:postId", addCommentsByPostId);
commentRouter.put("/:commentId", updateCommentById);
commentRouter.delete("/:commentId", deleteCommentById);

export default commentRouter;
