import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please enter a content of comment!"],
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the userId for the post!"],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

export default commentSchema;
