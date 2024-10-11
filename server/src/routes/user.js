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
import {
  addComment,
  addLikeToComment,
  getCommentsForPost,
  removeComment,
  removeLikeFromComment,
} from "../controllers/comments.js";

// import auth from "../middleware/Authentication.js";

//Handle authentcaion
router.get("/users", auth, getUsers);

router.get("/posts", getPosts);
router.post("/posts", auth, createPost);
router.patch("/post:id", auth, updatePost);
router.delete("/post:id", auth, deletePost);

router.get("/likes", getLikesForPost);
router.post("/likes", auth, addLike);
router.delete("/likes", auth, removeLike);

router.get("/comments", getCommentsForPost);
router.post("/comments", auth, addComment);
router.delete("comments", auth, removeComment);
router.post("/comments/:id", auth, addLikeToComment);
router.post("/comments/:id", auth, removeLikeFromComment);

export default router;
