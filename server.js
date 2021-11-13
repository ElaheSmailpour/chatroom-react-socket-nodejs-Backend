require("dotenv").config();
const express = require("express");
const io = require("socket.io");
const User = require("./model/user")
const Message = require("./model/message")
const cors = require("./middleware/cors")
var path = require('path');
const app = express();
const verbindeDB = require("./mongo-db");
verbindeDB()
app.use(express.json());
const mongoose = require("mongoose");


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors)
app.get("/", (req, res) => {
  res.send("salam . I am alive");
});
app.get("/salam", (req, res) => {
  res.send("salam . I am alive");
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const user = await User.findOne({ username })
  console.log("user", user)
  if (user)
    return res.status(200).send({});
  const newUser = new User({
    username,
    gender
  })
  await newUser.save();
  res.status(200).send({});
})
app.get("/getUsers", async (req, res) => {
  const users = await User.find({})
  res.send(users)
})
const server = app.listen(3010, (err) => {
  console.log("App Listen to port 3010");
});

const socket = io(server);
const mySocket = socket.of("/socket");

mySocket.on("connection", (socket) => {
  console.log("new User Connected");

  socket.on("newMessage", async (message) => {
    console.log(message.msg);
    await Message.create({
      message: message.msg
    })
    mySocket.emit("newMessage", { ...message, date: new Date(), id: Math.floor(Math.random() * Math.pow(10, 7)) });
  });
  socket.on("joinChat", (username, myUsername) => {

    socket.join(`${username}:${myUsername}`)
    socket.join(`${myUsername}:${username}`)
  });
  socket.on("leftChat", (username, myUsername) => {

    socket.leave(`${username}:${myUsername}`)
    socket.leave(`${myUsername}:${username}`)
  });
  socket.on("deleteMsg", (id) => {
    console.log(id);
    mySocket.emit("deleteMsg", id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
});



//für run im terminal : node server.js
