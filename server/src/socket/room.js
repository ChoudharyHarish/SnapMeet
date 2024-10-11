const roomSocketHandler = (io, socket) => {
  const { roomId, userId } = socket.handshake.query;

  if (roomId && roomId !== undefined) {
    socket.join(roomId);

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

    socket.on("disconnect", () => {
      console.log(`User disconnected from video room: ${roomId}`);
    });
  }
};

export default roomSocketHandler;
