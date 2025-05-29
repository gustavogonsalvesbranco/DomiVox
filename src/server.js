const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("createRoom", (data) => {
    socket.join(data.code);
    io.to(data.code).emit("showCode", data.code);
  });

  socket.on("joinRoom", (code) => {
    const rooms = io.sockets.adapter.rooms;
    if (rooms.has(code)) {
      socket.join(code);
      socket.emit("roomJoined", code);
      io.to(code).emit("showCode", code);
      socket.to(code).emit("newPlayer");
    } else {
      socket.emit("roomNotFound");
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
