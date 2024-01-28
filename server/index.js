const express = require("express");
const { Server } = require('socket.io');
const app = express();
const cors = require("cors");
const httpServer = require('http');

app.use(express.json());
app.use(cors());
const http = httpServer.createServer(app);

const server = http.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const messages = [];

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
    socket.emit("get_previous_messages", messages);
  });

  socket.on("send_message", (data) => {
    messages.push(data.content);
    if ((data.content.reply !== -1) && (messages[data.content.reply].message.includes("?"))) {
      const contentMessageBot = {
        author: "🤖 Bot",
        message: "Hi, I'm a nice bot, and " + data.content.author + "'s answer is correct",
        reply: data.content.reply,
      }
      messages.push(contentMessageBot);
      socket.broadcast.to(data.room).emit("receive_message", data.content);
      io.to(data.room).emit("receive_message", contentMessageBot);
    } else {
      socket.to(data.room).emit("receive_message", data.content);
    }
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});