import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a phone or desktop joins a specific room
  socket.on("joinSession", ({ sessionId, role }) => {
    socket.join(sessionId);
    console.log(`Socket ${socket.id} (${role}) joined room: ${sessionId}`);

    // Notify the desktop that the phone has connected
    if (role === "phone") {
      socket.to(sessionId).emit("phoneConnected");
    }
  });

  // When the phone sends a shake, relay it to the desktop in the same room
  socket.on("shake", ({ sessionId }) => {
    socket.to(sessionId).emit("shake");
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Socket.IO Server running on port ${PORT}`);
});
