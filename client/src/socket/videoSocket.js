// src/sockets/videoSocket.js
import io from "socket.io-client";

const socketUrl = "http://localhost:3001";

let socket;

const videoSocket = {
  connect: (roomId, userId) => {
    socket = io(socketUrl, {
      query: { roomId, userId },
    });

    socket.on("connect", () => {
      console.log("Connected to video room with socket.io server");
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
    }
  },

  sendOffer: (data) => {
    if (socket) {
      // console.log("Offer send : ", data);
      socket.emit("send-offer", data);
    }
  },

  sendAnswer: (data) => {
    if (socket) {
      // console.log("Send answer : ", data);
      socket.emit("send-answer", data);
    }
  },

  sendIceCandidate: ({ candidate }) => {
    if (socket) {
      socket.emit("send-ice-candidate", { candidate });
    }
  },

  subscribteToConnect: (callback) => {
    if (socket) {
      socket.on("user-joined", callback);
    }
  },

  subscribeToOffer: (callback) => {
    if (socket) {
      socket.on("receive-offer", callback);
    }
  },

  subscribeToAnswer: (callback) => {
    if (socket) {
      socket.on("receive-answer", callback);
    }
  },

  subscribeToIceCandidate: (callback) => {
    if (socket) {
      socket.on("receive-ice-candidate", callback);
    }
  },

  unsubscribeFromOffer: (callback) => {
    if (socket) {
      socket.off("receive-offer", callback);
    }
  },

  unsubscribeFromAnswer: (callback) => {
    if (socket) {
      socket.off("receive-answer", callback);
    }
  },

  unsubscribeFromIceCandidate: (callback) => {
    if (socket) {
      socket.off("ice-candidate", callback);
    }
  },

  sendMessage: (body) => {
    if (socket) {
      socket.emit("send-message-call", body);
    }
  },

  subscribeToMessages: (callback) => {
    if (socket) {
      socket.on("recieve-message-call", callback);
    }
  },

  unsubscribeFromMessages: (callback) => {
    if (socket) {
      socket.off("receive-message-call", callback);
    }
  },
};

export default videoSocket;
