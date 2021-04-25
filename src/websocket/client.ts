import { Socket } from "socket.io";
import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UserService } from "../services/UserService";

io.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UserService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      try {
        await connectionsService.create({
          socket_id,
          user_id: user.id,
        });
      } catch (e) {
        console.log(
          "🚀 ~ ERROR creating connection service when user doesn't exists",
          e
        );
      }
    } else {
      try {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } catch (e) {
        console.log(
          "🚀 ~ ERROR creating connection service when user ALREADY exists",
          e
        );
      }
    }

    console.log("🚀 ~ socket.on ~ params", params);
  });
});
