import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

import Post from "../models/post.js";

// user related stuff for post

const createPost = async (req, res) => {
  const { description } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  const images = files
    .filter((file) => file.mimetype.startsWith("image/"))
    .map((file) => ({
      url: `/tmp/${file.filename}`,
      key: file.filename,
    }));

  const video = files
    .filter((file) => file.mimetype.startsWith("video/"))
    .map((file) => ({
      url: `/tmp/${file.filename}`,
      key: file.filename,
    }))[0];

  try {
    const newPost = new Post({
      creatorId: req.user.userId,
      description,
      images,
      video,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, images, video } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, description, images, video, _id: id };

  try {
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Post.findByIdAndRemove(id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// common for all users
const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * limit;
    const limitValue = parseInt(limit);

    const posts = await Post.aggregate([
      {
        $skip: skip,
      },
      {
        $limit: limitValue,
      },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          description: 1,
          images: 1,
          video: 1,
          createdAt: 1,
          creatorId: 1,
          comments: "$commentsCount",
          likes: 1,
          userName: "$creator.userName",
          userImage: "$creator.userImage",
        },
      },
    ]);

    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limitValue);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    res.status(200).json({
      posts,
      prevPage,
      nextPage,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Post ID is required" });

  try {
    const post = await Post.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                likes: 1,
                createdAt: 1,
                userId: "$user._id",
                userName: "$user.userName",
                userImage: "$user.userImage",
                comment: "$text",
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          description: 1,
          images: 1,
          videos: 1,
          likes: 1,
          createdAt: 1,
          userName: "$user.userName",
          userImage: "$user.userImage",
          comments: 1,
        },
      },
    ]);

    if (!post || post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post: post[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { updatePost, createPost, deletePost, getAllPosts, getPost, upload };
