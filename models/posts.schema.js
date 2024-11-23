import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for the post!"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description for the post!"],
    minLength: [10, "Please enter a description with at least 10 characters!"],
  },
  salary: {
    type: Number,
    required: [true, "Please enter the salary for the post!"],
  },
  location: {
    type: String,
    required: [true, "Please enter the location for the post!"],
  },
  imageUrl: { type: "String" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the userId for the post!"],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

export default postsSchema;
