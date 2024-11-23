import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the userId for the like!"],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

export default likeSchema;
