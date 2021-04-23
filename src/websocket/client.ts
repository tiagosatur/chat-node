import { Socket } from "socket.io";
import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";

io.on("connect", (socket: Socket) => {
  const connectionsService = new ConnectionsService();

  socket.on("client_first_access", (params) => {
    console.log("🚀 ~ socket.on ~ params", params);
  });
});
