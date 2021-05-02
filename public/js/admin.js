const socket = io();
let userConnections = [];

socket.on("admin_list_all_users", (connections) => {
  userConnections = connections;
  document.getElementById("list_users").innerHTML = "";

  let template = document.getElementById("template").innerHTML;

  connections &&
    connections.forEach((connection) => {
      const rendered = Mustache.render(template, {
        id: connection.socket_id,
        email: connection.user.email,
      });
      document.getElementById("list_users").innerHTML += rendered;
    });
});

function call(id) {
  const connection = userConnections.find(
    (connection) => connection.socket_id === id
  );
  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });

  document.getElementById("supports").innerHTML += rendered;

  const params = {
    user_id: connection.user_id,
  };

  socket.emit("admin_user_in_support", params);

  socket.emit("admin_list_messages_by_user", params, (messages) => {
    const messagesElement = document.getElementById(
      `allMessages${connection.user_id}`
    );

    messages.forEach((message) => {
      const createDiv = document.createElement("div");
      const isMessageFromUser = message.admin_id === null;

      if (isMessageFromUser) {
        createDiv.className = "admin_message_client";
        createDiv.innerHTML = `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YY HH:mm:ss")}</span>`;
        createDiv.innerHTML += `<span>${connection.user.email}</span>`;
        createDiv.innerHTML += `<span> ${message.text}</span>`;
      } else {
        createDiv.className = "admin_message_admin";
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YY HH:mm:ss")}</span>`;
        createDiv.innerHTML = `<span>Atendente: ${message.text}</span>`;
      }

      messagesElement.appendChild(createDiv);
      messagesElement.scrollTop = messagesElement.scrollHeight;
    });
  });
}

function sendMessage(userId) {
  const text = document.getElementById(`send_message_${userId}`);
  const params = {
    text: text.value,
    user_id: userId,
  };
  socket.emit("admin_send_message", params);
  const divMessages = document.getElementById(`allMessages${userId}`);

  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_admin";
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format(
    "DD/MM/YY HH:mm:ss"
  )}</span>`;
  createDiv.innerHTML = `<span>Atendente: ${params.text}</span>`;

  divMessages.appendChild(createDiv);
  divMessages.scrollTop = divMessages.scrollHeight;
  text.value = "";
  // admin_list_messages;
}

socket.on("admin_receive_message", (data) => {
  const { socket_id, message } = data;
  const connection = userConnections.find(
    (connection) => connection.socket_id === socket_id
  );

  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_client";
  createDiv.innerHTML = `<span class="admin_date">${dayjs(
    message.created_at
  ).format("DD/MM/YY HH:mm:ss")}</span>`;
  createDiv.innerHTML += `<span>${connection.user.email}</span>`;
  createDiv.innerHTML += `<span> ${message.text}</span>`;

  const divMessages = document.getElementById(
    `allMessages${connection.user_id}`
  );
  divMessages.appendChild(createDiv);
  divMessages.scrollTop = divMessages.scrollHeight;
});
