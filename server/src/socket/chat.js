import User from "../Models/user.js";
import { createMessage } from "../controllers/chat.js";
import { makeId } from "../helpers/makeId.js";
import { verifyMessage } from "../helpers/verifySignature.js";

const chatSocketHandler = (io, socket) => {
  const { senderId, receiverId } = socket.handshake.query;

  if (
    senderId &&
    receiverId &&
    senderId !== undefined &&
    receiverId !== undefined
  ) {
    const room = [senderId, receiverId].sort().join("_");
    socket.join(room);

    console.log(
      `User with senderId: ${senderId} and receiverId: ${receiverId} joined room: ${room}`
    );

    socket.on(
      "send-message",
      async ({ message, signature, receiverId, senderId }) => {
        try {
          const sender = await User.findOne({ _id: makeId(senderId) });
          const isValidSignature = verifyMessage(
            message,
            signature,
            sender.publicKey
          );
          if (!isValidSignature) throw new Error("Message validation failed!!");
          io.to(room).emit("receive-message", {
            message,
            signature,
            receiverId,
            senderId,
          });
          await createMessage({ message, receiverId, senderId });
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log(`User with senderId: ${senderId} disconnected`);
    });
  }
};

export default chatSocketHandler;
