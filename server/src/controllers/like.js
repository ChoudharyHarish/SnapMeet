import Like from "../models/like.js";

const addLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked this post." });
    }

    const like = new Like({ postId, userId });
    await like.save();

    res.status(201).json({ message: "Post liked successfully.", like });
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
