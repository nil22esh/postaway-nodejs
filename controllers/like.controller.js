import mongoose from "mongoose";
import likeSchema from "../models/like.schema.js";
import postsSchema from "../models/posts.schema.js";

const LikeModel = mongoose.model("Like", likeSchema);
const PostsModel = mongoose.model("Posts", postsSchema);

export const addLikeToPostById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide post ID!" });
  }
  try {
    // check is post exists or not with this id
    const post = await PostsModel.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ success: false, msg: "Post not found with this ID!" });
    }
    const like = new LikeModel({ post: id, likedBy: req.userID });
    await like.save();
    // add like to like array to post
    post.likes.push(like._id);
    await post.save();
    // return the updated post with like details
    const updatedPost = await PostsModel.findById(id).populate("likes", "-_id");
    res.status(200).json({
      success: true,
      msg: "Like added successfully!",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getLikesById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide post ID!" });
  }
  try {
    const post = await PostsModel.findById(id).populate("likes", "-_id");
    if (!post) {
      res
        .status(404)
        .json({ success: false, msg: "Post not found with this ID!" });
    }
    res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
