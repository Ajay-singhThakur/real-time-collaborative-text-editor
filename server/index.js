const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Requirement: Room Generation & Entry
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
    socket.on("send-changes", (delta) => {
      // Broadcast changes to everyone else in the same room
      socket.to(roomId).emit("receive-changes", delta);
    });

    // Requirement: Chat Sidebar logic
    socket.on("send-chat-message", (message) => {
      // Send message to everyone in the room, including sender
      io.in(roomId).emit("receive-chat-message", message);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
