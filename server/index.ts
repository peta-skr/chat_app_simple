import { Prisma } from "@prisma/client";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  const result = getChatLists();

  res.send(result);
});

// チャットを送信
app.post("message", (req, res) => {
  // addMessage();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

async function getChatLists() {
  const chatLists = await prisma.chat.findMany({});

  return chatLists;
}

async function addMessage(name: string, context: string) {
  const message = await prisma.chat.create({
    data: {
      name: name,
      contenxt: context,
    },
  });

  return message;
}

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
