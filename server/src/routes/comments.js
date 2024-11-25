import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import {
  getCommentsForPost,
  removeComment,
  addLikeToComment,
} from "../controllers/comments.js";

router.get("/", getCommentsForPost);
router.post("/:id", auth, addLikeToComment);
router.delete("/:id", auth, removeComment);

// router.post("/:id", auth, removeLikeFromComment);

export default router;
