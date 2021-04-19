import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello from chat app!" });
});

app.post("/users", (req, res) => {
  return res.json({ message: "User registered!" });
});

app.listen(3333, () => {
  console.log("🚀 Server running on port ", 3333);
});
