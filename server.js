const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.info("Novo cliente conectado:", socket.id);

  const broadcastRooms = () => {
    io.emit("rooms:list", Object.values(rooms));
  };

  socket.on("rooms:fetchList", () =>
    socket.emit("rooms:list", Object.values(rooms))
  );

  socket.on("create", (code, data) => {
    rooms[code] = {
      code: code,
      players: [{ ...data }],
      status: "Aguardando jogadores",
    };

    socket.join(code);
    io.to(code).emit("room:showInfo", rooms[code]);
    broadcastRooms();
  });

  socket.on("join", (code, data) => {
    const room = rooms[code];

    if (!room) {
      socket.emit("room:notFound", "Sala não encontrada", "A sala não existe ou foi encerrada. Verifique o código e tente novamente.");
      return;
    }

    if (room.players.length > 1) {
      socket.emit("room:full", "Sala cheia", "A sala excedeu o limite de jogadores.");
      return;
    };

    room.players.push({ ...data });

    if (room.players.length == 2) {
      room.status = "Pronto para jogar";
    }

    rooms[code] = room;

    socket.join(code);
    socket.emit("joined");
    io.to(code).emit("room:showInfo", rooms[code]);
    socket.to(code).emit("room:newPlayer", "Novo jogador", `${data.name} entrou na sala.`);
    broadcastRooms();
  });

  socket.on("room:start", (code) => {
    const room = rooms[code];

    if (room) {
      room.status = "Em Jogo";
      io.to(code).emit("room:showInfo", room);
      io.to(code).emit("room:started", "Jogo iniciado", "O jogo começou!");
      broadcastRooms();
    }
  });

  socket.on("room:close", (code) => {
    const room = rooms[code];

    if (!room) return;

    const playerIndex = room.players.findIndex((p) => p.id === socket.id);

    if (playerIndex === -1) return;

    const playerRemoved = room.players[playerIndex];

    const wasHost = room.players[playerIndex].isHost;
    room.players.splice(playerIndex, 1);
    socket.leave(code);

    if (room.players.length === 0) {
      delete rooms[code];
      broadcastRooms();
      return;
    }

    if (wasHost) {
      room.players[0].isHost = true;
    }

    if (room.status !== "Em Jogo") {
      room.status = "Aguardando jogadores";
    }

    rooms[code] = room;

    io.to(code).emit("room:showInfo", rooms[code]);
    io.to(code).emit("room:playerLeft", "Jogador saiu", `${playerRemoved.name} saiu da sala.`);
    broadcastRooms();
  });

  socket.on("disconnect", () => {
    for (const code in rooms) {
      const room = rooms[code];

      const playerIndex = room.players.findIndex((p) => p.id === socket.id);
      if (playerIndex === -1) continue;

      const playerRemoved = room.players[playerIndex];

      const wasHost = room.players[playerIndex].isHost;
      room.players.splice(playerIndex, 1);
      socket.leave(code);

      if (room.players.length === 0) {
        delete rooms[code];
        broadcastRooms();
      } else {
        if (wasHost) {
          room.players[0].isHost = true;
        }

        rooms[code] = room;

        io.to(code).emit("room:showInfo", rooms[code]);
        io.to(code).emit("warning", "Jogador desconectou", `${playerRemoved.name} caiu da sala`);
        broadcastRooms();
      }
    }
  });
});

server.listen(8080, () => {
  console.log("O servidor está rodando na porta 8080");
});
