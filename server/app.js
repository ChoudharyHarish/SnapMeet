import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDb } from "./src/db/connection.js";

import authRouter from "./src/routes/auth.js";
import userRouter from "./src/routes/user.js";
import messageRouter from "./src/routes/chat.js";
import socketHandler from "./src/socket/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everything working fine here !!");
});

socketHandler(io);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", messageRouter);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    server.listen(port, () => console.log("Server running successfully"));
  } catch (error) {
    console.log(error);
  }
};

start();
