import { Socket } from "socket.io";
import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UserService } from "../services/UserService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UserService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      try {
        user_id = user.id;

        await connectionsService.create({
          socket_id,
          user_id: user.id,
        });
      } catch (e) {
        console.error(
          "🚀 ~ ERROR creating connection service when user doesn't exists",
          e
        );
      }
    } else {
      user_id = userExists.id;
      try {
        const connection = await connectionsService.findByUserId(userExists.id);

        if (!connection) {
          await connectionsService.create({
            socket_id,
            user_id: userExists.id,
          });
        } else {
          connection.socket_id = socket_id;

          await connectionsService.create(connection);
        }
      } catch (e) {
        console.error(
          "🚀 ~ ERROR creating connection service when user ALREADY exists",
          e
        );
      }
    }
    await messagesService.create({
      text,
      user_id,
    });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);
    const allUsers = await connectionsService.findAllWithoutAdmin();

    // Notify whoever is listening about all connected users
    // Will show new user connection in admin screen
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    console.log("🚀 ~ socket.on ~ params", params);
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionsService.findBySocketId(socket_id);

    const message = await messagesService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });
});
