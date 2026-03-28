const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("User connected");

  socket.on("join-room", room => {
    socket.join(room);
    socket.to(room).emit("user-connected");
  });

  socket.on("signal", data => {
    socket.to(data.room).emit("signal", data.signal);
  });
});

server.listen(3001, () =>
  console.log("Signaling server running")
);
