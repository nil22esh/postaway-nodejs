import mongoose from "mongoose";
import postsSchema from "../models/posts.schema.js";
const PostsModel = mongoose.model("Posts", postsSchema);

export const addNewPost = async (req, res) => {
  // Get the user's details from the request body
  const postedBy = req.userID;
  const { title, description, salary, location } = req.body;
  //  validate input fields
  if (!title || !description || !salary || !location || !postedBy) {
    res
      .status(400)
      .json({ success: false, msg: "Please provide all required fields!" });
  }
  try {
    // Create a new post
    const newPost = new PostsModel({
      title,
      description,
      salary,
      location,
      postedBy,
    });
    await newPost.save();
    res.json({
      success: true,
      msg: "Post created successfully!",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await PostsModel.find();
    const count = posts.length;
    res.status(200).json({
      success: true,
      msg: "posts fetched successfully!",
      totalPosts: count,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide post ID!" });
  }
  try {
    const post = await PostsModel.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ success: false, msg: "Post not found with this ID!" });
    } else {
      res.status(200).json({ success: true, post: post });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide user ID!" });
  }
  try {
    const posts = await PostsModel.find({ postedBy: id });
    const count = posts.length;
    res.status(200).json({
      success: true,
      msg: "User posts fetched successfully!",
      totalPosts: count,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide post ID!" });
  }
  try {
    const post = await PostsModel.findByIdAndDelete(id);
    if (!post) {
      res
        .status(404)
        .json({ success: false, msg: "Post not found with this ID!" });
    } else {
      res
        .status(200)
        .json({ success: true, msg: "Post deleted successfully!", post: post });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePostById = async (req, res) => {
  const { id } = req.params;
  // validate the input fields
  if (!id) {
    res.status(401).json({ success: false, msg: "Please provide post ID!" });
  }
  const postedBy = req.userID;
  const { title, description, salary, location } = req.body;
  if (!title || !description || !salary || !location || !postedBy) {
    res
      .status(400)
      .json({ success: false, msg: "Please provide all required fields!" });
  }
  try {
    const post = await PostsModel.findByIdAndUpdate(
      id,
      { title, description, salary, location, postedBy },
      { new: true }
    );
    if (!post) {
      res
        .status(404)
        .json({ success: false, msg: "Post not found with this ID!" });
    } else {
      res
        .status(200)
        .json({ success: true, msg: "Post updated successfully!", post: post });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
