
const express = require('express');
const io = require("socket.io")
const app = express();

app.get("/", (req, res) => {
    res.send("hi I am a User!")
})



const server = app.listen(3010, (err) => {
    console.log("App Listen to port 3010");
  });
  
  const socket = io(server);
  const mySocket = socket.of("/socket");
  
  mySocket.on("connection", (socket) => {
    console.log("new User Connected");
  })

//für run im terminal : node server.js
