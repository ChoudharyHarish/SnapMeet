import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;
