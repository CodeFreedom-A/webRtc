/*
 * @Author: sunheng
 * @Date: 2022-12-21 15:53:45
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-22 11:06:07
 * @Description: 请填写简介
 */
const express = require("express");
const http = require("http");
const cors = require("cors");
// chushihua
const app = express();
const server = http.createServer(app);

app.use(cors());

//初始化io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 服务器socket链接
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("CallEnded");
  });
  socket.on("callUser", (data) => {
    socket.broadcast.emit("CallEnded");
  });
});
server.listen(5000, () => {
  console.log("我在运行服务器，端口号为5000");
});
