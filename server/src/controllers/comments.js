import Comment from "../models/comments.js";

const addComment = async (req, res) => {
  const { postId, userId, text } = req.body;

  try {
    const comment = new Comment({ postId, userId, text });
    await comment.save();

    res.status(201).json({ message: "Comment added successfully.", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const addLikeToComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    comment.likes += 1;
    await comment.save();

    res.json({ message: "Like added to comment.", comment });
  } catch (error) {
    console.error("Error adding like to comment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeLikeFromComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.likes > 0) {
      comment.likes -= 1;
      await comment.save();
    }

    res.json({ message: "Like removed from comment.", comment });
  } catch (error) {
    console.error("Error removing like from comment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await Comment.findByIdAndDelete(commentId);
    if (result) {
      return res.json({ message: "Comment removed successfully." });
    } else {
      return res.status(404).json({ message: "Comment not found." });
    }
  } catch (error) {
    console.error("Error removing comment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getCommentsForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate("userId", "name"); // Adjust to populate desired fields from User schema

    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export {
  addComment,
  removeComment,
  addLikeToComment,
  removeLikeFromComment,
  getCommentsForPost,
};
