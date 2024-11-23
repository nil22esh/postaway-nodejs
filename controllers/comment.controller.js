import mongoose from "mongoose";
import commentSchema from "../models/comment.schema.js";
import postsSchema from "../models/posts.schema.js";
const PostsModel = mongoose.model("Posts", postsSchema);
const CommentsModel = mongoose.model("Comments", commentSchema);

export const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    res.status(400).json({ success: false, msg: "Please provide post ID!" });
  }
  try {
    // find the post by postId
    const post = await PostsModel.findById(postId);
    if (!post) {
      res.status(404).json({ success: false, msg: "Post not found!" });
    }
    // return the comments array of the post
    res.json({ success: true, comments: post.comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;
  const content = req.body.content;
  const commentedBy = req.userID;
  // validate input fields
  if (!postId || !content || !commentedBy) {
    res
      .status(400)
      .json({ success: false, msg: "Please provide all required fields!" });
  }
  try {
    // find the post by postId
    const post = await PostsModel.findById(postId);
    if (!post) {
      res.status(404).json({ success: false, msg: "Post not found!" });
    }
    // create a new comment by userID and postID
    const newComment = new CommentsModel({
      content,
      commentedBy,
      post: postId,
    });
    const comment = await newComment.save();
    // add the new comment to the post's comments array
    post.comments.push(comment._id);
    await post.save();
    // return the new comment with the post ID
    res.json({
      success: true,
      msg: "comment added successfully!",
      comment: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  const commentId = req.params.commentId;
  if (!commentId) {
    res.status(400).json({ success: false, msg: "Please provide comment ID!" });
  }
  try {
    // find the comment by commentId
    const comment = await CommentsModel.findByIdAndDelete({ _id: commentId });
    if (!comment) {
      res.status(404).json({ success: false, msg: "Comment not found!" });
    }
    res.status(200).json({
      success: true,
      msg: "Comment deleted successfully!",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCommentById = async (req, res) => {
  const commentId = req.params.commentId;
  const content = req.body.content;
  if (!commentId || !content) {
    res
      .status(400)
      .json({ success: false, msg: "Please provide comment ID and content!" });
  }
  try {
    // find the comment by commentId
    const comment = await CommentsModel.findByIdAndUpdate(
      { _id: commentId },
      { content },
      { new: true }
    );
    if (!comment) {
      res.status(404).json({ success: false, msg: "Comment not found!" });
    }
    res.status(200).json({
      success: true,
      msg: "Comment updated successfully!",
      comment: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
