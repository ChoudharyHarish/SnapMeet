const rooms = {};

const roomSocketHandler = (io, socket) => {
  const { roomId, userId } = socket.handshake.query;

  if (roomId && roomId !== undefined) {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: new Set(),
        total: 0,
      };
    }

    rooms[roomId].users.add(userId);
    rooms[roomId].total++;

    socket.broadcast.to(roomId).emit("user-joined", { userId });

    console.log(`User joined video room: ${roomId}`);

    socket.on("send-offer", (data) => {
      socket.broadcast.to(roomId).emit("receive-offer", data);
    });

    socket.on("send-answer", (data) => {
      socket.broadcast.to(roomId).emit("receive-answer", data);
    });

    socket.on("send-ice-candidate", ({ candidate }) => {
      socket.broadcast.to(roomId).emit("receive-ice-candidate", { candidate });
    });

    socket.on("send-message-call", ({ roomId, message }) => {
      io.to(roomId).emit("recieve-message-call", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected from video room: ${roomId}`);
      rooms[roomId].users.delete(userId);
      rooms[roomId].total--;

      socket.broadcast.to(roomId).emit("user-left", { userId });

      if (rooms[roomId].participantCount === 0) {
        delete rooms[roomId];
      }
    });
  }
};

export default roomSocketHandler;
