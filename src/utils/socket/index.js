import { io } from "socket.io-client";

const socket = io("http://192.168.100.92:8080", {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;