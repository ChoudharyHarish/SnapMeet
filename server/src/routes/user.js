// will contain routes like getFollower, following, profile, edit profile
import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

import { getUsers } from "../controllers/user.js";
import {
  upload,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

//Handle authentcaion
router.get("/users", auth, getUsers);

router.post("/post", auth, upload.array("files"), createPost);
router.patch("/post:id", auth, updatePost);
router.delete("/post:id", auth, deletePost);

export default router;
