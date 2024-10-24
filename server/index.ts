import { Prisma } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

// corsの設定
const allowCorssDomain = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(express.json());
app.use(allowCorssDomain);

app.get("/", (req, res) => {
  const result = getChatLists();

  res.send(result);
});

app.post("/login", (req, res) => {
  console.log(req.body.name);

  const token = jwt.sign({ name: req.body.name }, SECRET_KEY);
  console.log(token);
  res.send(token);
});

// チャットを送信
app.post("/message", (req, res) => {
  // addMessage();
});

app.post("/user", (req, res) => {
  const token = req.body.token;

  const userName = jwt.verify(
    token,
    SECRET_KEY,
    function (err: any, decoded: any) {
      return decoded;
    }
  );

  res.send(userName);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    // io.emit("chat message", msg);
    console.log(msg);
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
