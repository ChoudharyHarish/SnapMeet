import express from "express";
const router = express.Router();

import { createMessage, getMessages } from "../controllers/chat.js";
import auth from "../middleware/auth.js";

router.post("/createMessage", auth, createMessage);
router.get("/messages/:receiverId", auth, getMessages);

export default router;
