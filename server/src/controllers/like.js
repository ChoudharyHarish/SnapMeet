import Like from "../models/like.js";
import Post from "../models/post.js";

// we are doing for both cases if we want to save user info as well but for now we can just increment the count value in post document
const addLike = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.user;

  try {
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      await Like.deleteOne({ postId, userId });
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Like removed successfully", id: postId });
    }

    const like = new Like({ postId, userId });
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
    await like.save();

    res.status(201).json({ message: "Post liked successfully.", id: postId });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const result = await Like.findOneAndDelete({ postId, userId });
    if (result) {
      return res.json({ message: "Like removed successfully." });
    } else {
      return res.status(404).json({ message: "Like not found." });
    }
  } catch (error) {
    console.error("Error removing like:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getLikesForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Like.find({ postId }).populate("userId", "name");

    res.json(likes);
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { addLike, removeLike, getLikesForPost };
