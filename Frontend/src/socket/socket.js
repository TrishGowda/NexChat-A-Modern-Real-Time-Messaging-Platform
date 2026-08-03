import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

// autoConnect is disabled — AuthContext connects it after a verified login
const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;