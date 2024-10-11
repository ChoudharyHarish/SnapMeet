import chatSocketHandler from "./chat.js";
import roomSocketHandler from "./room.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    chatSocketHandler(io, socket);
    roomSocketHandler(io, socket);
  });
};

export default socketHandler;
