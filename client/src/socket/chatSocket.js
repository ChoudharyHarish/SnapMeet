// src/sockets/chatSocket.js
import io from "socket.io-client";

const socketUrl = "http://localhost:3001"; // Replace with your server URL

let socket;

const chatSocket = {
  connect: (senderId, receiverId) => {
    socket = io(socketUrl, {
      query: { senderId, receiverId },
    });

    socket.on("connect", () => {
      console.log("User is connected with socket.io server");
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
    }
  },

  sendMessage: ({ message, signature, receiverId, senderId }) => {
    if (socket) {
      socket.emit("send-message", { message, signature, receiverId, senderId });
    }
  },

  subscribeToMessages: (callback) => {
    if (socket) {
      socket.on(
        "receive-message",
        ({ message, signature, receiverId, senderId }) => {
          callback({ message, signature, receiverId, senderId });
        }
      );
    }
  },

  unsubscribeFromMessages: (callback) => {
    if (socket) {
      socket.off("receive-message", callback);
    }
  },
};

export default chatSocket;
