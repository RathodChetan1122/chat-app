import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this if needed for your frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Send a default message (since we're not using MongoDB anymore)
  socket.emit("chat_history", [
    { username: "System", message: "Welcome to the chat!" }
  ]);

  // Save and broadcast new message
  socket.on("send_message", (data) => {
    console.log("New message received:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
