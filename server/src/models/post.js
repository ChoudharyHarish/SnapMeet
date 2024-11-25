import mongoose from "mongoose";

// for simplicity just storing the likes count we have like schema as well using which we can also find userid of who liked the post

const PostSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      maxlength: 2200,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          key: { type: String, required: true },
        },
      ],
      validate: [(val) => val.length <= 7, "{PATH} exceeds the limit of 7"],
    },
    video: {
      url: { type: String },
      key: { type: String },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

PostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
