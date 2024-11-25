import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

import { getAllPosts, getPost } from "../controllers/posts.js";
import { addComment } from "../controllers/comments.js";
import { addLike } from "../controllers/like.js";

router.get("/", getAllPosts);
router.get("/:id", getPost);

router.post("/likes/:id", auth, addLike);
router.post("/comment/:id", auth, addComment);

export default router;
