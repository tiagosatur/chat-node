import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

// Serve the /public frontend view
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Render client view
app.get("/pages/client", (request: Request, response: Response) => {
  return response.render("html/client.html");
});

// Render admin view
app.get("/pages/admin", (request: Request, response: Response) => {
  return response.render("html/admin.html");
});

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("🚀 ~ Conected", socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };
