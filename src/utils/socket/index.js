import { io } from "socket.io-client";

const socket = io("https://domivox.glitch.me", {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;