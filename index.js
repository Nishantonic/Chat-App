const express = require("express");
const {Server} = require("socket.io")
const http = require("http");
const path = require("path");

const  app = express();
const server = http.createServer(app);
const io = new Server(server, {connectionStateRecovery:{}});

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

io.on('connection', (socket)=>{
  socket.on("chat message", (msg)=>{
    io.emit("chat message", msg);
    console.log("message: ", msg);    
  })
})

server.listen(8000, ()=>{console.log("Server Connected at port: 8000");
})