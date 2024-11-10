// import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    res.status(500).json("Authentication invalid");
  }
  console.log(req.headers.authorization);
  console.log(headers);
  const token = headers.split(" ")[1];
  try {
    if (token.length < 500) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId, email: payload.email };
    } else {
      const payload = jwt.decode(token);
      req.user = { userId: payload.sub, email: payload.email };
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json("Token Expired Please Login Again");
  }
};

export default authentication;
