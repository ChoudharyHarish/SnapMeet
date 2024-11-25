// will contain routes like getFollower, following, profile, edit profile
import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

import { getUsers } from "../controllers/user.js";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import { addLike, getLikesForPost, removeLike } from "../controllers/like.js";

//Handle authentcaion
router.get("/users", auth, getUsers);

router.get("/posts", auth, getPosts);
router.post("/post", auth, createPost);
router.patch("/post:id", auth, updatePost);
router.delete("/post:id", auth, deletePost);

router.post("/likes", auth, addLike);
router.delete("/likes", auth, removeLike);

export default router;
