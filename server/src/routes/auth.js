import express from "express";
const router = express.Router();

import { signUp, signIn } from "../controllers/auth.js";

// import auth from "../middleware/Authentication.js";

//Handle authentcaion
router.post("/signup", signUp);
router.post("/signin", signIn);

//Handle User related Stuff
// ideas : actions related to user profile => updating profile photo, bio etc.

export default router;
