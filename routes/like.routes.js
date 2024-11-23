import express from "express";
import {
  addLikeToPostById,
  getLikesById,
} from "../controllers/like.controller.js";

const likeRouter = express.Router();

likeRouter.post("/toggle/:id", addLikeToPostById);
likeRouter.get("/:id", getLikesById);

export default likeRouter;
